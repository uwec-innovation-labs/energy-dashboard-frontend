const axios = require('axios')

function getGraphData(amountOfPoints, queryFilter, building) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
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
      }
    }).then(result => {
      resolve(result.data)
    })
  })
}

function getStatCardData() {
  //console.log('Function called.')
  //var statCardResults

  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
               { query (dataType: "energy", building: "Davies", percentChange: "day") {
                   value
                 }
               }
                 `
      }
    }).then(statCardResults => {
      //statCardResults = statCardResults.data.data.Davies[0].value
      //console.log(statCardResults)
      resolve(statCardResults)

      //console.log('Stat card results are:')
      //console.log(statCardResults)
    })
  })
}

module.exports = {
  getGraphData: getGraphData,
  getStatCardData: getStatCardData
}
