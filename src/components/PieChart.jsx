import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';

const PieChart = ({ data, width = 500, height }) => {
  const referenceElement = useRef();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [DataIndex, SetDataIndex] = useState(0);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    if (!data) return;

    if (!data[DataIndex]) return;

    const pieData = data[DataIndex][`dataset${DataIndex + 1}`];
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(radius / 2).outerRadius(radius - 10);

    d3.select(referenceElement.current).selectAll('*').remove();

    const svg = d3.select(referenceElement.current)
      // .attr('width' , width)
      // .attr('height' , height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', `xMidYMid meet`)
      .append('g')
      .attr('transform', `translate(${width / 2} , ${height / 2})`);


    const arcs = svg.selectAll()
      .data(pie(pieData))
      .enter()
      .append('g')
      .on('click', (_, d) => setSelectedIndex(d.index));

    arcs.append('path')
      .attr('fill', (d, i) => color(i))
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px')
      .transition()
      .duration(1000)
      // .attrTween('d' , function (d) {
      //   const i = d3.interpolate({ startAngle : 0 , endAngle : 0} , d) ;
      //   return function (t) {
      //     return arc(i(t));
      //   }
      // });
      .attr('d', arc);

    arcs.select('path')
      .attr('transform', d => d.index === selectedIndex ? 'scale(1.05)' : 'scale(1)')

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => d.data.name);


    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '6px 10px')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    arcs.on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`value : ${d.data.value}`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 28}px`);
    })
      .on("mousemove", function (event) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
      })

    return () => {
      tooltip.remove();
    };


  }, [data, height, width, selectedIndex, DataIndex]);

  return (
    <>
      {/* <svg ref={referenceElement}></svg> */}
      <svg ref={referenceElement} className='w-[450px] h-auto'></svg>
      <div className="legend">
        {data.map((d, i) => {
          if (i === DataIndex && d[`dataset${DataIndex + 1}`]) {
            return d[`dataset${DataIndex + 1}`].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ width: 12, height: 12, backgroundColor: color(i), marginRight: 6 }} />
                <span>{d.name}</span>
              </div>
            ))
          }
        }
        )}
      </div >
      <div className="btn-wrap ml-10 flex gap-5 items-center">
        <button onClick={() => SetDataIndex(0)} className='p-3 h-fit bg-green-200 rounded-lg border hover:bg-green-300'>DataSet One</button>
        <button onClick={() => SetDataIndex(1)} className='p-3 h-fit bg-green-200 rounded-lg border hover:bg-green-300'>DataSet Two</button>
      </div>
    </>
  )
}

export default PieChart;
