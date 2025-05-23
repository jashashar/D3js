import { useEffect, useRef } from "react"
import * as d3 from 'd3';

const TestPieChart = ({ data , width , height }) => {
  
  const svgRef = useRef();

  useEffect(() => {
    if(!data) return;

    const radius = Math.min(width , height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const  pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);
    
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current) 
    .attr('viewBox' , `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform' , `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll()
    .data(pie(data))
    .enter()
    .append('g');

    arcs.append('path')
    .attr('fill' , (d , i) => color(i))
    .attr('stroke' , 'black')
    .attr('stroke-width' , 2)
    .transition()
    .duration(1000)
    .attrTween('d' , (d) => {
      const i = d3.interpolate({startAngle : 0 , endAngle : 0} , d);
      return function (t) {
        return arc(i(t));
      }
    });
    // .attr('d' , arc);

    arcs.append('text')
    .attr('transform' , d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor' , 'middle')
    .attr('font-size' , '12px')
    .text(d => d.data.name)

    const tooltip = d3.select('body')
    .append('div')
    .style('position' , 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
    .style('padding' , '6px 10px')
    .style('color' , 'white')
    .style('border-radius' , '4px')
    .style('pointer-events' , 'none')
    .style('opacity' , 0)
    
    arcs.on('mouseover' , function (event , d) {
      tooltip.transition().duration(200).style('opacity' , 1)
      tooltip.html(`value : ${d.data.value}`)
      .style('left' , `${event.pageX + 10}px`)
      .style('top' , `${event.pageY - 28}px`)
    })
    .on('mousemove' , function (event) {
      tooltip
        .style('left' , `${event.pageX + 10}px`)
        .style('top' , `${event.pageY - 28}px`)
    })
    .on('mouseout' , function () {
      tooltip.transition().duration(200).style('opacity' , 0);
    })
  } , [data , width , height]);

  return (
    <>
      <svg ref={svgRef}  height={height} width={width}/>
    </>
  )
}

export default TestPieChart
