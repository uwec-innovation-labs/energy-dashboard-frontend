import React, { Component } from 'react'
import '../styles/App.scss'

class Widget extends Component {
    render() {
        return (
        <a href="{this.props.link">
          <div className="Widget" style={{backgroundColor: this.props.backgroundColor}}>
            <header className="Widget-header">
              <p>
                {this.props.title}
              </p>
            </header>
            <p>
                {this.props.content}
            </p>
          </div>
        </a>
        )
      }
    }

    export default Widget
