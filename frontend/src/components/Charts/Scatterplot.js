import React, { useState, useEffect } from 'react'
import Chart from 'chart.js'
import { getGraphData } from '../../helpers/APIFrame'

export default function Scatterplot() {
  const [data, setData] = useState('')
  const [data2, setData2] = useState('')

  var chartRef = React.createRef()

  useEffect(() => {
    if (data === '' || data2 === '') {
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
        const queryFilter = ''
        const building = 'Centennial'
        const energyType = 'electricity'
        const startDate = new Date(Date.now() - 604800000)
        const endDate = new Date(Date.now())

        getGraphData(
          queryFilter,
          building,
          energyType,
          startDate,
          endDate
        ).then(response => {
          var arr = []
          response = response.data.query.electricity.data

          for (let i = 0; i < response.length; i++) {
            arr[i] = {
              x: new Date(parseInt(response[i].timestamp)),
              y: response[i].value
            }
          }

          setData2(arr)
        })
      }
    )
  }

  const mountGraph = () => {
    console.log(data)
    const myChartRef = chartRef.current.getContext('2d')

    new Chart(myChartRef, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Davies',
            backgroundColor: 'rgba(45,53,138,0)',
            borderColor: 'rgba(45,53,138,1)',
            data: data
          },
          {
            label: 'Library',
            backgroundColor: 'rgba(213,173,0,0)',
            borderColor: 'rgba(213,173,0,1)',
            data: data2
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
      <h1 style={{ textAlign: 'center' }}>Electricity</h1>
      <div
        style={{ margin: '36px', paddingLeft: '10px', paddingRight: '10px' }}
      >
        <canvas id="myChart" ref={chartRef} />
      </div>
    </div>
  )
}
