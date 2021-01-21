import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select, lab } from "d3";
import { create } from "domain";

interface DotProps {
  x: number;
  y_unemp: number;
  dotHeight: number;
  yValue: number;
  yearLabel: any;
  yearLableYPoz: number;
}

const Dot: React.FC<DotProps> = ({
  x,
  y_unemp,
  dotHeight,
  yValue,
  yearLabel,
  yearLableYPoz,
}) => {
  if (isNaN(y_unemp)) {
    y_unemp = 0;
  }

  // const axisText : number;
  const dotRef: any = React.createRef();

  return (
    <g>
      <circle fill="black" ref={dotRef} x={x} y={dotHeight} r={3}></circle>
    </g>
  );
};

interface UnemploymentProps {
  selectedCountry?: string;
  unemploymentData: any;
  isFetching: boolean;
}

const Unemployment: React.FC<UnemploymentProps> = ({
  unemploymentData: unemploymentData,
  selectedCountry,
  isFetching,
}) => {
  const lineAreaHeight = 400;
  const lineAreaWidth = 700;
  const margin = {
    top: 30,
    right: 70,
    bottom: 10,
    left: 50,
    centerToCenter: 10,
  };
  const lineChartHeight = lineAreaHeight - margin.bottom;

  let labels: Array<any> = [];
  let values_unemp: Array<Number> = [];
  let yScale: any;
  let xScale: any;
  let yAxisValues: Array<Number> = [];

  let dots: any ;

  function generateYaxisValues(ar: Number[]) {
    const point1 = min(ar);
    const point5 = max(ar);
    const point3 = mean([point1, point5]);
    const point2 = mean([point1, point3]);
    const point4 = mean([point5, point3]);
    let rez = [point5, point4, point3, point2, point1];

    return rez.map((el: any) => Math.round(el));
  }

  labels = unemploymentData.labels;
  if (labels !== undefined) {
    labels = labels.filter((el) => parseInt(el.split("-")) >= 2005);
    labels = labels.map((el) => {
      const year = el.split("-")[0];
      const qtr = el.split("-")[1];
      const month = parseInt(qtr[1]) * 3;
      return new Date(`${year}-${month}-01`);
    });
    // console.log(labels)
  }

  values_unemp = unemploymentData.values;

  if (values_unemp !== undefined) {
    const elementsToSlice = values_unemp.length - labels.length;
    values_unemp = values_unemp.slice(elementsToSlice);
  }

  if (values_unemp !== undefined) {
    yScale = scaleLinear()
      .domain([min(values_unemp) as number, max(values_unemp) as number])
      .range([margin.bottom, lineAreaHeight - margin.top]);

    xScale = scaleLinear()
      .domain([min(labels) as number, max(labels) as number])
      .range([margin.left, lineAreaWidth]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale = scaleLinear()
      .domain([0, 100])
      .range([margin.bottom, lineAreaHeight - margin.top]);
  }

  if(values_unemp !== undefined) {

    yAxisValues = generateYaxisValues(values_unemp)

  dots = values_unemp.map((row: any, ind: number) =>( 
  <Dot 
  x = {ind * margin.centerToCenter + margin.left}
  y_unemp ={ values_unemp === undefined || values_unemp.length === 0
    ? 0
    : lineAreaHeight - yScale(values_unemp[ind])-10}
//   dotHeight = { values_unemp === undefined || values_unemp.length === 0
//     ? 0
//     : yScale(values_unemp[ind])}

dotHeight = {yScale(values_unemp[ind])}



  yValue={0}
  yearLabel = {labels[ind]}
  yearLableYPoz= {lineAreaHeight +margin.bottom}
  />));

  }

  return (
      <>
  <div>{JSON.stringify(unemploymentData)}</div>
  
  <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
    <svg width={lineAreaWidth} height={lineAreaHeight}>

    {dots}

    </svg>



  </div>
  </>
  )
};

export default Unemployment;
