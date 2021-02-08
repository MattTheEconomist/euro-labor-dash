import React, { useEffect, useState } from "react";
import {
    scaleLinear,
    max,
    min,
    line,
    mean,
    select,
  } from "d3";


  interface LineProps {
    xScale: any; 
    yScale: any;
    values_unemp: any;
  }

  
  const Linez: any = (values_unempScaled: any, labelsScaled: any, xScale: any) => {
    const [lineValues, setLineValues] = useState([1, 2, 3]);
  
    const lineRef: any = React.createRef();
  
    values_unempScaled = values_unempScaled.values_unempScaled;

  
    labelsScaled = labelsScaled.lablesScaled;
  
    useEffect(() => {
      if (values_unempScaled.length > 1) {
        setLineValues(values_unempScaled);
  
        const currentLine = select(lineRef.current);
        animateLine(currentLine, xScale, values_unempScaled);
      }
    },[values_unempScaled]);
  
    return (
      <g>
        <path ref={lineRef} />
      </g>
    );
  };
  
  const animateLine = (
    currentLine: any,
    xScale: any,
    values_unempScaled: Array<number>
  ) => {
  
  
    if (Array.isArray(values_unempScaled)) {
      const drawLine = line()
        .x((d: any, i: any) => i * 10 + 50)
        //Passing function does not work :(
        // .x((d: any, i: any) => xScale(i))
        .y((d: any) => d);
  
      const linePath = drawLine(values_unempScaled as Array<number> | any);
  
      currentLine
        .transition()
        .duration(1000)
        .attr("d", linePath)
        .attr("fill", "none")
        .attr("stroke", "black");
    }
  };

  export default Linez
