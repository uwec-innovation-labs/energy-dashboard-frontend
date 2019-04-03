import React, { Component } from 'react'
import AppNav from './AppNav'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <AppNav />
        {this.props.children}
      </div>
    )
  }
}
