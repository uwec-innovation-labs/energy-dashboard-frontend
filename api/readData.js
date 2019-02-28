const csv=require('csvtojson');
const converter=csv({
    noheader:true,
    trim:true,
});
const csvFilePath = './tiny.csv';
const buildingPath = './buildings.csv';

async function readData() {
    let data = await csv({
        colParser:{
            "timestamp":function(item, head, resultRow, row, colIdx) {
                return new Date(item);
            },
            "value":"number",
        },
        checkType:true
    }).fromFile(csvFilePath);
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
    "readBuildings": readBuildings
}