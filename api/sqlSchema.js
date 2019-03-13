var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        Davies(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Schneider(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Chancellors(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Crest(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Governors(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Horan(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Hibbard(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Hilltop(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        HSS(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        McPhee(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        TowersSouth(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        ED(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Bridgman(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Centennial(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        KV(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        HFANorth(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        HFASouth(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        HeatingPlant(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Library(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Maintenance(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        PhillipsNorth(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        PhillipsSouth(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Nursing(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Murray(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Schofield(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Putnam(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        OakRidge(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Sutherland(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Thomas(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        Zorn(dataType:String!, average:String, sort:String, only:Int, start:String, end:String): [timeValue]
        tables:[String]
        test:String
    }

    type timeValue {
        timestamp: Date
        value: Float
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