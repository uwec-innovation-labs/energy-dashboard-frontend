import React, { Component } from 'react'
import '../styles/App.css'
import TestGraph from './TestGraph'

class Home extends Component {
  render() {
    return (
      <div>
        <TestGraph><div className="graphContainer"></div></TestGraph>
      </div>

    )
  }
}

export default Home
