const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

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
  return [
    { timestamp: 'hello', value: 130 },
    { timestamp: 'there', value: 160 }
  ]
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
