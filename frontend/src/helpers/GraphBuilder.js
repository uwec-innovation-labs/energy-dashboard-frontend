import * as d3 from 'd3'

export function buildGraph(results, queryFilter, amountOfPoints, filterBy) {
  // SIZING VARIABLES
  var margin = { top: 20, right: 40, bottom: 50, left: 150 }
  var width = 1000 - margin.left - margin.right
  var height = 275 - margin.top - margin.bottom

  console.log(results)
  console.log(amountOfPoints)

  // MIN AND MAX DATES
  var mindate = new Date(+results[amountOfPoints - 1].timestamp)
  var maxdate = new Date(+results[0].timestamp)

  // DATA GAP
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
  var valueline = d3
    .line()
    .x(function(d) {
      return x(new Date(+d.timestamp))
    })
    .y(function(d) {
      return y(d.value)
    })
    .curve(d3.curveLinear)

  // SVG CANVAS
  d3.select('svg').remove()
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
    .delay(500)
    .duration(500)
    .attr('opacity', 1)

  // BINDS DATA TO POINTS
  var points = svg
    .selectAll('circles')
    .attr('class', 'plotPoint')
    .data(results)

  // Append Lines

  // APPENDS CIRCLES TO POINTS
  points
    .enter()
    .append('circle')
    .attr('class', 'plotPoint')
    .attr('cy', function(d) {
      return y(d.value)
    })
    .attr('cx', function(d) {
      return x(new Date(+d.timestamp))
    })
    .attr('opacity', 0)
    .on('mouseover', function(d, i) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', 10)

      d3.select(this)
        .append('line')
        .attr('x1', 20)
        .attr('x2', 20)
        .attr('y1', 0)
        .attr('y2', 400)
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
        .attr('fill', 'black')

      // VALUE FORMATTER
      var formatValue = d3.format('.2f')

      // HOVER TEXT
      svg
        .append('text')
        .attr('id', 't' + d.x + '-' + d.y + '-' + i)
        .attr('x', width)
        .attr('y', 0)
        .attr('font-size', 20)
        .style('text-anchor', 'end')
        .text(
          '[DATE] ' +
            new Date(+d.timestamp) +
            ' [VALUE]: ' +
            formatValue(d.value)
        )
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
  var tickFormat
  var ticks
  if (filterBy === 'day') {
    tickFormat = d3.timeFormat('%I:%M %p')
    ticks = d3.timeHour.every(3)
  } else if (filterBy === 'week') {
    tickFormat = d3.timeFormat('%a, %B %e')
    ticks = d3.timeDay.every(1)
  } else if (filterBy === 'month') {
    tickFormat = d3.timeFormat('%b %e')
    ticks = d3.timeDay.every(3)
  } else if (filterBy === 'year') {
    tickFormat = d3.timeFormat('%b %Y')
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
    .duration(500)
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
    .duration(500)
    .attr('opacity', 1)
    .selectAll('text')
    .style('text-anchor', 'end')

  // X-AXIS LABEL (CURRENTLY DISABLED)*/
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
    .text('Electricity (kw)')
    .attr('transform', 'rotate(-90)')
    .transition()
    .duration(500)
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

  svg
    .append('line')
    .attr('class', 'y-hover-line hover-line')
    .attr('x1', width)
    .attr('x2', width)
}
