import React, { Component } from 'react'
import '../styles/App.scss'

class FooterBar extends Component {
  render() {
    return (
      <div>
        <div className="footerbar">
          <div className="footerbar-left">
            <span>&copy; 2019 Someone </span>
            <a
              href="https://github.com/clearwater-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Our Github
            </a>
            <a
              href="https://www.uwec.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              UWEC Webpage{' '}
            </a>
          </div>
          <div className="footerbar-center" />
          <div className="footerbar-right">
            <a href="/feedback">Feedback</a>
            <a href="/contact">Contact</a>
            <a href="/privacypolicy">Privacy Policy</a>
          </div>
        </div>
      </div>
    )
  }
}

export default FooterBar
