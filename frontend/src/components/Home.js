import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

const axios = require("axios")

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderStats = this.renderStats.bind(this)
    this.state = {
      stats: [
        {
          interval: 'Daily',
          label: '--%'
        },
        {
          interval: 'Weekly',
          label: '--%'
        },
        {
          interval: 'Monthly',
          label: '--%'
        },
        {
          interval: 'Yearly',
          label: '--%'
        }
      ]
    }
  }

  componentDidMount(){
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
    }).then((result) => {
      console.log(result.data)
    });
  }

  renderStats(statCards) {
    return (
      <div id="stats-container">
        {statCards.map((statCard, i) => (
          <div className="card" id="statCard" key={i}>
            <div className="card-content">
              <h5> {statCard.interval} </h5>
              <h4> {statCard.label} </h4>
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="centered">
        <div className="graphRow">
          <div className="card" id="graphCard">
            <ScatterPlot graphName="graph1" />
          </div>
        </div>
        <div className="cards" id="statCards">
          {this.renderStats(this.state.stats)}
        </div>
      </div>
    )
  }
}

export default Home
