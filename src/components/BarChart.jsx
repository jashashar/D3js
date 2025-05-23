import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";

const BarChart = React.memo(({ data, height = 300 }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [width , setWidth] = useState(750);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(enteries => {
      if(!enteries || enteries.length == 0 ) return;
      const newWidth = enteries[0].contentRect.width;
      setWidth(newWidth);
    })


    if(wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => resizeObserver.disconnect();
  } , []);

  useEffect(() => {

    if(!data || data.length == 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', innerHeight)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'rgb(3 122 209)')
      .transition()
      .duration(1000)
      .delay((d , i) => i * 100)
      .attr('y' , d => y(d.value))
      .attr('height' , d => innerHeight - y(d.value));

    
  }, [data, height, width])


  return (
    <div ref={wrapperRef} style={{ width : '100%'}}>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
})

export default BarChart;
