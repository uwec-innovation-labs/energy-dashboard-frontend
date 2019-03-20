import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

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

  renderStats(statCards) {
    return (
      <div id="stats-container">
        {statCards.map((statCard, i) => (
          <div class="card" id="statCard" key={i}>
            <div class="card-content">
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
      <div class="centered">
        <div class="graphRow">
          <div class="card" id="graphCard">
            <ScatterPlot graphName="graph1" />
          </div>
          <div class="card" id="graphControlsCard">
            Something goes here
          </div>
        </div>
        <div class="cards" id="statCards">
          {this.renderStats(this.state.stats)}
        </div>
      </div>
    )
  }
}

export default Home
