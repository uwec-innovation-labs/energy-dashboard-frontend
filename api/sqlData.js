const sort = require("./routes/sort.js")
const sqlserver = require("./sqlConnect.js")
const sql = require('mssql')

var newQuery = 'SELECT TOP 10 * FROM dbo.SCHNEIDER_HALL_LIBSOLTOTALYIELD;'
var solarQuery = 'SELECT TIMESTAMP AS timestamp, VALUE as value FROM dbo.SCHNEIDER_HALL_LIBSOLTOTALYIELD'
var dateQuery = 'SELECT TOP 5 TIMESTAMP AS timestamp, VALUE as value FROM dbo.SCHNEIDER_HALL_LIBSOLTOTALYIELD WHERE CAST(TIMESTAMP as DATETIME) < CAST(@date as DATETIME);';

async function getSolar(parent, args , context, info) {
  var localSolarQuery = solarQuery;
  //parameters passed in by GraphQL
  if (parent != null) {
    //We will add all the 'where' clauses to the SQL statment at the end
    whereClauses = [];
    //Input parameters need to be passed along with the query
    parameters = [];
    
    //'only': selects first n records
    if (parent.only != null) {
      localSolarQuery = localSolarQuery.slice(0, 6) + " TOP " + parent.only + localSolarQuery.slice(6);
      parameters.push({
        name: 'top',
        value: parent.top
      })
    }

    //'start': earliest date
    if (parent.start != null) {
      whereClauses.push("CAST(TIMESTAMP AS DATETIME) > CAST(@start AS DATETIME)");
      parameters.push({
        name: 'start',
        value: new Date(parent.start)
      });
    }

    //'end': latest date
    if (parent.end != null) {
      whereClauses.push("CAST(TIMESTAMP AS DATETIME) > CAST(@end AS DATETIME)");
      parameters.push({
        name: 'end',
        value: new Date(parent.end)
      });
    }

    if (whereClauses.length > 0) {
      localSolarQuery += " WHERE " + whereClauses[0];
      var i = 1;
      while (i < whereClauses.length) {
        localSolarQuery += " AND " + whereClauses[i];
      }
    }

    //'sort': sorts by timestamp or value, asc or desc
    if (parent.sort != null) {
      if (parent.sort == "value high") {
        localSolarQuery += " ORDER BY VALUE DESC";
      } else if (parent.sort == "value low") {
        localSolarQuery += " ORDER BY VALUE ASC";
      } else if (parent.sort == "timestamp high") {
        localSolarQuery += " ORDER BY TIMESTAMP DESC"
      } else if (parent.sort == "timestamp low") {
        localSolarQuery += " ORDER BY TIMESTAMP ASC"
      }
    }
  }

  console.log(localSolarQuery);
  let returnData = await sqlserver.getSQLData(localSolarQuery, parameters);
  returnData.forEach(function(data) {
    var fullDate = new Date(data.timestamp);
    data.timestamp = {
        "year": fullDate.getFullYear(),
        "month": fullDate.getMonth(),
        "day": fullDate.getDate(),
        "hour": fullDate.getHours(),
        "minute": fullDate.getMinutes(),
        "second": fullDate.getSeconds(),
        "date": fullDate.toDateString(),
        "time": fullDate.toLocaleTimeString(),
        "dateTime": fullDate.toISOString()
    };
  });
  return returnData;
}

module.exports = {
  "getSolar": getSolar
}