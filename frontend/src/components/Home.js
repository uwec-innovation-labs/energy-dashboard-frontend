import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

class Home extends Component {
  render() {
    return (
      <div class="centered">
      <div class="graphRow">
      <div class='card' id="graphCard">
        <ScatterPlot graphName="graph1"/>
      </div>
      <div class='card' id="graphControlsCard">
        Something goes here
      </div>
      </div>
        <div class="cards" id="statCards">
          <div class="card" id="statCard">
            <div class="card-content">
              <h5> Daily </h5>
              <h4> --% </h4>
            </div>
          </div>
          <div class="card" id="statCard">
            <div class="card-content">
              <h5> Weekly </h5>
              <h4> --% </h4>
            </div>
          </div>
          <div class="card" id="statCard">
            <div class="card-content">
              <h5> Monthly </h5>
              <h4> --% </h4>
            </div>
          </div>
          <div class="card" id="statCard">
            <div class="card-content">
              <h5> Yearly </h5>
              <h4> --% </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
