var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        query(building:String!, dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
    }

    type timeValue {
        timestamp: Date
        value: Float
    }

    type Date {
        year: Int,
        month: Int,
        day: Int,
        week: Int,
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