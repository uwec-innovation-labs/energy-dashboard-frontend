var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        solar(sort: String, only:Int): [Solar]
    }

    type Solar {
        timestamp: Date
        value: Int
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

module.exports = {
    "energySchema": energySchema
}