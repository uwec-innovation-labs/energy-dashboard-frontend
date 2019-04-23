const axios = require('axios')

function getGraphData(amountOfPoints, queryFilter, building) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://18.213.193.137:4000/graphql',
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

function getDaily() {
  return new Promise((resolve, reject) => {
    console.log('Function called.')
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
             { query 
               (dataType: "energy", building: "Davies", percentChange: "day") {
                 value
               }
             }
               `
      }
    }).then(results => {
      resolve(results)
    })
  })
}

function getWeekly() {
  return new Promise((resolve, reject) => {
    console.log('Function called.')
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
        { query 
          (dataType: "energy", building: "Davies", percentChange: "week") {
            value
          }
        }
          `
      }
    }).then(results => {
      resolve(results)
    })
  })
}

function getMonthly() {
  return new Promise((resolve, reject) => {
    console.log('Function called.')
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
        { query 
          (dataType: "energy", building: "Davies", percentChange: "month") {
            value
          }
        }
          `
      }
    }).then(results => {
      resolve(results)
    })
  })
}

function getYearly() {
  return new Promise((resolve, reject) => {
    console.log('Function called.')
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
        { query 
          (dataType: "energy", building: "Davies", percentChange: "year") {
            value
          }
        }
          `
      }
    }).then(results => {
      resolve(results)
    })
  })
}

module.exports = {
  getGraphData: getGraphData,
  getDaily: getDaily,
  getWeekly: getWeekly,
  getMonthly: getMonthly,
  getYearly: getYearly
}
