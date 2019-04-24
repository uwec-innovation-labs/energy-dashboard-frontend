var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        query(building:String, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): Building
    }

    type Building {
        electricity: [TimeValue]
        solar: [TimeValue]
        heat: [TimeValue]
        chiller: [TimeValue]
        energyRate: [TimeValue]
        energyAvailable: [String]
    }

    type TimeValue {
        timestamp: String
        value: Float
    }

`)

module.exports = {
    "energySchema": energySchema
}