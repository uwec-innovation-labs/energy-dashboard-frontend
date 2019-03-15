import React, { Component } from 'react'
import '../styles/App.css'

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
