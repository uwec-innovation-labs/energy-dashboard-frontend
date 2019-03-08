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
    //var unitFound = "";
    Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        results.data.forEach(function(element) {
          // Splits the date up
          if (element.TIMESTAMP == null) {
            console.log("BAD");
          }
          var dates = element.TIMESTAMP.split(" ");
          // Setups up the expected date format (This is assuming it follows this specific format)
          var timeParser = d3.timeParse("%y-%m-%d %H:%M:%S");
  
          var date = dates[0] + dates[1];

          // This seperates the value from the units (This assumes there is a unit given)
      //    var valueSplit = element.VALUE;
          // Sets our value
        //  element.VALUE = valueSplit[0]; // Returns just the value [X Value]
          // Sets our unit (Currently not doing anything with this Unit)
          //unitFound = valueSplit[1];
          // This pushes our data in the format of a JSON object
          data.push({TIMESTAMP: timeParser(date), VALUE: element.VALUE});
        });
        console.log(data);
      /* ---- DATA FILTERING ---- */
        var filteredData = crossfilter(data);
        /*
        // Total Yield by Weekday
        var dayOfWeekDimension = filteredData.dimension(d => {
          console.log()
          return d.TIMESTAMP.toString().split(" ")[0];
        });
        var t = dayOfWeekDimension.group().reduceSum(function(d) { return d.y; });
        var aggregatedWeek = t.top(7);
        console.log("Value: " + aggregatedWeek[0].value + " Key: " + aggregatedWeek[0].key);
        console.log("Value: " + aggregatedWeek[1].value + " Key: " + aggregatedWeek[1].key);
        console.log("Value: " + aggregatedWeek[2].value + " Key: " + aggregatedWeek[2].key);
        console.log("Value: " + aggregatedWeek[3].value + " Key: " + aggregatedWeek[3].key);
        console.log("Value: " + aggregatedWeek[4].value + " Key: " + aggregatedWeek[4].key);
        console.log("Value: " + aggregatedWeek[5].value + " Key: " + aggregatedWeek[5].key);
        console.log("Value: " + aggregatedWeek[6].value + " Key: " + aggregatedWeek[6].key);

        // Total Yield of Data
        var totalYield = filteredData.groupAll().reduceSum(function(d) { return d.VALUE; }).value();
        console.log("Total Yield: " + totalYield);
        */
        // Yearly Yield Filter
        var e = filteredData.dimension(function(d) {
          //console.log(d.TIMESTAMP + " " + d.VALUE);
          return d.TIMESTAMP.toString().split("-")[0];
        })
        var f = e.group().reduceSum(function(d) { return d.VALUE })
        var yearlyYield = f.top(10);
        var i = 0;


        while(yearlyYield[i] != null) {
          var newDate = new Date(yearlyYield[i].key, 0, 0);
          //console.log(newDate);
          dataFilteredByYear.push({year: newDate, total_yield: yearlyYield[i].value });
          i++;
        }
        //console.log(dataFilteredByYear);
      /* ---- DATA FILTERING END ---- */

        // Setting up Sizing Variables
        var margin = {top: 80, right: 30, bottom: 100, left: 150 };
        var width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        //Temporary Min and Max Dates (Can connect to some sort of date selection)
        // WE CURRENTLY NEED TO MANUALLY SET THIS IF WE CHANGE DATA
        // We will probably want buttons for this so users can choose a range of data
        var mindate = new Date(2015,0,0);
        var maxdate = new Date(2018,0,0);
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
          .attr("cx", function(d){ return x(d.year) })
          .attr("cy", function(d){ return y(d.total_yield) })
          .transition(5000)
            .attr("r", 10);

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
