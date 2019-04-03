import React, { Component } from 'react'
import * as d3 from 'd3'
import '../styles/App.scss'
import { Spinner, ButtonGroup, Button, DropdownMenu, ButtonDropdown, DropdownItem, DropdownToggle } from 'reactstrap'
import { CSVLink } from 'react-csv'

const axios = require("axios")

class ScatterPlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mindate: '',
      maxdate: '',
      loading: true,
      mounted: false,
      filterBy: 'week',
      resultsState: '',
      dropdownOpen: false,
      amountOfPoints: 0,
      updatingGraph: false
    }

    // Gets rid of errors
    this.getData = this.getData.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.handleButtons = this.handleButtons.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
  this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
  }));
  }

  componentDidMount() {
    this.setState({ mounted: true })
    this.getData();
  }

  getData() {
    if (this.state.filterBy === 'day') {
      this.setState({amountOfPoints: 96, updatingGraph: true }, console.log("BEEEEEP: " + this.state.amountOfPoints));
    } else if (this.state.filterBy === 'week') {
      this.setState({amountOfPoints: 672, updatingGraph: true}, console.log("BEEEEEP: " + this.state.amountOfPoints));
    } else if (this.state.filterBy === 'month') {
      this.setState({amountOfPoints: 2688, updatingGraph: true}, console.log("BEEEEEP: " + this.state.amountOfPoints));
    } else if (this.state.filterBy === 'year') {
      this.setState({amountOfPoints: 32256, updatingGraph: true}, console.log("BEEEEEP: " + this.state.amountOfPoints));
    }
  }

  componentDidUpdate() {
    if (this.state.updatingGraph) {
      axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
          query {
            Davies(dataType: "energy", only: ` + this.state.amountOfPoints + `, sort: "timestamp high") {
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
        this.setState({updatingGraph: false});
        this.updateGraph(result.data)
      });
    }
  }

  updateGraph(results) {
    results = results.data.Davies

    this.setState({resultsState: results})

    // Allows us to parse the time
    var parseTime = d3.timeParse("%a %b %e %Y %H:%M:%S");

    /* ---- Sizing Variables ---- */
    var margin = { top: 20, right: 30, bottom: 50, left: 150 }
    var width = 1000 - margin.left - margin.right
    var height = 275 - margin.top - margin.bottom

    /* ---- Min & Max Dates ---- */
    var mindate = parseTime(results[this.state.amountOfPoints-1].timestamp.date + " " + results[this.state.amountOfPoints-1].timestamp.time);
    var maxdate = parseTime(results[0].timestamp.date + " " + results[0].timestamp.time);

    /* ---- Data Cushion ---- */
    let percentGap = 0.2

    /* ---- X Scale ---- */
    var x = d3
      .scaleTime()
      .domain([mindate, maxdate])
      .range([0, width])

    /* ---- Y Scale ---- */
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
      .range([height, 0])

    /* ---- Creates Valueline ---- */
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

    /* ---- SVG Canvas ---- */
    var svg = d3
      .select('div.scatterPlotContainer')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

      .attr('viewBox', '0 0 1000 275')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    /* ---- Add Valueline ---- */
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

    /* ---- Binds Data to Points ---- */
    var points = svg
      .selectAll('circles')
      .attr('class', 'plotPoint')
      .data(results)

    /* ---- Appends Circles to Points ---- */
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

    /* ---- Value Formmater ---- */
    var formatValue = d3.format(".2f")

    /* ---- Hover Text ---- */
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

    /* ---- X-Axis (Year) ---- */
    var tickFormat;
    var ticks;
    if (this.state.filterBy === 'day') {
      ticks = d3.timeHour.every(1)
    } else if (this.state.filterBy === 'week') {
      ticks = d3.timeDay.every(1)
    } else if (this.state.filterBy === 'month') {
      ticks = d3.timeWeek.every(1)
    } else if (this.state.FilterBy === 'year') {
      ticks = d3.timeMonth.every(1)
    }
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          .tickFormat(d3.timeFormat('%A')) //%Y-%m-%d
          .ticks(ticks)
      )
      .transition()
      .duration(1500)
      .attr('opacity', 1)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dx', '0')
      .attr('dy', '5.0')



    /* ---- Y-Axis ---- */
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

    /* CURRENTLY DISABLED */
    /* ---- X-Axis Label ---- */
    /*
    svg.append("text")
      .attr("x", width / 2.0)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Date")
    */

    /* ---- Y-Axis Label ---- */
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

    /* CURRENTlY DISABLED */
    /* ---- Title ---- */
    /*
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

  handleButtons(event) {
    event.preventDefault();
    this.setState({ filterBy: event.target.value}, this.getData())
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
      <div className="scatterCard">
        <center>
        <ButtonGroup size="lg">
          <Button onClick={this.handleButtons} value="year">Year</Button>
          <Button onClick={this.handleButtons} value="month">Month</Button>
          <Button onClick={this.handleButtons} value="week">Week</Button>
          <Button onClick={this.handleButtons} value="day">Day</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Buildings
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Davies</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        </center>
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
