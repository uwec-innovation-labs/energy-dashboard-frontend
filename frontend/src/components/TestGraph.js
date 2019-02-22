import React, { Component } from 'react';
import '../styles/App.css';

import dataCSV from '../media/tiny.csv';
import * as d3 from 'd3';
import Papa from 'papaparse';

class TestGraph extends Component {
  componentDidMount() {

  }


  render() {
    Papa.parse(dataCSV, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        const width = 1000;
        const height = 1000;

        var svg = d3.select("Body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        results.data.forEach(function(element) {
          var dateSplit = element.name.split(" ");
          element.name = dateSplit[0]; // Returns the Day, Month, Year

          console.log(element.name);
        });

        // This is the beggining of adding points to a graph
        svg.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
      }
    });

    //var data = d3.csvParse(dataCSV);
    //console.log(data);
    //console.log(d3.csvParse(dataCSV));
    // d3.csv(data, function(data) {
    //   console.log(d3.csvParse(dataCSV));
      //data.forEach(function(element) {
        //const rawDate = element[0];
        //const rawData = element[1];
        //console.log(data);
      //});
    // });


    return (
      <div>
      </div>
    )
  }
}



export default TestGraph
