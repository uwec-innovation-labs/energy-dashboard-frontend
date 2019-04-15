const axios = require("axios")

   function getGraphData(amountOfPoints, queryFilter){
       return new Promise((resolve, reject) => {
         axios({
           url: 'http://localhost:4000/graphql',
           method: 'post',
           data: {
             query: `
             query {
               Davies(dataType: "energy", only:  `+ amountOfPoints +` , sort: "timestamp high"  `+ queryFilter +` ) {
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
           resolve(result.data)
         })
       })
   }

   function getStatCardData() {
       console.log("Function called.")
       var statCardResults
       axios({
           url: 'http://localhost:4000/graphql',
           method: 'post',
           data: {
             query: `
             query {
               Davies(dataType: "energy", percentChange: "day") {
                 value
               }
             }
               `
           }
         }).then((statCardResults) => {
           statCardResults = statCardResults.data.data.Davies[0].value
           console.log('Stat card results are:')
           console.log(statCardResults)
         });
         return statCardResults
   }

   module.exports = {
     "getGraphData": getGraphData,
     "getStatCardData": getStatCardData
   }