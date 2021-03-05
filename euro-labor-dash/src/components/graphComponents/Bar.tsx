import React, { useEffect } from "react";
import {select} from "d3";
import {chartDimensions} from "../../services/graphUtilityFunctions"

interface BarProps {
  labelScaled: number;
    valueScaled: number;
    barWidth: number;
    valueRaw:number; 
    currentHover: boolean


  }


const Bar: React.FC<BarProps> = ({
    labelScaled,
    valueScaled,
    barWidth,
    valueRaw, 
    currentHover

  }) => {
    if (isNaN(valueScaled) || valueRaw===0) {
      valueScaled = 0;
    }
  
    const rectRef: any = React.createRef();
  
    useEffect(() => {
      animateBars(rectRef, valueScaled, currentHover);
    });

  
    return (
      <g>
        <rect ref={rectRef} id={`${valueScaled}`}
        x={labelScaled}
        
        width={barWidth} fill={currentHover? "pink":"black"}/>
      </g>
    );
  };
  





  
const animateBars = (rectRef: any, valueScaled: number, currentHover: boolean) => {
    const rect = select(rectRef.current);

    let y_net :number=1; 

    if (valueScaled===0){
      valueScaled = 0
      y_net=0
    }else{

      valueScaled = chartDimensions.chartHeightInner - valueScaled 
      y_net = chartDimensions.chartHeightInner - valueScaled- chartDimensions.margin.bottom
    }
    // const y_net = chartDimensions.chartHeightInner - valueScaled- chartDimensions.margin.bottom

    let fillValue = 'black'
    if(currentHover){
      fillValue = 'pink'
    }else{
      fillValue = 'black'
    }

    rect
  
      .transition()
      // .duration(1000)
      .duration(500)
      .attr("height", valueScaled)
      .attr("y", y_net?y_net:0)
      // .attr("fill", fillValue)
      // .attr("y", 0);
  };

export default Bar