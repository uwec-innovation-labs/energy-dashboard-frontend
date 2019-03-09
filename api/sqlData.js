const sort = require('./routes/sort.js')
const sqlserver = require('./sqlConnect.js')

var newQuery = 'SELECT TOP 10 * FROM dbo.SCHNEIDER_HALL_LIBSOLPOWER_KW;'
var solarQuery =
  'SELECT TIMESTAMP AS timestamp, VALUE as value FROM dbo.SCHNEIDER_HALL_LIBSOLPOWER_KW;'

async function getSolar(parent, args, context, info) {
  var finalSolarQuery = solarQuery
  if (parent != null) {
    if (parent.only != null) {
      finalSolarQuery =
        solarQuery.slice(0, 6) + ' TOP ' + parent.only + solarQuery.slice(6)
    }
  }
  let returnData = await sqlserver.getSQLData(finalSolarQuery)
  returnData.forEach(function(data) {
    var fullDate = new Date(data.timestamp)
    data.timestamp = fullDate.toISOString()
  })
  return returnData
}

module.exports = {
  getSolar: getSolar
}
