import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, line, mean, select } from "d3";

interface DotzProps {
  values_unemp: number[];
  values_unempScaled: number[];
  yearLabelYPoz: number;
  labels: Array<any>;
  centerToCenter: number;
  marginLeft: number;
}

const Dotz: React.FC<DotzProps> = ({
  values_unemp,
  values_unempScaled,
  yearLabelYPoz,
  labels,
  centerToCenter,
  marginLeft,
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
      yearLabel={labels[ind].getFullYear()}
      yearLableYPoz={yearLabelYPoz}
      renderYear={ind % 4 === 0 ? true : false}
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
}

const Dot: React.FC<DotProps> = ({
  x,
  y_unemp,
  dotHeight,
  yValue,
  yearLabel,
  yearLableYPoz,
  renderYear,
}) => {
  const dotRef: any = React.createRef();

  // useEffect(() => {
  //   animtaeDots(dotRef, dotHeight, x);
  // },);

  return (
    <g>

      {/* <filter id={`dot_${x}_filter`}> */}
      <filter id={`dot_filter`}>
        <feFlood  floodOpacity="0.3"  />
      </filter>

      {/* <circle fill="black" ref={dotRef} r={3}  cx={x} cy={dotHeight} style={{filter: url(`#dot_filter`)}} ></circle> */}
      {/* <circle fill="black" ref={dotRef} r={3}  cx={x} cy={dotHeight} style={{filter:`#dot_filter`}} ></circle> */}
      <circle fill="black" ref={dotRef} r={3}  cx={x} cy={dotHeight} fillOpacity="0.5" ></circle>
      {/* {renderYear ? (
        <text x={x} y={yearLableYPoz}>
          {yearLabel}
        </text>
      ) : (
        <></>
      )} */}
    </g>
  );
};

const animtaeDots = (dotRef: any, dotHeight: number, x: number) => {
  const dot = select(dotRef.current);

  dot.transition().duration(1000).attr("cy", dotHeight).attr("cx", x);
};

export default Dotz;
