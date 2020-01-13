import React from 'react'
import ReactDOM from 'react-dom'
import Speedometer from './Speedometer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Speedometer />, div)
  ReactDOM.unmountComponentAtNode(div)
})
