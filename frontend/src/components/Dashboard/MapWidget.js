import React from 'react'
import MapImage from '../../images/map.svg'

function MapWidget () {
  return (
    <div>
      <img
        src={MapImage}
        alt='university of eau claire map'
        style={{ borderRadius: '4px' }}
      ></img>
    </div>
  )
}

export default MapWidget
