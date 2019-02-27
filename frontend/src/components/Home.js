import React, { Component } from 'react'
import AppNav from './AppNav'
import '../styles/App.css'
import TestGraph from './TestGraph'

class Home extends Component {
  render() {
    return (

      <div>
      <AppNav />
        <center>
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
