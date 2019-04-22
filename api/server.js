const express = require('express')
const graphqlHTTP = require('express-graphql')
const sqlData = require('./sqlData.js');

//get data types (Query, Solar, Building, Date)
var schema = require("./sqlSchema.js").energySchema;
const app = express();

app.use(cors())

var global = {
  query: sqlData.master
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
