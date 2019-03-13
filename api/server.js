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
  Davies: sqlData.master,
  Schneider: sqlData.master,
  Chancellors: sqlData.master,
  Crest: sqlData.master,
  Governors: sqlData.master,
  Horan: sqlData.master,
  Hibbard: sqlData.master,
  Hilltop: sqlData.master,
  HSS: sqlData.master,
  McPhee: sqlData.master,
  TowersSouth: sqlData.master,
  ED: sqlData.master,
  Bridgman: sqlData.master,
  Centennial: sqlData.master,
  KV: sqlData.master,
  HFANorth: sqlData.master,
  HFASouth: sqlData.master,
  HeatingPlant: sqlData.master,
  Library: sqlData.master,
  Maintenance: sqlData.master,
  PhillipsNorth: sqlData.master,
  PhillipsSouth: sqlData.master,
  Nursing: sqlData.master,
  Murray: sqlData.master,
  Schofield: sqlData.master,
  Putnam: sqlData.master,
  OakRidge: sqlData.master,
  Sutherland: sqlData.master,
  Thomas: sqlData.master,
  Zorn: sqlData.master,
  tables: sqlData.getTables,
  test: sqlData.test
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
