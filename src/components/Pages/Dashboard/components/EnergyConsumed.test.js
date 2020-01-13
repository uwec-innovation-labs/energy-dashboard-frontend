import React from 'react'
import ReactDOM from 'react-dom'
import EnergyConsumed from './EnergyConsumed'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EnergyConsumed />, div)
  ReactDOM.unmountComponentAtNode(div)
})
