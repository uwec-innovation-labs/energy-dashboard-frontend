const sql = require('mssql')
require("dotenv").config()

async function getSQLData(query, args) {
  try {
    console.log("Opening database connection...")
    sql.close();
    let sqlData = sql
      .connect(
        'mssql://' + process.env.SQL_USER + ':' + process.env.SQL_PASS + '@' + process.env.SQL_SERVER + '/rdbmsdash'
      )
      .then(pool => {
        var request = pool.request();
        //Loads in input parameters, if any
        args.forEach(function(p) {
          request = request.input(p.name, p.value);
        });
        let sqlData2 = request.query(query)
        .then(result => {
          console.log("Data received");
          return result.recordset;
        });
        return sqlData2;
      })
    return sqlData;
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  "getSQLData": getSQLData
}