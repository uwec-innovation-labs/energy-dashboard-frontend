import React, { Component } from 'react'
import * as d3 from 'd3'
import '../styles/App.scss'
import { Spinner, ButtonGroup, Button, DropdownMenu, ButtonDropdown, DropdownItem, DropdownToggle } from 'reactstrap'

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
      updatingGraph: false,
      updatingPoints: false,
      queryFilter: ''
    }

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
      this.setState({amountOfPoints: 96, queryFilter: "", updatingGraph: true });
    } else if (this.state.filterBy === 'week') {
      this.setState({amountOfPoints: 672, queryFilter: '', updatingGraph: true});
    } else if (this.state.filterBy === 'month') {
      this.setState({amountOfPoints: 28, queryFilter: 'average: "day"', updatingGraph: true});
    } else if (this.state.filterBy === 'year') {
      this.setState({amountOfPoints: 12, queryFilter: 'average: "month"', updatingGraph: true});
    }
  }

  componentDidUpdate() {
    if (this.state.updatingPoints) {
      this.setState({updatingPoints: false})
      this.getData();
    }

    if (this.state.updatingGraph) {
      axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
          query {
            Davies(dataType: "energy", only: ` + this.state.amountOfPoints + `, sort: "timestamp high" ` + this.state.queryFilter + `) {
              timestamp {
                date
                time
                year
                month
                day
              }
              value
            }
          }
            `
        }
      }).then((result) => {
        this.setState({updatingGraph: false});
        this.updateGraph(result.data)
        axios({
          url: 'http://localhost:4000/graphql',
          method: 'post',
          data: {
            query: `
            query {
              Davies(dataType: "energy", percentChange: "day") {
                value
              }
            }
              `
          }
        }).then((result2) => {
          console.log(result2.data.data.Davies[0].value)
        });
      });
    }
  }

  updateGraph(results) {
    // RESULTS
    results = results.data.Davies
    this.setState({resultsState: results})
    console.log(results);

    // TIME PARSARS
    var parseDayTime = d3.timeParse("%a %b %e %Y %H:%M:%S");
    var parseOtherTime = d3.timeParse("%d %m %Y");

    // SIZING VARIABLES
    var margin = { top: 20, right: 30, bottom: 50, left: 150 }
    var width = 1000 - margin.left - margin.right
    var height = 275 - margin.top - margin.bottom

    console.log(parseOtherTime("10 10 2019"));

    // MIN AND MAX DATES
    var mindate;
    var maxdate;
    if (this.state.queryFilter === "") {
      mindate = parseDayTime(results[this.state.amountOfPoints-1].timestamp.date + " " + results[this.state.amountOfPoints-1].timestamp.time);
      maxdate = parseDayTime(results[0].timestamp.date + " " + results[0].timestamp.time);
    } else {
      mindate = parseOtherTime(results[this.state.amountOfPoints-1].timestamp.date + " " + results[this.state.amountOfPoints-1].timestamp.month + " " + results[this.state.amountOfPoints-1].timestamp.year);
      maxdate = parseOtherTime(results[0].timestamp.date + " " + results[0].timestamp.month + " " + results[0].timestamp.year);
    }

    console.log("Min: " + mindate + " Max: " + maxdate);

    // DATA GAP
    /*
     * This is the gap between the max value and the top, and the min value and bottom.
     * It basically just looks better this way.
     */
    let percentGap = 0.2

    // X-SCALE
    var x = d3
      .scaleTime()
      .domain([mindate, maxdate])
      .range([0, width])

    // Y-SCALE
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

    // CREATES VALUELINE
    var queryFilter = this.state.queryFilter;
    var valueline = d3
      .line()
      .x(function(d) {
        var time;
        if (queryFilter === "") {
          time = d.timestamp.date + " " + d.timestamp.time;
          time = parseDayTime(time);
        } else {
          time = d.timestamp.date + " " + d.timestamp.month + " " + d.timestamp.year;
          time = parseOtherTime(time);
        }

        return x(time)
      })
      .y(function(d) {
        return y(d.value)
      })
      .curve(d3.curveLinear)

    // SVG CANVAS
    d3.select("svg").remove()
    var svg = d3
      .select('div.scatterPlotContainer')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

      .attr('viewBox', '0 0 1000 275')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // ADDS VALUELINE
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

    // BINDS DATA TO POINTS
    var points = svg
      .selectAll('circles')
      .attr('class', 'plotPoint')
      .data(results)

    // APPENDS CIRCLES TO POINTS
    var queryFilter = this.state.queryFilter;
    points
      .enter()
      .append('circle')
      .attr('class', 'plotPoint')
      .attr('cy', function(d) {
        return y(d.value)
      })
      .attr('cx', function(d) {
        var time;
        if (queryFilter === "") {
          time = d.timestamp.date + " " + d.timestamp.time
          time = parseDayTime(time);
        } else {
          time = d.timestamp.date + " " + d.timestamp.month + " " + d.timestamp.year;
          time = parseOtherTime(time);
        }
        return x(time)
      })
      .attr('opacity', 0)
      .on('mouseover', function(d, i) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10)

    // VALUE FORMATTER
    var formatValue = d3.format(".2f")

    // HOVER TEXT
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

    // X-AXIS
    var tickFormat;
    var ticks;
    if (this.state.filterBy === 'day') {
      tickFormat = d3.timeFormat('%I %p')
      ticks = d3.timeHour.every(3)
    } else if (this.state.filterBy === 'week') {
      tickFormat = d3.timeFormat('%A')
      ticks = d3.timeDay.every(1)
    } else if (this.state.filterBy === 'month') {
      tickFormat = d3.timeFormat('%B %m-%d')
      ticks = d3.timeWeek.every(1)
    } else if (this.state.filterBy === 'year') {
      tickFormat = d3.timeFormat('%m')
      ticks = d3.timeMonth.every(1)
    }
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          .tickFormat(tickFormat)
          .ticks(ticks)
      )
      .transition()
      .duration(1500)
      .attr('opacity', 1)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dx', '0')
      .attr('dy', '5.0')



    // Y-AXIS
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

    // X-AXIS LABEL (CURRENTLY DISABLED)
    /*
    svg.append("text")
      .attr("x", width / 2.0)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Date")
    */

    // Y-AXIS LABEL
    svg
      .append('text')
      .attr('x', 0 - height / 2.0)
      .attr('y', 0 - margin.bottom * 2)
      .style('text-anchor', 'middle')
      .text('Energy (kw)')
      .attr('transform', 'rotate(-90)')
      .transition()
      .duration(1500)
      .attr('opacity', 1)

    // TITLE (CURRENTLY DISABLED)
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
    this.setState({ filterBy: event.target.value, updatingPoints: true})
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

export default ScatterPlot
