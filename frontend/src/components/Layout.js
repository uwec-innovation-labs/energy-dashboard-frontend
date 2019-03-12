import React, { Component } from 'react'
import AppNav from './AppNav'
import FooterBar from './FooterBar'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <AppNav />
        {this.props.children}
        <FooterBar />
      </div>
    )
  }
}
