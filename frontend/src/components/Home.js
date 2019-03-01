import React, { Component } from 'react'
import AppNav from './AppNav'
import '../styles/App.css'
import TestGraph from './TestGraph'
import FooterBar from './FooterBar'

class Home extends Component {
  render() {
    return (
      <div>
      <AppNav />
        <center>
          <h1> Energy Dashboard </h1>
            <h4> A Powerful Dashboard for UWEC Energy Usage Visualization </h4>
        </center>
        <div className="graph">
          <TestGraph></TestGraph>
        </div>
        <div>
          <FooterBar />
        </div>
      </div>
    )
  }
}

export default Home
