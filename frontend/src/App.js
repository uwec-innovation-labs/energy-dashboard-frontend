import React, { Component } from 'react'
import logo from './media/logo.svg'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default App
