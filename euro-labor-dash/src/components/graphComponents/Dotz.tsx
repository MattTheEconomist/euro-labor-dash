import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, line, mean, select } from "d3";

interface DotzProps {
  values_unemp: number[];
  values_unempScaled: number[];
  yearLabelYPoz: number;
  labels: Array<any>;
  centerToCenter: number;
  marginLeft: number;
  mouseX: number|null; 
  mouseY:number|null; 
}

const Dotz: React.FC<DotzProps> = ({
  values_unemp,
  values_unempScaled,
  yearLabelYPoz,
  labels,
  centerToCenter,
  marginLeft,
  mouseX, 
  mouseY
}) => {
  const xScale = function (index: number) {
    return index * centerToCenter + marginLeft;
  };

  const dotRef: any = React.createRef();

  const dots = values_unempScaled.map((row: any, ind: number) => (
    <Dot
      key={Math.random()}
      x={xScale(ind)}
      //use for tooltip later
      y_unemp={values_unemp[ind]}
      dotHeight={row}
      yValue={0}
      yearLabel={labels[ind]}
      yearLableYPoz={yearLabelYPoz}
      renderYear={ind % 4 === 0 ? true : false}
      mouseX = {mouseX}
      mouseY={mouseY}
    />
  ));

  return <g>{dots}</g>;
};

interface DotProps {
  x: number;
  y_unemp: number;
  dotHeight: number;
  yValue: number;
  yearLabel: any;
  yearLableYPoz: number;
  renderYear: boolean;
  mouseX: number|null; 
  mouseY:number|null; 

}

const Dot: React.FC<DotProps> = ({
  x,
  y_unemp,
  dotHeight,
  yValue,
  yearLabel,
  yearLableYPoz,
  renderYear,
  mouseX, 
  mouseY
}) => {
  const dotRef: any = React.createRef();

  // useEffect(() => {
  //   animtaeDots(dotRef, dotHeight, x);
  // },);

  let opacity =0; 
  let mouseDistance = 600

  if (mouseX!==null && mouseY!==null){

    mouseDistance= Math.sqrt(Math.pow((mouseX-x),2) + Math.pow((mouseY-dotHeight),2))
  }

  if(mouseDistance>200){
    opacity=0
  }else{
    opacity=100/Math.pow(mouseDistance,1.4)
  }



  return (
    <g>
      <circle fill="black" ref={dotRef} r={3}  cx={x} cy={dotHeight} fillOpacity={`${opacity}`} ></circle>

    </g>
  );
};

const animtaeDots = (dotRef: any, dotHeight: number, x: number) => {
  const dot = select(dotRef.current);

  dot.transition().duration(1000).attr("cy", dotHeight).attr("cx", x);
};

export default Dotz;
