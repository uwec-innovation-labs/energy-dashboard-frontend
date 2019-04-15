import React, { Component } from 'react'
import * as d3 from 'd3'
import '../styles/App.scss'
import { Spinner } from 'reactstrap'
import { getGraphData } from '../helpers/APIFrame'
import GraphNavigation from './GraphNavigation'
import { buildGraph } from '../helpers/GraphBuilder'

class ScatterPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      mindate: '',
      maxdate: '',
      loading: true,
      filterBy: 'week',
      amountOfPoints: 0,
      updatingGraph: false,
      buttonUpdate: false,
      queryFilter: ''
    }

    this.getSettings = this.getSettings.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
    this.updateFromButton = this.updateFromButton.bind(this);

  }

  updateFromButton(value) {
    this.setState({filterBy: value, buttonUpdate: true});
  }



  updateGraph() {
    this.getSettings().then((message) => {
      getGraphData(this.state.amountOfPoints, this.state.queryFilter).then(res => {
        this.setState({data: res, updatingGraph: true});
      })
    })
  }

  getSettings() {
    return new Promise((resolve, reject) => {
      if (this.state.filterBy === 'day') {
        this.setState({amountOfPoints: 96, queryFilter: "" });
        resolve("Test");
      } else if (this.state.filterBy === 'week') {
        this.setState({amountOfPoints: 672, queryFilter: ''});
        resolve("Test");
      } else if (this.state.filterBy === 'month') {
        this.setState({amountOfPoints: 2688, queryFilter: ''});
        resolve("Test");
      } else if (this.state.filterBy === 'year') {
        this.setState({amountOfPoints: 365, queryFilter: 'average: "day"'});
        resolve("Test");
      }
    })
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    if (this.state.updatingGraph) {
      this.setState({updatingGraph: false});
      this.drawGraph(this.state.data);
    } else if (this.state.buttonUpdate) {
      this.setState({buttonUpdate: false })
      this.getSettings().then((message) => {
        getGraphData(this.state.amountOfPoints, this.state.queryFilter).then(res => {
          this.setState({data: res, updatingGraph: true});
        })
      })
    }
  }

  drawGraph(results) {
    // Calls the Graph Builder Helper Method
    buildGraph(results.data.Davies, this.state.queryFilter, this.state.amountOfPoints, this.state.filterBy);

    // Removes the Spinner
    this.setState({ loading: false })
  }

  render() {
    let spinner
    if (this.state.loading) {
      spinner = (
        <div>
          <Spinner className="spinner" color="success" />
          <h3>Loading Data...</h3>
        </div>
      )
    } else {
      spinner = null
    }
    return (
      <div>
        <GraphNavigation function={this.updateFromButton}></GraphNavigation>
          <div className="graphRow">
            <div className="card-graph">
              <div id="graphCard">
                <div className="scatterCard">
                  <center>{spinner}</center>
                  <div className="scatterPlotContainer" />
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default ScatterPlot
