import React from 'react'
import Chart from 'chart.js'

export default class BarChart extends React.Component {
  componentDidMount () {
    var chrt = document.getElementById('energyconsumedbarchart')
    if (chrt == null) {
      //console.log('Context not supported.')
    } else {
      var ctx = chrt.getContext('2d')
      var gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(50,255,50,1)')
      gradient.addColorStop(0.5, 'rgba(50,255,50,.5)')
      gradient.addColorStop(1, 'rgba(50,255,50,0)')
      new Chart(document.getElementById('energyconsumedbarchart'), {
        type: 'bar',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'November',
            'December'
          ],
          datasets: [
            {
              label: 'Electricty Consumption',
              backgroundColor: gradient,
              borderColor: 'rgba(0, 255, 0, .8)',
              borderWidth: 3,
              data: [
                478,
                1267,
                734,
                784,
                433,
                245,
                523,
                145,
                523,
                632,
                146,
                724
              ]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Electricty Consumption (kW/hr) by Month for 2019'
          },
          maintainAspectRatio: false,
          responsive: true
        }
      })
    }
  }
  render () {
    return <canvas id='energyconsumedbarchart' />
  }
}
