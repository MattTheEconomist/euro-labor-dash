import React, { useEffect, useState } from "react";
import {
    scaleLinear,
    max,
    min,
    line,
    mean,
    select,
  } from "d3";

  interface DotProps {
    x: number;
    y_unemp: number;
    dotHeight: number;
    yValue: number;
    yearLabel: any;
    yearLableYPoz: number;
    renderYear: boolean;
  }


const Dotz: React.FC<DotProps> = ({
    x,
    y_unemp,
    dotHeight,
    yValue,
    yearLabel,
    yearLableYPoz,
    renderYear,
  }) => {
    const dotRef: any = React.createRef();
  
    useEffect(() => {
      animtaeDots(dotRef, dotHeight, x);
    });
  
    // console.log("hi")
    return (
      <g>
        <circle fill="black" ref={dotRef} r={3}></circle>
        {renderYear ? (
          <text x={x} y={yearLableYPoz}>
            {yearLabel}
          </text>
        ) : (
          <></>
        )}
      </g>
    );
  };


  const animtaeDots = (dotRef: any, dotHeight: number, x: number) => {
    const dot = select(dotRef.current);
  
    dot.transition().duration(1000).attr("cy", dotHeight).attr("cx", x);
  };


export default Dotz