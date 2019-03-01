const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const readData = require("./readData.js")
var GraphQLDate = require('graphql-date')

const app = express();

var data;
readData.readData().then(function(result) {
  data = result;
  console.log(data);
});
var fullData;
readData.readFullData().then(function(result) {
  fullData = result;
});
var buildings;
readData.readBuildings().then(function(result) {
  buildings = result;
});

var schema = buildSchema(`
    type Query { 
        solar: [Solar],
        buildings: [Building],
        fullData: [Solar]
    }

    type Solar {
        timestamp: Date
        value: Int
    }

    type Building {
      name: String
    }

    type Date {
      year: Int,
      month: Int,
      day: Int,
      hour: Int,
      minute: Int,
      second: Int,
      date: String,
      time: String,
      dateTime: String
    }
`)

var getSolar = () => {
  return data;
}

var getBuildings = () => {
  return buildings;
}

var getFullData = () => {
  return fullData;
}

var global = {
  solar: getSolar,
  buildings: getBuildings,
  fullData: getFullData
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.post('/download', function(req, res){
  var file = "./tiny.csv";
  res.download(file);
});

app.listen(4000, () => console.log('GraphQL is running on port 4000'))