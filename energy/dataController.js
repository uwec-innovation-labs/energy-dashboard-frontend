const csv=require('csvtojson');
const converter=csv({
    noheader:true,
    trim:true,
});
const csvFilePath = './DSC_Solar.csv';

exports.getData = async (req, res) => {
	console.log('hit');
    
    let data = await csv({
        colParser:{
            "name":function(item, head, resultRow, row, colIdx) {
                return new Date(item);
            },
            "value":"number",
        },
        checkType:true
    }).fromFile(csvFilePath);
	
	//console.log(data);
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
	res.status(200).send(data);
		

};