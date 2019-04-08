const axios = require("axios")

class APIFrame {

    getGraphData(){
        var graphResults
        return graphResults
    }
    
    getStatCardData(){
        console.log("Function called.")
        var statCardResults
        axios({
            url: 'http://localhost:4000/graphql',
            method: 'post',
            data: {
              query: `
              query {
                Davies(dataType: "energy", percentChange: "day") {
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
          }).then((statCardResults) => {
            statCardResults = statCardResults.data.data.Davies[0].value
            console.log('Got the data.')
          });

          return statCardResults
    }
}

export default APIFrame