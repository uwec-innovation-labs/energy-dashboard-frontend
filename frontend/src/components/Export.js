import React, { Component } from 'react'
import '../styles/App.css'
import FooterBar from './FooterBar'
import AppNav from './AppNav'

class Export extends Component {
  render() {
    return (
      <div>
      <AppNav />
        <center>
          This is the export page.
        </center>
        <center>
        <FooterBar />
        </center>
      </div>
    )
  }
}

export default Export
