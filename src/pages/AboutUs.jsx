import React from 'react'
import * as d3 from "d3";

const AboutUs = () => {

    let data = d3.ticks(-2, 2, 200).map(Math.sin), width = 640, height = 400, marginTop = 20,marginRight = 20,marginBottom = 20, marginLeft = 20
  
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y);

    return (
    <div>
      Find the chart

    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<path key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
    </div>
  )
}

export default AboutUs
