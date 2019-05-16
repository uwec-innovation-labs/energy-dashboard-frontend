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
  const response = await axios.get("http://localhost:4000/redis",{
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

// create an api/search route
app.get('/redis', async (req, res) => {
  var rawDataTypes = req.query.dataTypes;
  var parent = req.query.parent;
  var building = req.query.building;
  var fullData = {}
  await rawDataTypes.reduce(async (promise, rawDataType) => {
    await promise
    var dataType = JSON.parse(rawDataType);
    var dataTypeName = dataType.name.value;
    const response = await axios.get("http://localhost:4000/cache",{
      params:{
        parent: parent,
        building: building,
        dataType: dataType
      }
    });
    fullData[dataTypeName] = response.data;
  }, Promise.resolve());
  return res.status(200).json(fullData);
});

app.get('/cache', async (req, res) => {
  var dataType = JSON.parse(req.query.dataType);
  var dataTypeName = dataType.name.value;
  var parent = JSON.parse(req.query.parent);
  var building = req.query.building
  var key = "" + building + dataTypeName;

  return client.get(`query:${key}`, async (err, result) => {
    // If that key exist in Redis store
    if (result) {
      console.log("found " + key + " data in cache")
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else { // Key does not exist in Redis store
      console.log("making data request");
      let returnData = await sqlData.master(building, dataType, parent);
      client.setex(`query:${key}`, 3600, JSON.stringify(returnData));
      return res.status(200).json(returnData);
    }
  });
})

app.listen(4000, () => console.log('GraphQL is running on port 4000'))
