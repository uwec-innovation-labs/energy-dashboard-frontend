const axios = require('axios')

function getBuildingEnergyTypes(building) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query:
          `
           { query(building: "` +
          building +
          `") {
             
              energyAvailable
          }
          }
            `
      }
    }).then(result => {
      console.log(result)
      resolve(result.data)
    })
  })
}

function getGraphData(amountOfPoints, queryFilter, building, energyType) {
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
          energyType +
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

function getBuildingStats(building) {
  return new Promise((resolve, reject) => {
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
  getExportData: getExportData,
  getBuildingEnergyTypes: getBuildingEnergyTypes
}
