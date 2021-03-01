import React, { useEffect } from "react";
import {select} from "d3";
import {chartDimensions} from "../../services/graphUtilityFunctions"

interface BarProps {
  labelScaled: number;
    valueScaled: number;
    barWidth: number;
    barHeight_net: number;
  }


const Bar: React.FC<BarProps> = ({
    labelScaled,
    valueScaled,
    barWidth,
    barHeight_net,

  }) => {
    if (isNaN(valueScaled)) {
      valueScaled = 0;
    }
  
    const rectRef: any = React.createRef();
  
    useEffect(() => {
      animateBars(rectRef, valueScaled, barHeight_net);
    });
  
    return (
      <g>
        <rect ref={rectRef} id={`${valueScaled}`}
        x={labelScaled}
        
        width={barWidth} fill="black" />
      </g>
    );
  };


  
const animateBars = (rectRef: any, y_net: number, barHeight_net: number) => {
    const rect = select(rectRef.current);

    y_net = chartDimensions.chartHeightInner - barHeight_net- chartDimensions.margin.bottom

  
    rect
  
      .transition()
      .duration(1000)
      .attr("height", barHeight_net)
      .attr("y", y_net);
      // .attr("y", 0);
  };

export default Bar