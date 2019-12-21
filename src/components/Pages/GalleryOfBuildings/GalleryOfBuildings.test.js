import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import GalleryOfBuildings from './GalleryOfBuildings'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router>
      <GalleryOfBuildings />
    </Router>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
