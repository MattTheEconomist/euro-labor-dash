import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, line, mean, select } from "d3";
import { worker } from "cluster";
// import { create } from "domain";
// import { BaseOptions } from "vm";

const animateLine = (
  currentLine: any,
  // yScale: any,
  // xScale: any,
  values_unempScaled: Array<number>,
  // labelsScaled: Array<number>
) => {


  // console.log(xScale(100))



  // const drawLine = line()
  //   .x((d, i) => xScale(i))
  //   .y((d) => yScale(d));

  const drawLine = line()
    .x((d:any, i:any) => (i*10)+50)
    .y((d:any) => d);

  // let values_unemp: Array<number>;
  // let temp = values_unemp

  // const linePath = drawLine(temp)
  const linePath = drawLine(values_unempScaled as Array<number> | any);
  // const linePath = drawLine(values_unempScaled as any);

  // const testPath:number[]|any = [1,2,3,4,5,6,7,8,9,100]
  // const testPath:number[]|any = [1,2,3,4,5,6,7,8,9,100]

  // console.log(typeof values_unempScaled[0])
  // console.log(values_unempScaled)
  // const linePath = drawLine(testPath);

  currentLine
    .transition()
    .duration(1000)
    .attr("d", linePath)
    .attr("fill", "none")
    .attr("stroke", "black")
};

interface LineProps {
  xScale: any;
  yScale: any;
  values_unemp: any;
}

// const Line: React.FC<LineProps> =(xScale:any, yScale:any, values_unemp: Array<number>)=>{
// const Line: any = (xScale: any, yScale: any, values_unemp: Array<number>) => {
// const Line: any = (  values_unempScaled: Array<number>) => {
const Line: any = (  values_unempScaled: any, labelsScaled:any) => {
  const [lineValues, setLineValues] = useState([1,2,3])


  const lineRef: any = React.createRef();

  // console.log(xScale(100))
  // console.log(yScale(100))

  values_unempScaled = values_unempScaled.values_unempScaled
  labelsScaled = labelsScaled.lablesScaled

  useEffect(() => {
    if( values_unempScaled !== undefined){
      setLineValues( values_unempScaled)
    }
    

    const currentLine = select(lineRef.current);
    animateLine(currentLine,   values_unempScaled);
  });

  return (
    <g>
      <path ref={lineRef} />
    </g>
  );
};

const animtaeDots = (dotRef: any, dotHeight: number, x: number) => {
  const dot = select(dotRef.current);

  dot.transition().duration(1000).attr("cy", dotHeight).attr("cx", x);
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
  if (isNaN(y_unemp)) {
    y_unemp = 0;
  }

  const dotRef: any = React.createRef();

  useEffect(() => {
    animtaeDots(dotRef, dotHeight, x);
  });

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
  let values_unemp: Array<number> = [];
  let yScale: any;
  let xScale: any;
  let yAxisValues: Array<number> = [];
  let yAxis: any;
  let lineComponent: any; 

  let dots: any;

  // function generateYaxisValues(ar: Array<number|undefined|any>) {
  function generateYaxisValues(ar: Array<number>) {
    const point1 = min(ar);
    const point5 = max(ar);
    const point3 = mean([point1, point5]);
    const point2 = mean([point1, point3]);
    const point4 = mean([point5, point3]);
    let rez = [point5, point4, point3, point2, point1];

    return rez.map((el: any) => parseFloat(el.toFixed(2)));
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

     xScale = scaleLinear()
      .domain([0, 100])
      .range([margin.bottom, lineAreaHeight - margin.top]);

    
  }
  

  if (values_unemp !== undefined) {
    yAxisValues = generateYaxisValues(values_unemp);

    dots = values_unemp.map((row: any, ind: number) => (
      <Dot
        x={ind * margin.centerToCenter + margin.left}
        y_unemp={
          values_unemp === undefined || values_unemp.length === 0
            ? 0
            : lineAreaHeight - yScale(values_unemp[ind]) - 10
        }
        dotHeight={yScale(row)}
        yValue={0}
        yearLabel={labels[ind].getFullYear()}
        yearLableYPoz={lineAreaHeight}
        renderYear={ind % 4 === 0 ? true : false}
      />
    ));

    yAxis = yAxisValues.map((el) => (
      <text key={`yaxis ${el}`} x={5} y={lineAreaHeight - yScale(el)}>
        {el.toFixed(2)}
      </text>
    ));

    const values_unempScaled = values_unemp.map(el=>yScale(el))
    console.log(values_unempScaled)

    const labelsScaled = values_unemp.map((el, ind)=>ind * margin.centerToCenter + margin.left)


    lineComponent= <Line  values_unempScaled={values_unempScaled} labelsScaled={labelsScaled} />
    // lineComponent= <Line  values_unempScaled={values_unemp.map(el=>yScale(el)) } />
    // console.log(xScale(100))


      

  }

  return (
    <>
      {/* <div>{JSON.stringify(unemploymentData)}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={lineAreaWidth} height={lineAreaHeight}>
          {dots}
          {yAxis}
          {lineComponent}

          
        </svg>
      </div>
    </>
  );
};

export default Unemployment;
