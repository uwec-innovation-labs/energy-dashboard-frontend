import React, { useState, useEffect } from 'react'
import Chart from 'chart.js'
import { getGraphData } from '../../helpers/APIFrame'

export default function Scatterplot() {
  const [data, setData] = useState('')

  var chartRef = React.createRef()

  useEffect(() => {
    if (data === '') {
      fetchData()
    } else {
      mountGraph()
    }
  }, [data])

  const fetchData = () => {
    const queryFilter = ''
    const building = 'Davies'
    const energyType = 'electricity'
    const startDate = new Date(Date.now() - 604800000)
    const endDate = new Date(Date.now())
    getGraphData(queryFilter, building, energyType, startDate, endDate).then(
      response => {
        var arr = []
        response = response.data.query.electricity.data

        for (let i = 0; i < response.length; i++) {
          arr[i] = {
            x: new Date(parseInt(response[i].timestamp)),
            y: response[i].value
          }
        }

        setData(arr)
      }
    )
  }

  const mountGraph = () => {
    console.log(data)
    const myChartRef = chartRef.current.getContext('2d')

    new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        datasets: [
          {
            label: 'Electricity',
            data: data
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          ]
        }
      }
    })
  }

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  )
}
