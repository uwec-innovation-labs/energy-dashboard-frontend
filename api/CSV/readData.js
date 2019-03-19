//gets data from CVS files

const csv=require('csvtojson');
const converter=csv({
    noheader:true,
    trim:true,
});
const csvFilePath = './CSV/tiny.csv';
const buildingPath = './CSV/buildings.csv';
const fullDataPath = './CSV/DSC_Solar.csv';

async function readData() {
    let data = await csv({
        colParser:{
            "timestamp":function(item, head, resultRow, row, colIdx) {
                var fullDate = new Date(item);
                return {
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
            },
            "value":"number",
        },
        checkType:true
    }).fromFile(csvFilePath);
    return data;
}

async function readFullData() {
    let data = await csv({
        colParser:{
            "timestamp":function(item, head, resultRow, row, colIdx) {
                var fullDate = new Date(item);
                return {
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
            },
            "value":"number",
        },
        checkType:true
    }).fromFile(fullDataPath);
    return data;
}

async function readBuildings() {
    let data = await csv({
        colParser:{
            "name":"string",
        },
        checkType:true
    }).fromFile(buildingPath);
    return data;
}

module.exports = {
    "readData": readData,
    "readBuildings": readBuildings,
    "readFullData" : readFullData
}