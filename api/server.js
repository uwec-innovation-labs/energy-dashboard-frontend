const express = require('express')
const graphqlHTTP = require('express-graphql')
const sqlData = require('./sqlData.js')
const cors = require('cors')
const responseTime = require('response-time')
const redis = require('redis');
const axios = require('axios');

//get data types (Query, Solar, Building, Date)
var schema = require('./sqlSchema.js').energySchema

// create and connect redis client to local instance.
const client = redis.createClient();

const app = express()

// use response-time as a middleware
app.use(responseTime());

app.use(cors())

var global = {
  query: callCache
}

async function callCache(parent, args, context, info) {
  let response = await axios.get("http://localhost:4000/cache",{
    params:{
      building: parent.building,
      parent: parent,
      dataTypes: context.fieldNodes[0].selectionSet.selections
    }
  });
  return response.data;
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.get('/cache', async (req, res) => {
  var parent = req.query.parent;
  var building = req.query.building;
  var dataTypes = req.query.dataTypes;

  //get the query data first (everything but stats)
  const returnData = await sqlData.master(parent, building, dataTypes);

  //get all the stats
  await dataTypes.reduce(async (promise, rawDataType) => {
    await promise
    
    var dataType = JSON.parse(rawDataType);
    if (dataType.selectionSet != null) {
      var findStats = undefined
      dataType.selectionSet.selections.forEach(selection => {
        if (selection.name.value === 'stats') {
          findStats = selection
        }
      })
      if (findStats != undefined) {
        const response = await axios.get("http://localhost:4000/redis",{
          params:{
            parent: parent,
            building: building,
            dataTypeName: dataType.name.value,
            findStats: findStats
          }
        });
        returnData[dataType.name.value].stats = response.data.stats;
      }
    }
  }, Promise.resolve());
  return res.status(200).json(returnData);
})

app.get('/redis', async (req, res) => {
  var dataTypeName = req.query.dataTypeName;
  var parent = JSON.parse(req.query.parent);
  var building = req.query.building
  var findStats = JSON.parse(req.query.findStats);
  var key = "" + parent.building + dataTypeName;
  await client.get(`query:${key}`, async (err, result) => {
    //check if stat data exists in Redis store
    if (result) {
      //console.log("found " + key + " data in cache")
      var returnData = {};
      returnData.stats = JSON.parse(result);
      return res.status(200).json(returnData);
    } else { // Key does not exist in Redis store
      //console.log("making data request");
      parent.dataType = dataTypeName;
      let newData = await sqlData.computeStats(building, parent, findStats)
      client.setex(`query:${key}`, 3600, JSON.stringify(newData));
      return res.status(200).json(newData);
    }
  });
})

app.listen(4000, () => console.log('GraphQL is running on port 4000'))
