const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const readData = require("./readData.js")

const app = express();

var data;
readData.readData().then(function(result) {
  data = result;
});
var buildings;
readData.readBuildings().then(function(result) {
  buildings = result;
})

var schema = buildSchema(`
    type Query { 
        solar: [Solar],
        buildings: [Building]
    }

    type Solar {
        timestamp: String,
        value: Int
    }

    type Building {
      name: String
    }
`)

var getSolar = () => {
  return data;
}

var getBuildings = () => {
  return buildings;
}

var global = {
  solar: getSolar,
  buildings: getBuildings
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.listen(4000, () => console.log('GraphQL is running on port 4000'))