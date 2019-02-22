import React, { Component } from 'react'
import '../styles/App.css'
import TestGraph from './TestGraph'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="testGraph"></div>
        <TestGraph></TestGraph>
      </div>

    )
  }
}

export default Home
