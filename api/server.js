const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const energyRoutes = require('./routes/energyRoutes.js')

//get data types (Query, Solar, Building, Date)
var schema = require("./schema.js").energySchema;
const app = express();

var global = {
  solar: energyRoutes.getSolar,
  buildings: energyRoutes.getBuildings,
  fullData: energyRoutes.getFullData
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.get('/download', function(req, res){
  var file = "./tiny.csv";
  res.download(file);
});

app.listen(4000, () => console.log('GraphQL is running on port 4000'))