import React, { Component } from 'react'
import '../styles/App.scss'

class WidgetBar extends Component {
    render() {
        return (
          <div className="Widget-bar">
            {this.props.children}
          </div>
        )
      }
    }

    export default WidgetBar
