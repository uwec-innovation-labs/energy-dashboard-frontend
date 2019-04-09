import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'
import { getStatCardData } from '../helpers/APIFrame'

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderStats = this.renderStats.bind(this)
    var test = getStatCardData()
    console.log(test)
    this.state = {
      stats: [
        {
          interval: 'Daily',
          label: test
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
