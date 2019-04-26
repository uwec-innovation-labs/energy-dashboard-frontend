import React, { Component } from 'react'
import '../styles/App.css'
import logo from '../media/cwllogo.png'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard" id="dashboard">
        <header className="Dashboard-header">
          <img src={logo} className="Dashboard-logo" alt="logo" />
          <p>UW Eau Claire Energy Dashboard</p>
        </header>
      </div>
    )
  }
}

export default Dashboard
