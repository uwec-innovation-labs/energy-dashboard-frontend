const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const sqlData = require('./sqlData.js');
var path = require('path');

//get data types (Query, Solar, Building, Date)
var schema = require("./sqlSchema.js").energySchema;
const app = express();

var global = {
  Davies: sqlData.master,
  Schneider: sqlData.master,
  Chancellors: sqlData.master,
  Crest: sqlData.master,
  Governors: sqlData.master,
  Horan: sqlData.master,
  Hibbard: sqlData.master,
  Hilltop: sqlData.master,
  HSS: sqlData.master,
  McPhee: sqlData.master,
  TowersSouth: sqlData.master,
  ED: sqlData.master,
  Bridgman: sqlData.master,
  Centennial: sqlData.master,
  KV: sqlData.master,
  HFANorth: sqlData.master,
  HFASouth: sqlData.master,
  HeatingPlant: sqlData.master,
  Library: sqlData.master,
  Maintenance: sqlData.master,
  PhillipsNorth: sqlData.master,
  PhillipsSouth: sqlData.master,
  Nursing: sqlData.master,
  Murray: sqlData.master,
  Schofield: sqlData.master,
  Putnam: sqlData.master,
  OakRidge: sqlData.master,
  Sutherland: sqlData.master,
  Thomas: sqlData.master,
  Zorn: sqlData.master,
  tables: sqlData.getTables,
  test: sqlData.test,
  history: sqlData.history
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
)

app.get('/download', function(req, res){
  var file = "./CSV/tiny.csv";
  res.download(file);
});

/*function convertArrayOfObjectsToCSV(args) {  
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}

function downloadCSV(args) {  
  var data, filename, link;
  
  if (csv == null) return;

  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

app.get('/test', function(req, res) {
  sqlData.test().then(function(d) {
    var csv = convertArrayOfObjectsToCSV({
      data: d
    });
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    var data = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', "export.csv");
    link.click();
    res.sendFile(path.join(__dirname + '/index.html'));
  })
});*/

app.listen(4000, () => console.log('GraphQL is running on port 4000'))
