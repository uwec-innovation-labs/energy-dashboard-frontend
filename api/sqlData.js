const sqlserver = require("./sqlConnect.js")
const sql = require('mssql')

var whereClauses;
var parameters;

async function master(parent, args, context, info) {
  var building = parent.building;
  var dataTypes = context.fieldNodes[0].selectionSet.selections;
  var fullData = {};
  await dataTypes.reduce(async (promise, dataType) => {
    await promise;
    var dataTypeName = dataType.name.value;
    parent.dataType = dataTypeName;
    fullData[dataTypeName] = {};
    if (dataTypeName === "energyAvailable") {
      fullData["energyAvailable"] = getEnergyAvailable(building);
    } else {
      if (parent.average != null) {
        let returnData = await average(parent, building);
        fullData[dataTypeName].data = returnData;
      } else {
        let returnData = await select(parent, building);
        fullData[dataTypeName].data = returnData;
      }

      var findStats = undefined;
      dataType.selectionSet.selections.forEach((selection) => {
        if (selection.name.value === "stats") {
          findStats = selection;
        }
      })
      if (findStats != undefined) {
        let stats = await computeStats(building, parent, findStats);
        fullData[dataTypeName].stats = stats;
      } 
    }
  }, Promise.resolve());
  return fullData;
}

function getEnergyAvailable(building) {
  var energyAvailable = [];
  if (building !== "Horan") {
    energyAvailable.push("electricity");
  }
  if (building === "Centennial" || building === "Chancellors" ||
   building === "Crest" || building === "Davies" || building === "Governors" ||
   building === "Hibbard" || building === "Hilltop" || building === "TowersSouth" ||
   building ==="Horan" || building === "HSS") {
     energyAvailable.push("heat");
   }
  if (building === "Schneider") {
    energyAvailable.push("solar");
  }
  if (building == "Hilltop" || building == "Horan" || building == "Library") {
    energyAvailable.push("chiller");
  }
  if (building == "Davies") {
    energyAvailable.push("energyRate");
  }
  return energyAvailable;
}

async function computeStats(building, parent, findStats) {
  var allStats = {};
  var statTypes = findStats.selectionSet.selections;
  await statTypes.reduce(async (promise, statType) => {
    await promise;
    statName = statType.name.value;
    var grab = 96;
    if (statName === "weekly") {
      grab *= 7;
    } else if (statName === "monthly") {
      grab *= 30;
    } else if (statName === "yearly") {
      grab *= 365
    }
    presentParent = {
      only: grab,
      sort: "timestamp high",
      average: null,
      dataType: parent.dataType
    }
    pastParent = {
      baseIndex: (grab * 2),
      only: grab,
      sort: "timestamp low",
      average: null,
      dataType: parent.dataType
    }
    var presentData = await select(presentParent, building);
    var pastData = await select(pastParent, building);

    var presentAvg = 0;
    presentData.forEach(function(data) {
      presentAvg += data.value;
    });
    presentAvg /= grab;

    var pastAvg = 0;
    pastData.forEach(function(data) {
      pastAvg += data.value;
    });
    pastAvg /= grab;
    
    allStats[statName] = {
      present: presentAvg,
      past: pastAvg
    }
  }, Promise.resolve());
  return allStats;
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
        avgQuery += "DATEPART(dayofyear, TIMESTAMP) as day, DATEPART(day, TIMESTAMP) as date, ";
        if (parent.average != "day") {
          avgQuery += "DATEPART(hour, TIMESTAMP) as hour, ";
        }
      }
    }
    avgQuery += "AVG(VALUE) as value FROM ";

    avgQuery = queryBuilder(avgQuery, parent, building);

    avgQuery += " GROUP BY DATEPART(year, TIMESTAMP)";
    if (parent.average != "year") {
      avgQuery += ", DATEPART(month, TIMESTAMP)";
      if (parent.average != "month") {
        avgQuery += ", DATEPART(dayofyear, TIMESTAMP), DATEPART(day, TIMESTAMP)";
        if (parent.average != "day") {
          avgQuery += ", DATEPART(hour, TIMESTAMP)";
        }
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
            avgQuery += ", DATEPART(dayofyear, TIMESTAMP) DESC";
            if (parent.average != "day") {
              avgQuery += ", DATEPART(hour, TIMESTAMP) DESC"
            }
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
              avgQuery += ", DATEPART(dayofyear, TIMESTAMP) ASC";
              if (parent.average != "day") {
                avgQuery += ", DATEPART(hour, TIMESTAMP) ASC"
              }
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
      var fullDate;
      if (data.week != undefined) {
        var month = Math.floor(data.week / 4.33);
        var date = Math.floor((data.week - (month * 4.33)) * 7);
        fullDate = new Date(data.year, month, date);
      } else {
        if (data.month != undefined) {
          if (data.day != undefined) {
            if (data.hour != undefined) {
              fullDate = new Date(data.year, data.month, data.date, data.hour, 0, 0, 0)
            } else {
              fullDate = new Date(data.year, data.month, data.date);
            }
          } else {
            fullDate = new Date(data.year, data.month, 1);
          }
        } else {
          fullDate = new Date(data.year, 0, 1);
        }
      }
      data.timestamp = fullDate.getTime();
    });
    return returnData;
  }
}

async function select(parent, building) {
  var solarQuery = 'SELECT TIMESTAMP AS timestamp, VALUE as value FROM ';
  solarQuery = queryBuilder(solarQuery, parent, building);  
  console.log(solarQuery);
  let returnData = await sqlserver.getSQLData(solarQuery, parameters);
  returnData.forEach(function(data) {
    var fullDate = new Date(data.timestamp);
    data.timestamp = fullDate.getTime();
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
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_DAVIESKW_TOT_VALUE";
    } 
  } else if (building == "Schneider") {
    if (parent.dataType == "solar") {
      query += "dbo.SCHNEIDER_HALL_LIBSOLTOTALYIELD";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_SCHNEIDERKW_TOT_VALUE";
    } 
  } else if (building == "Governors") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_GOVERNORS_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_GOVERNORSKW_TOT_VALUE";
    } 
  } else if (building == "Chancellors") {
    if (parent.dataType == "heat") {
      query += "dbo.CHANCELLORS_CHANCELLORS_CONDMTR_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
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
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_CREST_COMMONSKWH_TOT_VALUE";
    }
  } else if (building == "Hibbard") {
    if (parent.dataType == "heat") {
      query += "dbo.HIBBARD_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HIBBARDKW_TOT_VALUE";
    }
  } else if (building == "Hilltop") {
    if (parent.dataType == "heat") {
      query += "dbo.HILLTOP_LL_MISC_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HILLTOPKW_TOT_VALUE";
    } else if (parent.dataType == "chiller") {
      query += "dbo.SCHNEIDER_HALL_HILLTOP_CHILLERKW_TOT_VALUE";
    } 
  } else if (building == "HSS") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_HSS_CONDMTR_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HSSKW_TOT_VALUE";
    }
  } else if (building == "McPhee") {
    if (parent.dataType == "heat") {
      query += "dbo.MCPHEE_NATATORIUM_CONDENSATE_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_MCPHEEKW_TOT_VALUE";
    } 
  } else if (building == "TowersSouth") {
    if (parent.dataType == "heat") {
      query += "dbo.UWEC_TOWERSSOUTH3RD_HWCONV_CONDYESTERDAY";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_TOWERS_SOUTHKW_TOT_VALUE";
    } 
  } else if (building == "Bridgman") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_BRIDGEMANKW_TOT_VALUE";
    }
  } else if (building == "Centennial") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_CENTENNIAL_HALLKW_TOT_VALUE";
    } else if (parent.dataType == "heat") {
      query += "dbo.ED_BLDG_2ND_FL_JENE_CONDENSATEMETER_CONDYESTERDAY";
    }
  } else if (building == "KV") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_5KV_MAINKW_TOT_VALUE";
    }
  } else if (building == "HFANorth") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HFA_NORTHKW_TOT_VALUE";
    }
  } else if (building == "HFASouth") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HFA_SOUTHKW_TOT_VALUE";
    }
  } else if (building == "HeatingPlant") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_HEATING_PLANTKW_TOT_VALUE";
    }
  } else if (building == "Library") {
    if (parent.dataType == "chiller") {
      query += "dbo.SCHNEIDER_HALL_LIBRARY_CHILLERKW_TOT_VALUE";
    } else if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_LIBRARY_BLDG_ONLYKW_TOT_VALUE";
    }
  } else if (building == "Maintenance") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_MAINT_BLDGKW_TOT_VALUE";
    }
  } else if (building == "PhillipsNorth") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_PHILLIPS_NORTHKW_TOT_VALUE";
    }
  } else if (building == "PhillipsSouth") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_PHILLIPS_SOUTHKW_TOT_VALUE";
    }
  } else if (building == "Nursing") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_NURSINGKW_TOT_VALUE";
    }
  } else if (building == "Murray") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_MURRAYKW_TOT_VALUE";
    }
  } else if (building == "Schofield") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_SCHOFIELDKW_TOT_VALUE";
    }
  } else if (building == "Putnam") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_PUTNAMKW_TOT_VALUE";
    }
  } else if (building == "OakRidge") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_OAK_RIDGEKW_TOT_VALUE";
    }
  } else if (building == "Sutherland") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_SUTHERLANDKW_TOT_VALUE";
    }
  } else if (building == "Thomas") {
    if (parent.dataType == "electricity") {
      query += "dbo.SCHNEIDER_HALL_THOMASKW_TOT_VALUE";
    }
  } else if (building == "Zorn") {
    if (parent.dataType == "electricity") {
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

  if (parent.endIndex != null) {
    whereClauses.push("id <= @endIndex");
    parameters.push({
      name:'endIndex',
      value: parent.endIndex
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
  "master": master
}