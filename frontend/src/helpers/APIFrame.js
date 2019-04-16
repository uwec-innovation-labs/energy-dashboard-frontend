const axios = require("axios")

   function getGraphData(amountOfPoints, queryFilter){
       return new Promise((resolve, reject) => {
         axios({
           url: 'http://localhost:4000/graphql',
           method: 'post',
           data: {
             query: `
             query {
               Library(dataType: "energy", only:  `+ amountOfPoints +` , sort: "timestamp high"  `+ queryFilter +` ) {
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
         }).then((result) => {
           console.log(result)
           resolve(result.data)
         })
       })
   }

   function getDaily() {
     return new Promise((resolve, reject) => {
       console.log("Function called.")
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
         }).then((results) => {
           resolve(results.data)
         })
        })
   }

   module.exports = {
     "getGraphData": getGraphData,
     "getDaily": getDaily
   }