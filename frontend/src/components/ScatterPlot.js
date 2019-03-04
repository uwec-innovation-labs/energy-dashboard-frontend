import React, { Component } from 'react'
import * as d3 from 'd3'
import csv from '../media/big.csv'
import Papa from 'papaparse'
import '../styles/App.scss'

class ScatterPlot extends Component {
  componentDidMount() {
    var data = [];
    //var unitFound = "";
    Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        results.data.forEach(function(element) {
          // Splits the date up
          var date = element.name.split(" ");
          // Gets rid of the CDT from the back of the date as it breaks our parser
          date = date[0] + " " + date[1] + " " + date[2];
          // Setups up the expected date format (This is assuming it follows this specific format)
          var timeParser = d3.timeParse("%d-%b-%y %I:%M:%S %p");

          // This seperates the value from the units (This assumes there is a unit given)
          var valueSplit = element.value.split(" ");
          // Sets our value
          element.value = valueSplit[0]; // Returns just the value [X Value]
          // Sets our unit (Currently not doing anything with this Unit)
          //unitFound = valueSplit[1];

          // This pushes our data in the format of a JSON object
          data.push({x: timeParser(date), y: element.value});
        });

        // Setting up Sizing Variables
        var margin = {top: 30, right: 30, bottom: 100, left: 180 };
        var width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        //Temporary Min and Max Dates (Can connect to some sort of date selection)
        // WE CURRENTLY NEED TO MANUALLY SET THIS IF WE CHANGE DATA
        // We will probably want buttons for this so users can choose a range of data
        var mindate = new Date(2016,7,31), maxdate = new Date(2017,3,28);
        // This is the Date Scale
        var x = d3.scaleTime()
          .domain([mindate, maxdate])
          // Pixel Range in X Direction
          .range([0, width]);

        // This is the Values Scale
        var y = d3.scaleLinear()
          .domain([d3.min(data, function(d){ return d.y; }),
              d3.max(data, function(d){ return d.y; })])
          // Pixel Range in Y Direction
          .range([height, 0]);


        // Appends our SVG Canvas and sets it to a variable for easy usage
        var svg = d3.select("div.scatterPlotContainer")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Binds all of the data we parsed
        var points = svg
          .selectAll("circles")
            .attr("class", "plotPoint")
            .data(data);

        //Appends circles for each data point binded
        points.enter().append("circle")
          .attr("class", "plotPoint")
          .attr("cx", function(d){ return x(d.x) })
          .attr("cy", function(d){ return y(d.y) })
          .attr("r", 1)

        // Setting the x-axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
            // This is the Format of the Text
            .tickFormat(d3.timeFormat("%Y-%m-%d"))
            // How many ticks to (We can play with this range)
            .ticks(d3.timeMonth.every(1))
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
        .attr("x", 0 - (margin.bottom / 2.0))
        .attr("y", 0 - margin.bottom)
        .style("text-anchor", "end")
        .text("British Thermal Unit (BTU)")
        .attr("transform", "rotate(-90)");
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