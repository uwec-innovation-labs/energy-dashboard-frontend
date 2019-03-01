import React, { Component } from 'react'
import '../styles/App.css'
import ScatterPlot from './ScatterPlot'

class Home extends Component {
  render() {
    return (
      <div>
        <center>
          <h1> Energy Dashboard </h1>
          <h4> A Powerful Dashboard for UWEC Energy Usage Visualization </h4>
          <ScatterPlot/>
        </center>
      </div>
    )
  }
}

export default Home
