import React, { Component } from 'react'
import * as d3 from 'd3'
import csv from '../media/solar_power.csv'
import crossfilter from 'crossfilter'
import Papa from 'papaparse'
import '../styles/App.scss'
import { Spinner, Button, ButtonGroup } from 'reactstrap';

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindate: '',
      maxdate: '',
      loading: true,
      mounted: false,
      filterBy: 'year'
    }

    // Gets rid of errors
    this.handleChange = this.handleChange.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleYearClick = this.handleYearClick.bind(this);
  }

  handleChange(event) {
    console.log("Event: " + event);
  }

  componentDidMount() {
    this.setState({mounted: true});
      Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: this.updateGraph
    });
  }

  updateGraph(results) {
    var data = [];
    var dataFilteredByYear = [];
      results.data.forEach(function(element) {
        var dates = element.TIMESTAMP.split(" ");
        // Setups up the expected date format (This is assuming it follows this specific format)
        var timeParser = d3.timeParse("%Y-%m-%d %H:%M:%S");

        // Splits off unnessary data
        var date = dates[0] + " " + dates[1];

        data.push({TIMESTAMP: timeParser(date), VALUE: element.VALUE});
      });

    /* -------- DATA FILTERING -------- */
      // This is the data to be Filtered
      var filteredData = crossfilter(data);

      // Adding a dimension for the filter for "Year"
      var yearlyDimension = filteredData.dimension(function(d) {
        return d.TIMESTAMP.toString().split(" ")[3];
      });

      //var orderByYearDimension = filteredData.dimension(function(d) { return d.TIMESTAMP.toString().split(" ")[3]; });

      // Groups the data by the filter then sums up the yields for each year
      var yearlyYield = yearlyDimension.group().reduceSum(function(d) { return d.VALUE }).top(Infinity);

      var temp, tempz;
      for(let i = 0; i < yearlyYield.length - 1; i++) {
        temp = i;
        for (let j = i + 1; j < yearlyYield.length; j++) {
          if (yearlyYield[j].key < yearlyYield[temp].key) {
            temp = j;
          }
        }
        tempz = yearlyYield[temp];
        yearlyYield[temp] = yearlyYield[i];
        yearlyYield[i] = tempz;
      }

      // Pushes the data found into a JSON object
      for (let i = 0; i < yearlyYield.length; i++) {
        dataFilteredByYear.push({year: new Date(yearlyYield[i].key, 0, 1), total_yield: yearlyYield[i].value });
      }
    /* -------- DATA FILTERING END -------- */


    // Setting up Sizing Variables
        var margin = {top: 80, right: 30, bottom: 50, left: 150 };
        var width = 1000 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

      // We have to manually set the dates right now
      var mindate = new Date(2014,0,0);
      var maxdate = new Date(2019,0,0);

      // This is a number used so the min and max aren't exactly data points
      // It gives the graph some breathing room. Its found in the y Scale
      let percentGap = .2;

      // This is the Date Scale
      var x = d3.scaleTime()
        .domain([mindate, maxdate])
        // Pixel Range in X Direction
        .range([0, width]);

      // This is the Values Scale
      var y = d3.scaleLinear()
        .domain([d3.min(dataFilteredByYear, function(d){ return d.total_yield - (d.total_yield * percentGap); }),
            d3.max(dataFilteredByYear, function(d){ return d.total_yield + (d.total_yield * percentGap); })])
        // Pixel Range in Y Direction
        .range([height, 0]);

      // define the line
      var valueline = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.total_yield); })
        .curve(d3.curveNatural);

        // Appends our SVG Canvas and sets it to a variable for easy usage
          var svg = d3.select("div.scatterPlotContainer")
          .append("svg")
          .attr("width", '100%')
          .attr("height", '100%')

          .attr("viewBox", "0 0 1000 400")
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Add the valueline path.
          svg.append("path")
              .data([dataFilteredByYear])
              .attr("class", "line")
              .attr("d", valueline)
              .attr("opacity", 0)
              .transition()
                .delay(1500)
                .duration(500)
                .attr("opacity", 1)

      // Binds all of the data we parsed
      var points = svg
        .selectAll("circles")
          .attr("class", "plotPoint")
          .data(dataFilteredByYear);

      //Appends circles for each data point binded
      points.enter().append("circle")
        .attr("class", "plotPoint")
        .attr("cy", function(d){ return y(d.total_yield) })
        .attr("cx", function(d){ return x(d.year) })
        .attr("opacity", 0)
        .on("mouseover", function(d,i) {
          d3.select(this)
            .transition()
              .duration(200)
              .attr("r", 10);

          svg.append("text")
            .attr("id", "t" + d.x + "-" + d.y + "-" + i)
            .attr("x", width)
            .attr("y", 0)
            .attr("font-size", 20)
            .style("text-anchor", "end")
            .text("[ " + d.year + " , " + d.total_yield + " ]");
        })
        .on("mouseout", function(d,i) {
          d3.select(this)
            .transition()
              .duration(200)
              .attr("r", 6)
              .delay(100);

          d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();
        })
        .transition()
          .duration(1500)
          .attr("opacity", 1)
          .attr("r", 6);

      // Setting the x-axis
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
          // This is the Format of the Text
          .tickFormat(d3.timeFormat("%Y")) //%Y-%m-%d
          // How many ticks to (We can play with this range)
          .ticks(d3.timeYear.every(1))
        )
        .transition()
          .duration(1500)
          .attr("opacity", 1)
        .selectAll("text")
          .style("text-anchor", "middle")
          .attr("dx", "0")
          .attr("dy", "5.0")


      // Setting up the y-axis
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(y)
          .ticks()
        )
        .transition()
          .duration(1500)
          .attr("opacity", 1)
        .selectAll("text")
          .style("text-anchor", "end");


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
      svg.append("text")
        .attr("x", 0 - height / 2.0)
        .attr("y", 0 - margin.bottom * 2)
        .style("text-anchor", "middle")
        .text("British Thermal Unit (BTU)")
        .attr("transform", "rotate(-90)")
        .transition()
          .duration(1500)
          .attr("opacity", 1);

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
      this.setState({loading: false});
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  handleYearClick() {
    this.setState({filterBy: 'year'});
  }

  handleMonthClick() {
    this.setState({filterBy: 'month'});
  }

  handleDayClick() {
    this.setState({filterBy: 'day'});
  }

  render() {
    let spinner;
    if (this.state.loading) {
      spinner = <div><Spinner className="spinner" color="success" /><h3>Loading Data...</h3></div>
    } else {
      spinner = null;
    }
    return (
      <div>
        <center>{spinner}</center>
        <div className="scatterPlotContainer"></div>
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