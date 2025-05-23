import { useEffect, useRef } from "react";
import * as d3 from 'd3';

const TestBar = ({ data, width = 500, height = 500 }) => {

  const svgRef = useRef();

  useEffect(() => {

    if (!data || data.length === 0) return;

    let filteredData = [];

    data.forEach(function (e) {
      filteredData.push({ name: e.name.month, value: e.answer })
    })

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { left: 25, top: 20, right: 30, bottom: 30 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.value)])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left} , ${margin.top})`);

    g.append('g')
    .attr('transform', `translate(0 , ${innerHeight})`)
    .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    // g.selectAll('rect')
    //   .data(filteredData)
    //   .enter()
    //   .append('rect')
    //   .attr('x', d => x(d.name))
    //   .attr('width', x.bandwidth())
    //   .attr('y' , innerHeight)
    //   .attr('fill' , 'green')
    //   .attr('height' , 0)
    //   .transition()
    //   .duration(1000)
    //   .attr('y', d => y(d.value))
    //   .attr('height', d => innerHeight - y(d.value));

  }, [data, width, height])

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  )
}

export default TestBar;
