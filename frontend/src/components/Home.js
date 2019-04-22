import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'
import { getDaily, getWeekly, getMonthly, getYearly } from '../helpers/APIFrame'
import update from 'react-addons-update' // ES6

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderStats = this.renderStats.bind(this)
    this.handleStatColors = this.handleStatColors.bind(this)
    this.state = {
      stats: [
        {
          interval: 'Daily',
          dailyLabel: ''
        },
        {
          interval: 'Weekly',
          weeklyLabel: ''
        },
        {
          interval: 'Monthly',
          monthlyLabel: ''
        },
        {
          interval: 'Yearly',
          yearlyLabel: ''
        }
      ]
    }
  }

  componentDidMount() {
    setTimeout(() => {
      getDaily().then(result => {
        console.log(result.data.data.Library[0].value)
        this.setState({
          stats: update(this.state.stats, {
            0: {
              dailyLabel: { $set: result.data.data.Library[0].value.toFixed(2) }
            }
          })
        })
      })
      setTimeout(() => {
        getWeekly().then(result => {
          console.log(result.data.data.Library[0].value)
          this.setState({
            stats: update(this.state.stats, {
              1: {
                weeklyLabel: {
                  $set: result.data.data.Library[0].value.toFixed(2)
                }
              }
            })
          })
        })
        setTimeout(() => {
          getMonthly().then(result => {
            console.log(result.data.data.Library[0].value)
            this.setState({
              stats: update(this.state.stats, {
                2: {
                  monthlyLabel: {
                    $set: result.data.data.Library[0].value.toFixed(2)
                  }
                }
              })
            })
          })
          setTimeout(() => {
            getYearly().then(result => {
              console.log(result.data.data.Library[0].value)
              this.setState({
                stats: update(this.state.stats, {
                  3: {
                    yearlyLabel: {
                      $set: result.data.data.Library[0].value.toFixed(2)
                    }
                  }
                })
              })
            })
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }

  handleStatColors() {
    if (document.getElementById('dailyLabel').value === -72.15) {
      alert('equal!')
    }
  }

  renderStats(statCards) {
    return (
      <div id="stats-container">
        <div className="card" id="statCard">
          <div className="card-content">
            <h5> {this.state.stats[0].interval} </h5>
            <h2 id="dailyValue" style={{ color: Text >= 0 ? 'red' : 'green' }}>
              {' '}
              {this.state.stats[0].dailyLabel}{' '}
            </h2>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h5> {this.state.stats[1].interval} </h5>
            <h2 id="weeklyValue" style={{ color: Text >= 0 ? 'red' : 'green' }}>
              {' '}
              {this.state.stats[1].weeklyLabel}{' '}
            </h2>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h5> {this.state.stats[2].interval} </h5>
            <h2
              id="monthlyValue"
              style={{ color: Text >= 0 ? 'red' : 'green' }}
            >
              {' '}
              {this.state.stats[2].monthlyLabel}{' '}
            </h2>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h5> {this.state.stats[3].interval} </h5>
            <h2 id="yearlyValue" style={{ color: Text >= 0 ? 'red' : 'green' }}>
              {' '}
              {this.state.stats[3].yearlyLabel}{' '}
            </h2>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="centered">
          <ScatterPlot graphName="graph1" />
        </div>
        <div className="cards" id="statCards">
          {this.renderStats(this.state.stats)}
        </div>
      </div>
    )
  }
}

export default Home
