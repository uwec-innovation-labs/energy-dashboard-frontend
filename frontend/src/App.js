import React, { Component } from 'react'
import './styles/App.css'
import Home from './components/Home'
import AppNav from './components/AppNav'
import FooterBar from './components/FooterBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNav />
        <Home />
        <center>
          <FooterBar />
        </center>

      </div>
    )
  }
}

export default App
