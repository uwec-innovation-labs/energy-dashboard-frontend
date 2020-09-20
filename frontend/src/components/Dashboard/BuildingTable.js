import React from 'react'
import './BuildingTable.css'

function BuildingTable () {
  return (
    <div>
      <table>
        <tr>
          <th>Building</th>
          <th>Total Data Points</th>
          <th>Last Updated</th>
        </tr>
        <tr>
          <td>Phillips Hall</td>
          <td>3485892</td>
          <td>Today</td>
        </tr>
      </table>
    </div>
  )
}

export default BuildingTable
