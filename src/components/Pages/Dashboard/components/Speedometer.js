import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

export default class Speedometer extends React.Component {
  render () {
    return (
      <div
        style={{
          width: '100%',
          height: '200px'
        }}
      >
        <ReactSpeedometer
          fluidWidth={true}
          minValue={100}
          maxValue={500}
          value={473}
          needleColor='red'
        />
      </div>
    )
  }
}
