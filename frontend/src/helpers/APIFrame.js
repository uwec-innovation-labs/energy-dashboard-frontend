const axios = require('axios')

function getGraphData(amountOfPoints, queryFilter, building, energyType) {
  console.log(energyType)
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query:
          `
           { query(building: "` +
          building +
          `", only: ` +
          amountOfPoints +
          ` sort: "timestamp high", ` +
          queryFilter +
          `) {
              ` +
          'electricity' +
          `{
                data {
                  timestamp
                  value
                }

              }
              energyAvailable
            }
          }
            `
      }

      /*{
        query:
          `
             { query 
               (dataType: "energy", building: "` +
          building +
          `", only:  ` +
          amountOfPoints +
          ` , sort: "timestamp high"  ` +
          queryFilter +
          ` ) {
                 timestamp {
                   date
                   time
                   year
                   month
                   day
                 }
                 value
               }
             }
               `
      }*/
    }).then(result => {
      resolve(result.data)
    })
  })
}

function getBuildingStats(building) {
  return new Promise((resolve, reject) => {
    console.log('Function called.')
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query:
          `
           { query(building: "` +
          building +
          `") {
              ` +
          'electricity' +
          `{
              stats {
                daily {
                  present
                  past
                }
                weekly {
                  present
                  past
                }
                monthly {
                  present
                  past
                }
                yearly {
                  present
                  past
                }
              }
            }
          }
        }
            `
      }
    }).then(results => {
      resolve(results)
    })
  })
}

function getExportData(building, energyType, start, end) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query:
          `
           { query(building: "` +
          building +
          `", start:"` +
          start +
          `", end:"` +
          end +
          `") {` +
          'electricity' +
          `{
                data {
                  timestamp
                  value
                }

              }
              energyAvailable
            }
          }
            `
      }
    }).then(result => {
      resolve(result.data)
    })
  })
}

module.exports = {
  getGraphData: getGraphData,
  getBuildingStats: getBuildingStats,
  getExportData: getExportData
}
