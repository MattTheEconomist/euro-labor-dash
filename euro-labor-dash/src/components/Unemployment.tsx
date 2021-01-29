import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, line, mean, select, geoConicConformalRaw } from "d3";
import { worker } from "cluster";
// import { create } from "domain";
// import { BaseOptions } from "vm";

const animateLine = (
  currentLine: any,
  xScale: any,
  values_unempScaled: Array<number>,
 
) => {

console.log('ANIMATE', xScale)
// values_unempScaled BECOMES undefined after its passed through 
  // console.log('ANIMATE', values_unempScaled)


  // if (values_unempScaled[1] === undefined) {
  // if (typeof values_unempScaled[1] === undefined) {
  if (Array.isArray(values_unempScaled)) {
    // values_unempScaled=[]


    // console.log("hi")


 

  // console.log(values_unempScaled)
  const drawLine = line()
    .x((d: any, i: any) => i * 10 + 50)
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

interface LineProps {
  xScale: any;
  yScale: any;
  values_unemp: any;
}

const Line: any = (values_unempScaled: any, labelsScaled: any, xScale: any) => {
  const [lineValues, setLineValues] = useState([1, 2, 3]);

  const lineRef: any = React.createRef();

  // console.log( "BEFORE ANIMATE",xScale)

  values_unempScaled = values_unempScaled.values_unempScaled;

  // defined here
  // console.log(values_unempScaled)

  // values_unempScaled = values_unempScaled;
  labelsScaled = labelsScaled.lablesScaled;

  const fakeProp = [4,5,6]

  useEffect(() => {
    // if (Array.isArray(values_unempScaled)) {
    if (values_unempScaled.length>1) {
      // console.log( "BEFORE ANIMATE",values_unempScaled)
      console.log( "BEFORE ANIMATE",xScale)
      setLineValues(values_unempScaled);

      const currentLine = select(lineRef.current);
      // animateLine(currentLine, lineValues, xScale);
      animateLine(currentLine, xScale, values_unempScaled);
    }
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
  // if (isNaN(y_unemp)) {
  //   y_unemp = 0;
  // }

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
  let values_unempScaled: Array<any>=[1,2,3]

  let dots: any;

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

  xScale = (index: number) => {
    return index * margin.centerToCenter + margin.left;
  };

  if (values_unemp !== undefined) {
    const elementsToSlice = values_unemp.length - labels.length;
    values_unemp = values_unemp.slice(elementsToSlice);

    yScale = scaleLinear()
      .domain([min(values_unemp) as number, max(values_unemp) as number])
      .range([margin.bottom, lineAreaHeight - margin.top]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale = scaleLinear()
      .domain([0, 100])
      .range([margin.bottom, lineAreaHeight - margin.top]);
  }

  if (values_unemp !== undefined) {
    values_unempScaled = values_unemp.map((el) => yScale(el));
    // console.log(values_unempScaled);

    const labelsScaled = values_unemp.map((el, ind) => xScale(ind));

    yAxisValues = generateYaxisValues(values_unemp);

    dots = values_unempScaled.map((row: any, ind: number) => (
      <Dot
        x={xScale(ind)}
        //use for tooltip later
        y_unemp={values_unemp[ind]}
        dotHeight={row}
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

    console.log('BEFORE LINE', xScale)

    lineComponent = (
      <Line
        values_unempScaled={values_unempScaled}
        // values_unempScaled={values_unemp.length>1?values_unempScaled:[2,3,4]}
        labelsScaled={labelsScaled}
        xScale={xScale}
      />
    );
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
