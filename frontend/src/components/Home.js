import React, { Component } from 'react'
import '../styles/App.scss'
import ScatterPlot from './ScatterPlot'

// import { getBuildingStats } from '../helpers/APIFrame'
// import update from 'react-addons-update' // ES6
// import CountUp from 'react-countup'

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.renderStats = this.renderStats.bind(this)
  //   this.state = {
  //     functionGetBuilding: this.props.functionGetBuilding,
  //     loading: true,
  //     stats: [
  //       {
  //         interval: '24 Hrs',
  //         dailyLabel: ''
  //       },
  //       {
  //         interval: '7 Days',
  //         weeklyLabel: ''
  //       },
  //       {
  //         interval: '30 Days',
  //         monthlyLabel: ''
  //       },
  //       {
  //         interval: '1 Year',
  //         yearlyLabel: ''
  //       }
  //     ]
  //   }

  //   this.updateGraphStatsData = this.updateGraphStatsData.bind(this)
  //   this.updateGraphStats = this.updateGraphStats.bind(this)
  // }

  // updateGraphStats(daily, weekly, monthly, yearly) {
  //   this.setState({
  //     stats: update(this.state.stats, {
  //       0: {
  //         dailyLabel: { $set: daily.toFixed(2) }
  //       },
  //       1: {
  //         weeklyLabel: { $set: weekly.toFixed(2) }
  //       },
  //       2: {
  //         monthlyLabel: { $set: monthly.toFixed(2) }
  //       },
  //       3: {
  //         yearlyLabel: { $set: yearly.toFixed(2) }
  //       }
  //     })
  //   })
  // }

  // updateGraphStatsData(building) {
  //   setTimeout(() => {
  //     getBuildingStats(building).then(result => {
  //       if (result.data.data.query != null) {
  //         var daily =
  //           ((result.data.data.query.electricity.stats.daily.present -
  //             result.data.data.query.electricity.stats.daily.past) /
  //             result.data.data.query.electricity.stats.daily.past) *
  //           100
  //         var weekly =
  //           ((result.data.data.query.electricity.stats.weekly.present -
  //             result.data.data.query.electricity.stats.weekly.past) /
  //             result.data.data.query.electricity.stats.weekly.past) *
  //           100
  //         var monthly =
  //           ((result.data.data.query.electricity.stats.monthly.present -
  //             result.data.data.query.electricity.stats.monthly.past) /
  //             result.data.data.query.electricity.stats.monthly.past) *
  //           100
  //         var yearly =
  //           ((result.data.data.query.electricity.stats.yearly.present -
  //             result.data.data.query.electricity.stats.yearly.past) /
  //             result.data.data.query.electricity.stats.yearly.past) *
  //           100
  //         this.updateGraphStats(daily, weekly, monthly, yearly)
  //       }
  //     })
  //   }, 1000)
  // }

  // componentDidMount() {
  //   this.updateGraphStatsData('Davies')
  // }

  // renderStats(statCards) {
  //   return (
  //     <div id="stats-container">
  //       <div className="card" id="statCard">
  //         <div className="card-content">
  //           <h3> {this.state.stats[0].interval} </h3>
  //           <h3
  //             id="dailyValue"
  //             style={{ color: parseFloat(Text) >= 0.0 ? 'red' : 'green' }}
  //           >
  //             <CountUp
  //               start="0.00"
  //               end={this.state.stats[0].dailyLabel}
  //               duration="1.5"
  //               decimals="2"
  //             />
  //             %
  //           </h3>
  //         </div>
  //       </div>
  //       <div className="card" id="statCard">
  //         <div className="card-content">
  //           <h3> {this.state.stats[1].interval} </h3>
  //           <h3
  //             id="dailyValue"
  //             style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
  //           >
  //             <CountUp
  //               start="0.00"
  //               end={this.state.stats[1].weeklyLabel}
  //               duration="1.5"
  //               decimals="2"
  //             />
  //             %
  //           </h3>
  //         </div>
  //       </div>
  //       <div className="card" id="statCard">
  //         <div className="card-content">
  //           <h3> {this.state.stats[2].interval} </h3>
  //           <h3
  //             id="dailyValue"
  //             style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
  //           >
  //             <CountUp
  //               start="0.00"
  //               end={this.state.stats[2].monthlyLabel}
  //               duration="1.5"
  //               decimals="2"
  //             />
  //             %
  //           </h3>
  //         </div>
  //       </div>
  //       <div className="card" id="statCard">
  //         <div className="card-content">
  //           <h3> {this.state.stats[3].interval} </h3>
  //           <h3
  //             id="dailyValue"
  //             style={{ color: parseFloat(Text) >= 0 ? 'red' : 'green' }}
  //           >
  //             <CountUp
  //               start="0.00"
  //               end={this.state.stats[3].yearlyLabel}
  //               duration="1.5"
  //               decimals="2"
  //             />
  //             %
  //           </h3>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div>
        <div className="centered">
          <ScatterPlot
            functionUpdateStatsData={this.updateGraphStatsData}
            functionStats={this.updateGraphStats}
            graphName="graph1"
          />
        </div>

        {/* <div className="cards" id="statCards">
          {this.renderStats(this.state.stats)}
        </div> */}
      </div>
    )
  }
}

export default Home
