import React from 'react'
import logo from '../../images/SOSBrand.png'

import './Navigation.css'

export default class Navigation extends React.Component {
  render () {
    return (
      <div className='navigation-bar'>
        <div id='navigation-container'>
          <img src={logo} alt='student office of sustainability logo' />
          <ul>
            <li>
              <a href='/'>Dashboard</a>
            </li>
            <li>
              <a href='/'>Resources</a>
            </li>
            <li>
              <a href='/'>About</a>
            </li>
            <li>
              <a href='/'>Get in Touch</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
