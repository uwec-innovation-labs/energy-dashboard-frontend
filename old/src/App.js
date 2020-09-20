import React from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Map from './components/Content/Map/Map'

function App () {
  return (
    <div>
      <Navigation />
      <center>
        <div className='map'>
          <Map />
        </div>
      </center>
    </div>
  )
}

export default App
