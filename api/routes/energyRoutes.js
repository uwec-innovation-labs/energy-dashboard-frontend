const readData = require("./../CSV/readData.js")
const sort = require("./sort.js")

//load in data from csv files
var data;
readData.readData().then(function(result) {
  data = result;
});
var fullData;
readData.readFullData().then(function(result) {
  fullData = result;
});
var buildings;
readData.readBuildings().then(function(result) {
  buildings = result;
});
  
  var getSolar = (parent, args, context, info) => {
    var newData = data;
    if (parent != null) {
      if (parent.sort != null) {
        //chronological is the default, since that's how the csv file is generated
        if (parent.sort == "high") {
          newData = newData.sort(sort.bySolarHigh);     
        } else if (parent.sort == "low") {
          newData = newData.sort(sort.bySolarLow);   
        }
      }
      if (parent.only != null && Number.isInteger(parent.only)) {
        newData = newData.slice(0, parent.only);
      }
    }
    return newData;
  }
  
  var getBuildings = () => {
    return buildings;
  }
  
  var getFullData = () => {
  return fullData;
}

module.exports = {
    "getSolar": getSolar,
    "getBuildings": getBuildings,
    "getFullData": getFullData
}