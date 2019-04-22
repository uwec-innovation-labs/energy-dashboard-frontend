var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        query(building:String!, dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
    }

    type timeValue {
        timestamp: String
        value: Float
    }

`)

module.exports = {
    "energySchema": energySchema
}