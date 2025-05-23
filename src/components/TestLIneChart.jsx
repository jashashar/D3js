import { useEffect, useRef } from "react";
import * as d3 from 'd3';

const TestLIneChart = ({data , height , width = 700}) => {
  
  const svgRef = useRef();

  useEffect(() => {

    if(!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin =  {left : 20 , top : 30 , right : 40 , bottom : 50};
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0 , innerWidth])
    .padding(1);

    const y = d3.scaleLinear()
    .domain([0 , d3.max(data , d => d.value)])
    .range([innerHeight , 0]);

    const line = d3.line()
    .x(d => x(d.name))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX)

    const g = svg
    .attr('viewBox' , `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform' , `translate(${margin.left} ${margin.top})`);

    g.append('g')
    .attr('transform' , `translate(0 ${innerHeight})`)
    .call(d3.axisBottom(x));

    g.append('g')
    .call(d3.axisLeft(y));

    g.append('path')
    .datum(data)
    .attr('fill' , 'none')
    .attr('stroke' , 'blue')
    .attr('stroke-width' , 2)
    .attr('d' , line);

    g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx' , d => x(d.name))
    .attr('cy' , d => y(d.value))
    .attr('r' , 4)
    .attr('fill' , 'blue')

  } , [data , height , width]);

  return (
    <>
      <svg ref={svgRef} height={height} width={width} />
    </>
  )
}

export default TestLIneChart
