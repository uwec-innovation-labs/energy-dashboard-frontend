import React, { Component } from 'react'
import './styles/App.css'
import logo from './media/cwllogo.png'

class Dashboard extends Component {
    render() {
        return (
          <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <p>
                UW Eau Claire Energy Dashboard
              </p>
            </header>
          </div>
        )
      }
    }
    
    export default Dashboard