import React, { useEffect } from "react";
import {select} from "d3";
import {chartDimensions} from "../../services/graphUtilityFunctions"

interface BarProps {
  labelScaled: number;
    valueScaled: number;
    barWidth: number;
    valueRaw:number; 
  }


const Bar: React.FC<BarProps> = ({
    labelScaled,
    valueScaled,
    barWidth,
    valueRaw, 

  }) => {
    if (isNaN(valueScaled) || valueRaw===0) {
      valueScaled = 0;
    }
  
    const rectRef: any = React.createRef();
  
    useEffect(() => {
      animateBars(rectRef, valueScaled);
    });
  
    return (
      <g>
        <rect ref={rectRef} id={`${valueScaled}`}
        x={labelScaled}
        
        width={barWidth} fill="black" />
      </g>
    );
  };


  
const animateBars = (rectRef: any, valueScaled: number) => {
    const rect = select(rectRef.current);

    const y_net = chartDimensions.chartHeightInner - valueScaled- chartDimensions.margin.bottom
  
    rect
  
      .transition()
      .duration(1000)
      .attr("height", valueScaled)
      .attr("y", y_net);
      // .attr("y", 0);
  };

export default Bar