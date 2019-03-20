const sqlserver = require("./sqlConnect.js")
const sql = require('mssql')

var whereClauses;
var parameters;

async function test() {
  var newQuery = 'SELECT TOP 10 VALUE, ((DATEPART(dayofyear, TIMESTAMP)) / 7) as week, DATEPART(year, TIMESTAMP) as year FROM dbo.SCHNEIDER_HALL_DAVIESKW_TOT_VALUE';
  let returnData = await sqlserver.getSQLData(newQuery, []);
  return returnData;

}

async function getHistoryConfig(parent, args , context, info) {
  var newQuery = 'SELECT * FROM dbo.HISTORY_CONFIG';
  let returnData = await sqlserver.getSQLData(newQuery, []);
  return returnData;
}

async function master(parent, args, context, info) {
  var building = context.fieldName;
  if (parent.percentChange != null) {
    parent.only = 2
    parent.average = parent.percentChange;
    parent.sort = "timestamp high";
    parent.start = null;
    parent.end = null;
    parent.baseIndex = null;
  } 
  if (parent.average != null) {
    return average(parent, building);
  } else {
    return select(parent, building)
  }
}

async function average(parent, building) {
  var avgQuery;
  var avgSort = parent.sort;
  parent.sort = null;
  if (parent.average == "week") {
    avgQuery = "SELECT AVG(VALUE) as value, ((DATEPART(dayofyear, TIMESTAMP)) / 7) as week, DATEPART(year, TIMESTAMP) as year FROM ";
    avgQuery = queryBuilder(avgQuery, parent, building);
    avgQuery += " GROUP BY DATEPART(year, TIMESTAMP), ((DATEPART(dayofyear, TIMESTAMP)) / 7)";
  } else {
    avgQuery = "SELECT DATEPART(year, TIMESTAMP) as year, ";
    if (parent.average != "year") {
      avgQuery += "DATEPART(month, TIMESTAMP) as month, ";
      if (parent.average != "month") {
        avgQuery += "DATEPART(dayofyear, TIMESTAMP) as day, DATEPART(day, TIMESTAMP) as date, "
      }
    }
    avgQuery += "AVG(VALUE) as value FROM ";

    avgQuery = queryBuilder(avgQuery, parent, building);

    avgQuery += " GROUP BY DATEPART(year, TIMESTAMP)";
    if (parent.average != "year") {
      avgQuery += ", DATEPART(month, TIMESTAMP)";
      if (parent.average != "month") {
        avgQuery += ", DATEPART(dayofyear, TIMESTAMP), DATEPART(day, TIMESTAMP)"
      }
    }
  }

  if (avgSort != null) {
    if (avgSort == "value high") {
      avgQuery += " ORDER BY AVG(VALUE) DESC";
    } else if (avgSort == "value low") {
      avgQuery += " ORDER BY AVG(VALUE) ASC";
    } else if (avgSort == "timestamp high") {
      avgQuery += " ORDER BY DATEPART(year, TIMESTAMP) DESC";
      if (parent.average != "year") {
        if (parent.average == "week") {
          avgQuery += ", ((DATEPART(dayofyear, TIMESTAMP)) / 7) DESC";
        } else {
            avgQuery += ", DATEPART(month, TIMESTAMP) DESC";
            if (parent.average != "month") {
              avgQuery += ", DATEPART(dayofyear, TIMESTAMP) DESC"
            } 
        }
      }
    } else if (avgSort == "timestamp low") {
      avgQuery += " ORDER BY DATEPART(year, TIMESTAMP) ASC";
      if (parent.average != "year") {
        if (parent.average == "week") {
          avgQuery += ", ((DATEPART(dayofyear, TIMESTAMP)) / 7) ASC";
        } else {
            avgQuery += ", DATEPART(month, TIMESTAMP) ASC";
            if (parent.average != "month") {
              avgQuery += ", DATEPART(dayofyear, TIMESTAMP) ASC"
            } 
        }
      }
    }
  }

  console.log(avgQuery);
  let returnData = await sqlserver.getSQLData(avgQuery, parameters);
  if (parent.percentChange != null) {
    var currentValue = returnData[0].value;
    var pastValue = returnData[1].value;
    var changeValue = (currentValue / pastValue * 100) - 100;
    return [{value: changeValue}];
  } else {
    returnData.forEach(function(data) {
      data.timestamp = {
        year: data.year,
        month: data.month,
        day: data.day,
        date: data.date,
        week: data.week
      }
    });
    return returnData;
  }
}

async function getTables(parent, args, context, info) {
  var tableQuery = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES';
  var tableNames = [];
  let returnData = await sqlserver.getSQLData(tableQuery, []);
  returnData.forEach(function(data) {
    tableNames.push(data.TABLE_NAME);
  });
  return tableNames;
}

async function select(parent, building) {
  var solarQuery = 'SELECT TIMESTAMP AS timestamp, VALUE as value FROM ';
  solarQuery = queryBuilder(solarQuery, parent, building);  
  let returnData = await sqlserver.getSQLData(solarQuery, parameters);
  returnData.forEach(function(data) {
    var fullDate = new Date(data.timestamp);
    data.timestamp = {
        "year": fullDate.getFullYear(),
        "month": fullDate.getMonth() + 1,
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

function queryBuilder(query, parent, building) {
  whereClauses = [];
  parameters = [];
  //get building you want data from
  if (building == "Davies") {
    if (parent.dataType == "energyRate") {
      query += "dbo.WRDAVIES_NC1_ENERGYRATE";
    } else if (parent.dataType == "heat") {
      query += "dbo.WRDAVIES_NC1_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_DAVIESKW_TOT_VALUE";
    } 
  } else if (building == "Schneider") {
    if (parent.dataType == "solar") {
      query += "dbo.SCHNEIDER_HALL_LIBSOLTOTALYIELD";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_SCHNEIDERKW_TOT_VALUE";
    } 
  } else if (building == "Governors") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_GOVERNORS_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_GOVERNORSKW_TOT_VALUE";
    } 
  } else if (building == "Chancellors") {
    if (parent.dataType == "heat") {
      query += "dbo.CHANCELLORS_CHANCELLORS_CONDMTR_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_CHANCELLORSKW_TOT_VALUE";
    } else if (parent.dataType == "chillers") {
      query += "dbo.SCHNEIDER_HALL_CHANCELLORS_CHILLERKW_TOT_VALUE";
    }
  } else if (building == "Horan") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_HORAN_CONDYESTERDAY";
    } else if (parent.dataType == "chiller") {
      query += "dbo.SCHNEIDER_HALL_HORANKW_TOT_VALUE";
    } 
  } else if (building == "Crest") {
    if (parent.dataType == "heat") {
      query += "dbo.CREST_CWC_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_CREST_COMMONSKWH_TOT_VALUE";
    }
  } else if (building == "Hibbard") {
    if (parent.dataType == "heat") {
      query += "dbo.HIBBARD_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HIBBARDKW_TOT_VALUE";
    }
  } else if (building == "Hilltop") {
    if (parent.dataType == "heat") {
      query += "dbo.HILLTOP_LL_MISC_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HILLTOPKW_TOT_VALUE";
    } else if (parent.dataType == "chiller") {
      query += "dbo.SCHNEIDER_HALL_HILLTOP_CHILLERKW_TOT_VALUE";
    } 
  } else if (building == "HSS") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_HSS_CONDMTR_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HSSKW_TOT_VALUE";
    }
  } else if (building == "McPhee") {
    if (parent.dataType == "heat") {
      query += "dbo.MCPHEE_NATATORIUM_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_MCPHEEKW_TOT_VALUE";
    } 
  } else if (building == "TowersSouth") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_TOWERSSOUTH3RD_HWCONV_CONDYESTERDAY";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_TOWERS_SOUTHKW_TOT_VALUE";
    } 
  } else if (building == "ED") {
    if (parent.dataType == "heat") {
      query += "dbo.ED_BLDG_2ND_FL_JENE_CONDENSATEMETER_CONDYESTERDAY";
    }
  } else if (building == "Bridgman") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_BRIDGEMANKW_TOT_VALUE";
    }
  } else if (building == "Centennial") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_CENTENNIAL_HALLKW_TOT_VALUE";
    }
  } else if (building == "KV") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_5KV_MAINKW_TOT_VALUE";
    }
  } else if (building == "HFANorth") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HFA_NORTHKW_TOT_VALUE";
    }
  } else if (building == "HFASouth") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HFA_SOUTHKW_TOT_VALUE";
    }
  } else if (building == "HeatingPlant") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_HEATING_PLANTKW_TOT_VALUE";
    }
  } else if (building == "Library") {
    if (parent.dataType == "chiller") {
      query += "dbo.SCHNEIDER_HALL_LIBRARY_CHILLERKW_TOT_VALUE";
    } else if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_LIBRARY_BLDG_ONLYKW_TOT_VALUE";
    }
  } else if (building == "Maintenance") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_MAINT_BLDGKW_TOT_VALUE";
    }
  } else if (building == "PhillipsNorth") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_PHILLIPS_NORTHKW_TOT_VALUE";
    }
  } else if (building == "PhillipsSouth") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_PHILLIPS_SOUTHKW_TOT_VALUE";
    }
  } else if (building == "Nursing") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_NURSINGKW_TOT_VALUE";
    }
  } else if (building == "Murray") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_MURRAYKW_TOT_VALUE";
    }
  } else if (building == "Schofield") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_SCHOFIELDKW_TOT_VALUE";
    }
  } else if (building == "Putnam") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_PUTNAMKW_TOT_VALUE";
    }
  } else if (building == "OakRidge") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_OAK_RIDGEKW_TOT_VALUE";
    }
  } else if (building == "Sutherland") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_SUTHERLANDKW_TOT_VALUE";
    }
  } else if (building == "Thomas") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_THOMASKW_TOT_VALUE";
    }
  } else if (building == "Zorn") {
    if (parent.dataType == "energy") {
      query += "dbo.SCHNEIDER_HALL_ZORNKW_TOT_VALUE";
    }
  }

  //'only': selects first n records
  if (parent.only != null) {
    query = query.slice(0, 6) + " TOP " + parent.only + query.slice(6);
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
    whereClauses.push("CAST(TIMESTAMP AS DATETIME) < CAST(@end AS DATETIME)");
    parameters.push({
      name: 'end',
      value: new Date(parent.end)
    });
  }

  if (parent.baseIndex != null) {
    whereClauses.push("id >= @baseIndex");
    parameters.push({
      name:'baseIndex',
      value: parent.baseIndex
    });
  }

  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses[0];
    var i = 1;
    while (i < whereClauses.length) {
      query += " AND " + whereClauses[i];
      i++;
    }
  }

  //'sort': sorts by timestamp or value, asc or desc
  if (parent.sort != null) {
    if (parent.sort == "value high") {
      query += " ORDER BY VALUE DESC";
    } else if (parent.sort == "value low") {
      query += " ORDER BY VALUE ASC";
    } else if (parent.sort == "timestamp high") {
      query += " ORDER BY TIMESTAMP DESC"
    } else if (parent.sort == "timestamp low") {
      query += " ORDER BY TIMESTAMP ASC"
    }
  }
  return query;
}

module.exports = {
  "getTables": getTables,
  "test": test,
  "master": master,
  "history": getHistoryConfig
}