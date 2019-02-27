import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './styles/App.css'
import Home from './components/Home'
import AppNav from './components/AppNav'
import FooterBar from './components/FooterBar'
import Export from './components/Export'


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/export" exact component={Export} />
      </Switch>
    );
  }
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App
