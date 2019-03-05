import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

class Home extends Component {
  render() {
    return (
      <div>
        <center>
          <h1> Energy Dashboard </h1>
          <h4> A Powerful Dashboard for UWEC Energy Usage Visualization </h4>
          <div id="scatterContainer">
            <ScatterPlot/>
          </div>
        </center>
      </div>
    )
  }
}

export default Home
