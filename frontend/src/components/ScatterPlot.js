import React, { Component } from 'react'
import * as d3 from 'd3'
import csv from '../media/solar_power.csv'
import crossfilter from 'crossfilter'
import Papa from 'papaparse'
import '../styles/App.scss'

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindate: '',
      maxdate: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Event: " + event);
  }

  componentDidMount() {
    var data = [];
    var dataFilteredByYear = [];

    Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
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

        // Groups the data by the filter then sums up the yields for each year
        var yearlyYield = yearlyDimension.group().reduceSum(function(d) { return d.VALUE }).top(Infinity);

        // Pushes the data found into a JSON object
        for (let i = 0; i < yearlyYield.length; i++) {
          dataFilteredByYear.push({year: new Date(yearlyYield[i].key, 0, 1), total_yield: yearlyYield[i].value });
        }
      /* -------- DATA FILTERING END -------- */

        // Setting up Sizing Variables
        var margin = {top: 80, right: 30, bottom: 100, left: 150 };
        var width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        // We have to manually set the dates right now
        var mindate = new Date(2014,0,0);
        var maxdate = new Date(2019,0,0);

        // This is the Date Scale
        var x = d3.scaleTime()
          .domain([mindate, maxdate])
          // Pixel Range in X Direction
          .range([0, width]);

        // This is the Values Scale
        var y = d3.scaleLinear()
          .domain([d3.min(dataFilteredByYear, function(d){ return d.total_yield; }),
              d3.max(dataFilteredByYear, function(d){ return d.total_yield; })])
          // Pixel Range in Y Direction
          .range([height, 0]);

        // Appends our SVG Canvas and sets it to a variable for easy usage
        var svg = d3.select("div.scatterPlotContainer")
          .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 600 400")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Binds all of the data we parsed
        var points = svg
          .selectAll("circles")
            .attr("class", "plotPoint")
            .data(dataFilteredByYear);

        //Appends circles for each data point binded
        points.enter().append("circle")
          .attr("class", "plotPoint")
          .attr("cy", height + 10)
          .attr("cx", function(d){ return x(d.year) })
          .attr("opacity", 0)
          .transition()
            .duration(1500)
            .attr("opacity", 1)
            .attr("r", 10)
            .attr("cy", function(d){ return y(d.total_yield) });

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
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-12.8")
            .attr("dy", "2.4")
            .attr("transform", "rotate(-65)");

        // Setting up the y-axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, 0)")
          .call(d3.axisLeft(y)
            .ticks()
          )
          .selectAll("text")
            .style("text-anchor", "end");

        // Label for the X-axis
        svg.append("text")
          .attr("x", width / 2.0)
          .attr("y", height + margin.bottom)
          .style("text-anchor", "middle")
          .text("Date")

        // Label for the Y-Axis
        svg.append("text")
          .attr("x", 0 - height / 2.0)
          .attr("y", 0 - margin.bottom)
          .style("text-anchor", "middle")
          .text("British Thermal Unit (BTU)")
          .attr("transform", "rotate(-90)");

        // Title for the graph
        svg.append("text")
        .attr("x", 0 - margin.left + (width + margin.left + margin.right) / 2.0)
        .attr("y", 0 - margin.top / 2.0)
        .attr("font-size", 36)
        .attr("text-decoration", "underline")
        .style("text-anchor", "middle")
        .text("Time vs. Total Yield");
      }
    });
  }

  render() {
    return (
      <div className="scatterPlotContainer"></div>
    )
  }
}

export default ScatterPlot
