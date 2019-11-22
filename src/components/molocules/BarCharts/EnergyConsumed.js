import React from 'react'
import Chart from 'chart.js'

export default class BarChart extends React.Component {
  componentDidMount () {
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
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
            data: [478, 1267, 734, 784, 433, 245, 523, 145, 523, 632, 146, 724]
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
  render () {
    return <canvas id='energyconsumedbarchart' />
  }
}
