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
        solar(sort: String, only:Int): [Solar],
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

function sortSolarHigh(a, b) {
  if (a.value > b.value) {
    return -1;
  } else if (b.value > a.value) {
    return 1;
  }
  return 0;
}

function sortSolarLow(a, b) {
  if (a.value > b.value) {
    return 1;
  } else if (b.value > a.value) {
    return -1;
  }
  return 0;
}

var getSolar = (parent, args, context, info) => {
  var newData = data;
  if (parent != null) {
    if (parent.sort != null) {
      //chronological is the default, since that's how the csv file is generated
      if (parent.sort == "high") {
        newData = newData.sort(sortSolarHigh);     
      } else if (parent.sort == "low") {
        newData = newData.sort(sortSolarLow);   
      }
    }
    if (parent.only != null && Number.isInteger(parent.only)) {
      newData = newData.slice(0, parent.only);
    }
  }
  return newData;
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

app.get('/download', function(req, res){
  var file = "./tiny.csv";
  res.download(file);
});

app.listen(4000, () => console.log('GraphQL is running on port 4000'))