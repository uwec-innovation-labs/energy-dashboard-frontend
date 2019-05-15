import React, { Component } from 'react'
import '../styles/App.scss'
import { Spinner, Button, ButtonGroup } from 'reactstrap'
import { getGraphData, getBuildingEnergyTypes } from '../helpers/APIFrame'
import GraphNavigation from './GraphNavigation'
import { buildGraph } from '../helpers/GraphBuilder'

//const json2csv = require('json2csv')

class ScatterPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /* Graph Builder */
      building: 'Davies',
      data: '',
      mindate: '',
      maxdate: '',
      startDate: '',
      endDate: '',
      energyTypes: '',
      energyType: 'electricity',
      filterBy: 'week',
      queryFilter: '',

      /* State Transitions */
      updatingGraph: false,
      buttonUpdate: false,
      populateEnergyButtons: false,
      buildingUpdate: false,

      /* Connected Functions */
      updateStatCardsData: this.props.functionUpdateStatsData,

      /* Dynamic Buttons */
      electricityButton: false,
      heatButton: false,
      chillerButton: false,
      solarButton: false,

      /* Other */
      loading: true
    }

    this.handleEnergyButtons = this.handleEnergyButtons.bind(this)
    this.updateForBuilding = this.updateForBuilding.bind(this)
    this.getSettings = this.getSettings.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
    this.drawGraph = this.drawGraph.bind(this)
    this.updateFromButton = this.updateFromButton.bind(this)
    this.downloadData = this.downloadData.bind(this)
    this.updateForEnergyType = this.updateForEnergyType.bind(this)
  }

  handleEnergyButtons(event) {
    this.setState({
      data: null,
      energyType: event.target.value,
      buttonUpdate: true
    })
  }

  updateForBuilding(value) {
    this.setState({
      electricityButton: false,
      heatButton: false,
      chillerButton: false,
      solarButton: false,
      data: null,
      building: value,
      buttonUpdate: true,
      buildingUpdate: true
    })
    this.state.updateStatCardsData(value)
  }

  updateFromButton(value) {
    this.setState({ data: null, filterBy: value, buttonUpdate: true })
  }

  updateForEnergyType() {
    this.setState({ buttonUpdate: true, populateEnergyButtons: true })
  }

  updateGraph() {
    getBuildingEnergyTypes(this.state.building)
      .then(res => {
        this.setState({
          populateEnergyButtons: true,
          energyTypes: res,
          energyType: res.data.query.energyAvailable[0]
        })
      })
      .then(next => {
        this.getSettings().then(message => {
          getGraphData(
            this.state.queryFilter,
            this.state.building,
            this.state.energyType,
            this.state.startDate,
            this.state.endDate
          ).then(res => {
            this.setState({ data: res, updatingGraph: true })
          })
        })
      })
  }

  downloadData() {
    var csvData = []
    var data = this.state.data.data.query.electricity.data
    csvData[0] = ['electricity', 'timestamp', 'value', '\n']
    var c = 1
    data.forEach(d => {
      csvData[c] = [new Date(+d.timestamp), d.value, '\n']
      c++
    })
    csvData[c] = '\n'

    var filename = this.state.building + '(' + this.state.filterBy + ').csv'
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      var link = document.createElement('a')
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  getSettings() {
    return new Promise((resolve, reject) => {
      var dateStart
      if (this.state.filterBy === 'day') {
        dateStart = Date.now() - 86400000 // Day in Milliseconds is 86400000
        this.setState({
          startDate: new Date(dateStart),
          endDate: new Date(Date.now()),
          queryFilter: ''
        })

        resolve('Successfully set the correct amount of points and filter')
      } else if (this.state.filterBy === 'week') {
        dateStart = Date.now() - 604800000 // Week in Milliseconds is 604800000
        this.setState({
          startDate: new Date(dateStart),
          endDate: new Date(Date.now()),
          queryFilter: ''
        })

        resolve('Successfully set the correct amount of points and filter')
      } else if (this.state.filterBy === 'month') {
        dateStart = Date.now() - 2419000000 // 28 Days in Milliseconds is 604800000
        this.setState({
          startDate: new Date(dateStart),
          endDate: new Date(Date.now()),
          queryFilter: 'average: "hour"'
        })

        resolve('Successfully set the correct amount of points and filter')
      } else if (this.state.filterBy === 'year') {
        dateStart = Date.now() - 31540000000 // Year in Milliseconds is 604800000
        this.setState({
          startDate: new Date(dateStart),
          endDate: new Date(Date.now()),
          queryFilter: 'average: "day"'
        })

        resolve('Successfully set the correct amount of points and filter')
      } else {
        reject('Something went wrong here!')
      }
    })
  }

  componentDidMount() {
    this.updateGraph()
  }

  componentDidUpdate() {
    if (this.state.populateEnergyButtons) {
      console.log(this.state.energyTypes)
      for (
        let i = 0;
        i < this.state.energyTypes.data.query.energyAvailable.length;
        i++
      ) {
        console.log('TEST')
        var energy = this.state.energyTypes.data.query.energyAvailable[i]
        if (energy === 'electricity') {
          this.setState({
            populateEnergyButtons: false,
            electricityButton: true
          })
        } else if (energy === 'heat') {
          this.setState({ populateEnergyButtons: false, heatButton: true })
        } else if (energy === 'chiller') {
          this.setState({ populateEnergyButtons: false, chillerButton: true })
        } else if (energy === 'solar') {
          this.setState({ populateEnergyButtons: false, solarButton: true })
        }
      }
    }

    if (this.state.updatingGraph) {
      // getBuildingEnergyTypes(this.state.building).then(res => {
      //   this.setState({
      //     updatingGraph: false,
      //     populateEnergyButtons: true,
      //     energyTypes: res
      //   })
      this.setState({ updatingGraph: false })
      this.drawGraph(this.state.data)
      // })
    } else if (this.state.buttonUpdate) {
      this.setState({ buttonUpdate: false })
      // getBuildingEnergyTypes(this.state.building)
      //   .then(res => {
      //     this.setState({
      //       populateEnergyButtons: true,
      //       energyTypes: res,
      //       energyType: res.data.query.energyAvailable[0]
      //     })
      //   })
      //  .then(next => {
      if (this.state.buildingUpdate) {
        getBuildingEnergyTypes(this.state.building)
          .then(res => {
            console.log('DLFJLSDJ')
            this.setState({
              populateEnergyButtons: true,
              energyTypes: res,
              energyType: res.data.query.energyAvailable[0]
            })
          })
          .then(next => {
            this.getSettings().then(message => {
              getGraphData(
                this.state.queryFilter,
                this.state.building,
                this.state.energyType,
                this.state.startDate,
                this.state.endDate
              ).then(res => {
                this.setState({ data: res, updatingGraph: true })
              })
            })
          })
        this.setState({ buildingUpdate: false })
      } else {
        this.getSettings().then(message => {
          getGraphData(
            this.state.queryFilter,
            this.state.building,
            this.state.energyType,
            this.state.startDate,
            this.state.endDate
          ).then(res => {
            console.log(res)
            this.setState({ data: res, updatingGraph: true })
          })
        })
      }

      //})
    }
  }

  drawGraph(results) {
    // Calls the Graph Builder Helper Method
    if (this.state.data != null && this.state.energyType === 'electricity') {
      if (results.data.query == null) {
        buildGraph(
          null,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      } else {
        buildGraph(
          results.data.query.electricity.data,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      }
    } else if (this.state.data != null && this.state.energyType === 'heat') {
      if (results.data.query == null) {
        buildGraph(
          null,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      } else {
        buildGraph(
          results.data.query.heat.data,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      }
    } else if (this.state.data != null && this.state.energyType === 'chiller') {
      if (results.data.query == null) {
        buildGraph(
          null,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      } else {
        buildGraph(
          results.data.query.chiller.data,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      }
    } else if (this.state.data != null && this.state.energyType === 'solar') {
      if (results.data.query == null) {
        buildGraph(
          null,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      } else {
        buildGraph(
          results.data.query.solar.data,
          this.state.filterBy,
          this.state.startDate,
          this.state.endDate
        )
      }
    }

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

    let electricity
    if (this.state.electricityButton) {
      electricity = (
        <div>
          <Button
            color="success"
            onClick={this.handleEnergyButtons}
            value="electricity"
          >
            Electricity
          </Button>
        </div>
      )
    } else {
      electricity = null
    }

    let heat
    if (this.state.heatButton) {
      heat = (
        <div>
          <Button
            color="success"
            onClick={this.handleEnergyButtons}
            value="heat"
          >
            Heat
          </Button>
        </div>
      )
    } else {
      heat = null
    }

    let chiller
    if (this.state.chillerButton) {
      chiller = (
        <div>
          <Button
            color="success"
            onClick={this.handleEnergyButtons}
            value="chiller"
          >
            Chiller
          </Button>
        </div>
      )
    } else {
      chiller = null
    }

    let solar
    if (this.state.solarButton) {
      chiller = (
        <div>
          <Button
            color="success"
            onClick={this.handleEnergyButtons}
            value="solar"
          >
            Solar
          </Button>
        </div>
      )
    } else {
      solar = null
    }

    return (
      <div>
        <GraphNavigation
          functionFilter={this.updateFromButton}
          functionBuilding={this.updateForBuilding}
          functionDownloadData={this.downloadData}
          functionEnergyType={this.updateForEnergyType}
        />

        <div className="graphRow">
          <div className="card-graph">
            <ButtonGroup>
              {electricity}
              {heat}
              {chiller}
              {solar}
            </ButtonGroup>{' '}
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
