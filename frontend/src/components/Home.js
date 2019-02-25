import React, { Component } from 'react'
import '../styles/App.css'
import TestGraph from './TestGraph'

class Home extends Component {
  render() {
    return (
      <div>
        <center>
          <img
             src={require("../media/cwllogo.png")}
             className="img-responsive"
             id="cwlLogo"
             alt="The clearwater labs logo"
           />
          <h1> Energy Dashboard </h1>
          <h4> A Powerful Dashboard for UWEC Energy Usage Visualization </h4>

        </center>
        <div className="graph"></div>
        <TestGraph></TestGraph>

      </div>

    )
  }
}

export default Home
