var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        solar(sort: String, only:Int): [Solar]
    }

    type Solar {
        timestamp: String
        value: Int
    }
`)

module.exports = {
  energySchema: energySchema
}
