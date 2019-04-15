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
  query: sqlData.master
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
