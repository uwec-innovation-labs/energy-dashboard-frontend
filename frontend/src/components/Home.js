import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'
import { Card } from 'reactstrap'

class Home extends Component {
  render() {
    return (
      <div>
        <center>
          <h1> Energy Dashboard </h1>
          <h4> A Powerful Dashboard for UWEC Energy Usage Visualization </h4>
          <div id="scatterContainer">
            <Card id="scatterCard">
              <ScatterPlot/>
            </Card>
          </div>
        </center>
      </div>
    )
  }
}

export default Home
