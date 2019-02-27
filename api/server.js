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

var schema = buildSchema(`
    type Query { 
        solar: [Solar]
    }

    type Solar {
        timestamp: String,
        value: Int
    }
`)

var getSolar = () => {
  console.log(data);
  return data;
}

var global = { solar: getSolar }

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.listen(4000, () => console.log('GraphQL is running on port 4000'))