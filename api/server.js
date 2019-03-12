const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const sqlData = require('./sqlData.js')

//get data types (Query, Solar, Building, Date)
var schema = require('./sqlSchema.js').energySchema
const app = express()

var global = {
  solar: sqlData.getSolar
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.get('/download', function(req, res) {
  var file = './CSV/tiny.csv'
  res.download(file)
})

app.listen(4000, () => console.log('GraphQL is running on port 4000'))
