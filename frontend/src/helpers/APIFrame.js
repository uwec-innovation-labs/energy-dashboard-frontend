const axios = require("axios")

    export function getGraphData(){
        var graphResults
        return graphResults
    }
    
    export function getStatCardData() {
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

