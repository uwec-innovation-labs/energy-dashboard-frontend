import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.scss'
import Home from './components/Home'
import Export from './components/Export'
import PrivacyPolicy from './components/PrivacyPolicy'
import Layout from './components/Layout'


const axios = require("axios")
axios({
  url: 'http://localhost:4000/graphql',
  method: 'post',
  data: {
    query: `
    query {
      Davies(dataType: "energy", only: 5, sort: "timestamp high") {
        timestamp {
          year
          dateTime
        }
        value
      }
      Library(dataType: "energy", only: 5, sort: "timestamp high") {
        timestamp {
          year
          dateTime
        }
        value
      }
    }
      `
  }
}).then((result) => {
  console.log(result.data)
});


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/export" exact component={Export} />
        <Route path="/privacypolicy" exact component={PrivacyPolicy} />
      </Switch>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Layout>
    )
  }
}

export default App
