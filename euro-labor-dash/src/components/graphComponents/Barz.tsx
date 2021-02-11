import React, { useEffect, useState } from "react";
import {select} from "d3";

interface BarProps {
    x: number;
    y_net: number;
    barWidth: number;
    barHeight_net: number;
    yValue: number;
    yearLabel: any;
    yearLableYPoz: number;
  }


const Bar: React.FC<BarProps> = ({
    x,
    y_net,
    barWidth,
    barHeight_net,
    yValue,
    yearLabel,
    yearLableYPoz,
  }) => {
    if (isNaN(y_net)) {
      y_net = 0;
    }
  
    const axisText: number = 125;
    const rectRef: any = React.createRef();
  
    useEffect(() => {
      animateBars(rectRef, y_net, barHeight_net);
    });
  
    return (
      <g>
        <rect ref={rectRef} x={x} width={barWidth} fill="black" />
      </g>
    );
  };


  
const animateBars = (rectRef: any, y_net: number, barHeight_net: number) => {
    const rect = select(rectRef.current);
  
    rect
  
      .transition()
      .duration(1000)
      .attr("height", barHeight_net)
      .attr("y", y_net);
  };

export default Bar