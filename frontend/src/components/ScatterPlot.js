import React, { Component } from 'react'
import * as d3 from 'd3'
import '../styles/App.scss'
import { Spinner } from 'reactstrap'


const axios = require("axios")



class ScatterPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mindate: '',
      maxdate: '',
      loading: true,
      mounted: false,
      filterBy: 'year'
    }

    // Gets rid of errors
    this.handleChange = this.handleChange.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleMonthClick = this.handleMonthClick.bind(this)
    this.handleYearClick = this.handleYearClick.bind(this)
  }

  handleChange(event) {
    console.log('Event: ' + event)
  }

  componentDidMount() {
    this.setState({ mounted: true })
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
        query {
          Davies(dataType: "energy", only: 96, sort: "timestamp high") {
            timestamp {
              date
              time
            }
            value
          }
        }
          `
      }
    }).then((result) => {
      this.updateGraph(result.data)
    });
  }



  updateGraph(results) {
    results = results.data.Davies

    // Allows us to parse the time
    var parseTime = d3.timeParse("%a %b %e %Y %H:%M:%S");

    // Setting up Sizing Variables
    var margin = { top: 80, right: 30, bottom: 50, left: 150 }
    var width = 1000 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom

    // We have to manually set the dates right now
    var mindate = parseTime(results[95].timestamp.date + " " + results[95].timestamp.time);
    var maxdate = parseTime(results[0].timestamp.date + " " + results[0].timestamp.time);

    // Used to give cushion to the Data on Graph
    let percentGap = 0.2

    // This is the Date Scale
    var x = d3
      .scaleTime()
      .domain([mindate, maxdate])
      // Pixel Range in X Direction
      .range([0, width])

    // This is the Values Scale
    var y = d3
      .scaleLinear()
      .domain([
        d3.min(results, function(d) {
          return d.value - d.value * percentGap
        }),
        d3.max(results, function(d) {
          return d.value + d.value * percentGap
        })
      ])
      // Pixel Range in Y Direction
      .range([height, 0])

    // define the line
    var valueline = d3
      .line()
      .x(function(d) {
        var time = d.timestamp.date + " " + d.timestamp.time
        time = parseTime(time);
        return x(time)
      })
      .y(function(d) {
        return y(d.value)
      })
      .curve(d3.curveLinear)

    // Appends our SVG Canvas and sets it to a variable for easy usage
    var svg = d3
      .select('div.scatterPlotContainer')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

      .attr('viewBox', '0 0 1000 400')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Add the valueline path.
    svg
      .append('path')
      .data([results])
      .attr('class', 'line')
      .attr('d', valueline)
      .attr('opacity', 0)
      .transition()
      .delay(1500)
      .duration(500)
      .attr('opacity', 1)

    // Binds all of the data we parsed
    var points = svg
      .selectAll('circles')
      .attr('class', 'plotPoint')
      .data(results)

    //Appends circles for each data point binded
    points
      .enter()
      .append('circle')
      .attr('class', 'plotPoint')
      .attr('cy', function(d) {
        return y(d.value)
      })
      .attr('cx', function(d) {
        var time = d.timestamp.date + " " + d.timestamp.time
        time = parseTime(time)
        return x(time)
      })
      .attr('opacity', 0)
      .on('mouseover', function(d, i) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10)

        // Formats our value output to a float with two decimal places
        var formatValue = d3.format(".2f")

      svg
        .append('text')
        .attr('id', 't' + d.x + '-' + d.y + '-' + i)
        .attr('x', width)
        .attr('y', 0)
        .attr('font-size', 20)
        .style('text-anchor', 'end')
        .text('[' + d.timestamp.time + ' : ' + formatValue(d.value) + ']')
      })
      .on('mouseout', function(d, i) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 5)
          .delay(100)

        d3.select('#t' + d.x + '-' + d.y + '-' + i).remove()
      })
      .transition()
      .duration(1500)
      .attr('opacity', 1)
      .attr('r', 5)

    // Setting the x-axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          // This is the Format of the Text
          .tickFormat(d3.timeFormat('%H')) //%Y-%m-%d
          // How many ticks to (We can play with this range)
          .ticks(d3.timeMinute.every(60))
      )
      .transition()
      .duration(1500)
      .attr('opacity', 1)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dx', '0')
      .attr('dy', '5.0')

    // Setting up the y-axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisLeft(y).ticks())
      .transition()
      .duration(1500)
      .attr('opacity', 1)
      .selectAll('text')
      .style('text-anchor', 'end')

    /* Disabling this unless if we need it again
      // Don't want to delete it incase we need it again as well
      // Label for the X-axis
      svg.append("text")
        .attr("x", width / 2.0)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .text("Date")
      */

    // Label for the Y-Axis
    svg
      .append('text')
      .attr('x', 0 - height / 2.0)
      .attr('y', 0 - margin.bottom * 2)
      .style('text-anchor', 'middle')
      .text('Energy Consumption')
      .attr('transform', 'rotate(-90)')
      .transition()
      .duration(1500)
      .attr('opacity', 1)

    /* Also disabling the title. The title should be seperate from the svg for now
      // Title for the graph
      svg.append("text")
      .attr("x", 0 - margin.left + (width + margin.left + margin.right) / 2.0)
      .attr("y", 0 - margin.top / 2.0)
      .attr("font-size", 36)
      .attr("text-decoration", "underline")
      .style("text-anchor", "middle")
      .text("Time vs. Total Yield");
      */
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
  }

  handleYearClick() {
    this.setState({ filterBy: 'year' })
  }

  handleMonthClick() {
    this.setState({ filterBy: 'month' })
  }

  handleDayClick() {
    this.setState({ filterBy: 'day' })
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
        <center>{spinner}</center>
        <div className="scatterPlotContainer" />
      </div>
    )
  }
}

/* Button Navigation
<div>
  <ButtonGroup>
     <Button onClick={this.handleYearClick}>Year</Button>
     <Button onClick={this.handleMonthClick}>Month</Button>
     <Button onClick={this.handleDayClick}>Day</Button>
   </ButtonGroup>
</div>
*/
export default ScatterPlot
