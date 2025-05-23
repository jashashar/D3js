import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';

const LineChart = ({data , height = 400 , width = 900}) => {
  const svgRef = useRef();

  useEffect(() => {
    if(!data) return;

    let svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top : 20 , right : 30 , bottom : 40 , left : 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%d');
    const formattedData = data.map(d => ({
      date: parseDate(d.date),
      value: d.value
    }));

    const x = d3.scaleTime()
    .domain(d3.extent(formattedData , d => d.date))
    .range([0 , innerWidth]);

    const y = d3.scaleLinear()
    .domain([0 , d3.max(formattedData , d => d.value)])
    .range([innerHeight , 0]);

    const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

    const g = svg
    .attr('viewBox' , `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform' , `translate(${margin.left} , ${margin.top})`);

    g.append('g')
    .attr('transform' , `translate(0 , ${innerHeight})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%b')));

    g.append('g')
    .call(d3.axisLeft(y));

    g.append('path')
    .datum(formattedData)
    .attr('fill' , 'none')
    .attr('stroke' , 'steelblue')
    .attr('stroke-width' , 2)
    .attr('d' , line);

    g.selectAll('circle')
    .data(formattedData)
    .enter()
    .append('circle')
    .attr('cx' , d => x(d.date))
    .attr('cy' , d => y(d.value))
    .attr('r' , 4)
    .attr('fill' , 'steelblue');

  } , [data , width , height]);

  return (
    <>
      <svg ref={svgRef} className='max-h-[500px]' />
    </>
  )
}

export default LineChart
