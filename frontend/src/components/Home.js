import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'
import { getDaily, getWeekly, getMonthly, getYearly } from '../helpers/APIFrame'
import update from 'react-addons-update' // ES6
import CountUp from 'react-countup'

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderStats = this.renderStats.bind(this)
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

    this.updateGraphStats = this.updateGraphStats.bind(this)
  }

  updateGraphStats(daily, weekly, monthly, yearly) {
    this.setState({
      stats: update(this.state.stats, {
        0: {
          dailyLabel: { $set: daily.toFixed(2) }
        },
        1: {
          weeklyLabel: { $set: weekly.toFixed(2) }
        },
        2: {
          monthlyLabel: { $set: monthly.toFixed(2) }
        },
        3: {
          yearlyLabel: { $set: yearly.toFixed(2) }
        }
      })
    })
  }

  componentDidMount() {
    /*
    setTimeout(() => {
      getDaily().then(result => {
        this.setState({
          stats: update(this.state.stats, {
            0: {
              dailyLabel: { $set: result.data.data.query[0].value.toFixed(2) }
            }
          })
        })
      })
      setTimeout(() => {
        getWeekly().then(result => {
          this.setState({
            stats: update(this.state.stats, {
              1: {
                weeklyLabel: {
                  $set: result.data.data.query[0].value.toFixed(2)
                }
              }
            })
          })
        })
        setTimeout(() => {
          getMonthly().then(result => {
            this.setState({
              stats: update(this.state.stats, {
                2: {
                  monthlyLabel: {
                    $set: result.data.data.query[0].value.toFixed(2)
                  }
                }
              })
            })
          })
          setTimeout(() => {
            getYearly().then(result => {
              this.setState({
                stats: update(this.state.stats, {
                  3: {
                    yearlyLabel: {
                      $set: result.data.data.query[0].value.toFixed(2)
                    }
                  }
                })
              })
            })
          }, 900)
        }, 900)
      }, 900)
    }, 900)
    */
  }

  renderStats(statCards) {
    return (
      <div id="stats-container">
        <div className="card" id="statCard">
          <div className="card-content">
            <h3> {this.state.stats[0].interval} </h3>
            <h3
              id="dailyValue"
              style={{ color: parseFloat(Text) >= 0.0 ? 'red' : 'green' }}
            >
              <CountUp
                start="0.00"
                end={this.state.stats[0].dailyLabel}
                duration="1.5"
                decimals="2"
              />
            </h3>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h3> {this.state.stats[1].interval} </h3>
            <h3
              id="dailyValue"
              style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
            >
              <CountUp
                start="0.00"
                end={this.state.stats[1].weeklyLabel}
                duration="1.5"
                decimals="2"
              />
            </h3>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h3> {this.state.stats[2].interval} </h3>
            <h3
              id="dailyValue"
              style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
            >
              <CountUp
                start="0.00"
                end={this.state.stats[2].monthlyLabel}
                duration="1.5"
                decimals="2"
              />
            </h3>
          </div>
        </div>
        <div className="card" id="statCard">
          <div className="card-content">
            <h3> {this.state.stats[3].interval} </h3>
            <h3
              id="dailyValue"
              style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
            >
              {console.log(parseFloat(Text)) >= 0}
              <CountUp
                start="0.00"
                end={this.state.stats[3].yearlyLabel}
                duration="1.5"
                decimals="2"
              />
            </h3>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="centered">
          <ScatterPlot
            functionStats={this.updateGraphStats}
            graphName="graph1"
          />
        </div>
        <div className="cards" id="statCards">
          {this.renderStats(this.state.stats)}
        </div>
      </div>
    )
  }
}

export default Home
