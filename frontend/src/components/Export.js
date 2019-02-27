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
          <h2>
            Energy Dashboard Data Export
          </h2>
          <p>
            Data will export in a .CSV format that can be opened in Excel.
          </p>
          <content>
            Choose a building to export data from.
          <form>
            <select>
              <option value="Davies Student Center">Davies Student Center</option>
              <option value="McIntyre Library">McIntyre Library</option>
            </select>
          </form>
          </content>
        </center>
        <center>
          <FooterBar />
        </center>
      </div>
    )
  }
}

export default Export
