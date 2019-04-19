const axios = require('axios')

function getGraphData(amountOfPoints, queryFilter) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query:
          `
             query {
               Library(dataType: "energy", only:  ` +
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
      console.log(result)
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
             query {
               Library(dataType: "energy", percentChange: "day") {
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
             query {
               Library(dataType: "energy", percentChange: "week") {
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
             query {
               Library(dataType: "energy", percentChange: "month") {
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
             query {
               Library(dataType: "energy", percentChange: "year") {
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
