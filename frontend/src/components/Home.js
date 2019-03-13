import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

class Home extends Component {
  render() {
    return (
      <div class="centered">
        <div class="cards">
          <div class="card">
              <h4> Q1 </h4>
          </div>
          <div class="card">
              <h4> Q2 </h4>
                <ScatterPlot graphName="graph1"/>
          </div>
          <div class="card">
            <h4> Q3 </h4>
          </div>
          <div class="card">
            <h4> Q4 </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
