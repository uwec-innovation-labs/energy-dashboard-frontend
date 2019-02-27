const csv=require('csvtojson');
const converter=csv({
    noheader:true,
    trim:true,
});
const csvFilePath = './tiny.csv';

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

module.exports = {
    "readData": readData
}