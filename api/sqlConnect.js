const sql = require('mssql')
require('dotenv').config()

async function getSQLData(newQuery) {
  try {
    console.log('Opening database connection...')
    sql.close()
    let sqlData = sql
      .connect(
        `mssql://
          ${process.env.SQL_USER}:
          ${process.env.SQL_PASS}@
          ${process.env.SQL_SERVER}/
          ${process.env.SQL_DATABASE}`
      )
      .then(status => {
        //console.log(status)
        let sqlData2 = sql.query(newQuery).then(result => {
          console.log(result)
          return result.recordset
        })
        return sqlData2
      })
    return sqlData
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getSQLData: getSQLData
}
