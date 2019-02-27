import React, { Component } from 'react'
import * as d3 from 'd3'
import csv from '../media/big.csv'
import Papa from 'papaparse'
import '../styles/App.css'

class ScatterPlot extends Component {
  componentDidMount() {
    var data = [];
    var unitFound = "";
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
          unitFound = valueSplit[1];

          // This pushes our data in the format of a JSON object
          data.push({x: timeParser(date), y: element.value});
        });

        //Temporary Min and Max Dates (Can connect to some sort of date selection)
        var mindate = new Date(2016,10,1), maxdate = new Date(2017,3,1);
        // This is the Date Scale
        var x = d3.scaleTime()
          .domain([mindate, maxdate])
          // Pixel Range in X Direction
          .range([0, 600]);

        // This is the Values Scale
        var y = d3.scaleLinear()
          .domain([d3.min(data, function(d){ return d.y; }),
              d3.max(data, function(d){ return d.y; })])
          // Pixel Range in Y Direction
          .range([400, 0]);

        // Appends our SVG Canvas and sets it to a variable for easy usage
        var svg = d3.select("div.scatterPlotContainer")
          .append("svg")
            .attr("width", 600)
            .attr("height", 400)

        // Binds all of the data we parsed
        var points = svg
          .selectAll("circles")
            .attr("class", "plotPoint")
            .data(data);

        //Appends circles for each data point binded
        points.enter().append("circle")
          .attr("cx", function(d){ return x(d.x) })
          .attr("cy", function(d){ return y(d.y) })
          .attr("r", 1)
          .attr("fill", "var(--graph-primary-color)");
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