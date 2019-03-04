import React, {
  Component
} from 'react';
import '../styles/App.scss'

import csv from '../media/tiny.csv';
import * as d3 from 'd3';
import Papa from 'papaparse';

class TestGraph extends Component {
  componentDidMount() {

  }

  render() {
    var data = [];
    var unit = "";

    Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        results.data.forEach(function(element) {
          var dateSplit = element.name.split(" ");
          element.name = dateSplit[0]; // Returns the Day, Month, Year [Y Value]

          var valueSplit = element.value.split(" ");
          element.value = valueSplit[0]; // Returns just the value [X Value]
          unit = valueSplit[1];

          data.push(element.value);

        });
        var dataMax = 0;
        var dataMin = data[0];
        data.forEach(function(d) {
          console.log(d);
          if (d > dataMax) {
            dataMax = d;
          }
          if (d < dataMin) {
            dataMin = d;
          }
        });

        var maxWidth = 1000;
        var minWidth = 200;

        d3.select("div.graph").append('div')
          .attr("class", "graphContainer")
          .selectAll('div')
          .data(data)
          .enter()
          .append("div")
          .attr("class", "graphBars")
          .style("width", function(d) {
            return (((d - dataMin) / (dataMax - dataMin)) * maxWidth) + minWidth + "px";
          })
          .text(function(d) {
            return d + " " + unit;
          });
      }
    });

    return (
      <div>
      </div>
    )
  }
}

export default TestGraph
