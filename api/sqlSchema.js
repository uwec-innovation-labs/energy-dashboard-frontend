var { buildSchema } = require('graphql')

var energySchema = buildSchema(`
    type Query { 
        Davies(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Schneider(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Chancellors(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Crest(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Governors(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Horan(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Hibbard(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Hilltop(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        HSS(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        McPhee(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        TowersSouth(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        ED(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Bridgman(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Centennial(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        KV(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        HFANorth(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        HFASouth(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        HeatingPlant(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Library(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Maintenance(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        PhillipsNorth(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        PhillipsSouth(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Nursing(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Murray(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Schofield(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Putnam(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        OakRidge(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Sutherland(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Thomas(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        Zorn(dataType:String!, average:String, sort:String, only:Int, baseIndex: Int, start:String, end:String, percentChange:String): [timeValue]
        tables:[String]
        history:[History]
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
        week: Int,
        hour: Int,
        minute: Int,
        second: Int,
        date: String,
        time: String,
        dateTime: String
      }

      type History {
          ID: String,
          ID_: String,
          HISTORYNAME: String,
          SOURCE: String,
          SOURCEHANDLE: String,
          TIMEZONE: String,
          INTERVAL_: String,
          SYSTEMTAGS: String,
          VALUEFACETS: String,
          TABLE_NAME: String,
          DB_TIMEZONE: String
      }
`)

module.exports = {
    "energySchema": energySchema
}