import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";
import { create } from "domain";

interface BarProps {
  x: number;
  y: number;
  barWidth: number;
  barHeight: number;
  yValue: number;
}

const Bar: React.FC<BarProps> = ({ x, y, barWidth, barHeight, yValue }) => {

  console.log(barHeight)
  return (
    <svg>
      {/* <g> */}
      <rect x={x} y={y} width={barWidth} height={barHeight} fill="black"/>
      {/* <rect x={x} y={y} width={10} height={10} fill="black"/> */}
      {/* <rect x={10} y={10} width={10} height={10} fill="black">
        {" "}
      </rect> */}
      {/* </g> */}
    </svg>
  );
};

//  function min<T, U extends Numeric>(array: Iterable<T>, accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null): U | undefined;

interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  netEarningsData: any;
  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  netEarningsData,
  selectedCountry,
  isFetching,
}) => {
  const [otherBars, setOtherBars] = useState([1, 2, 3, 4]);

  const barAreaHeight = 100;
  const barAreaWidth = 500;
  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const barChartHeight = barAreaHeight - margin.top - margin.bottom;

  const barDimensions = {
    barWidth: 7.8,
    barSideMargin: 0.2,
    centerToCenter: 8,
    labelMarginTop: 2,
  };

  let labels: Array<Number> = [];
  let values: Array<Number> = [];
  // let dataNet = {};
  // let bars;
  // let otherBars =

  //   netEarningsData.data

  useEffect(() => {
    if (!isFetching) {
      createGraph();
    }
  }, [isFetching]);

  function createGraph() {
    labels = netEarningsData.labels.map((year: string) => parseInt(year));
    // netEarningsData.labels = netEarningsData.labels.map((year: string) => parseInt(year));
    values = netEarningsData.values;

    const xScale = scaleLinear()
      .domain([min(labels) as number, max(labels) as number])
      .range([0, barAreaWidth]);

    const yScale = scaleLinear()
      .domain([min(values) as number, max(values) as number])
      .range([0, barAreaHeight]);

    netEarningsData.labels = labels;

    // console.log(netEarningsData.lables);

    // console.log(netEarningsData)
  }

  // let listHtml = <li>hi</li>
  let bars :any = <rect></rect>

  if(!isFetching){

    values = netEarningsData.values;

    const yScale = scaleLinear()
      .domain([min(values) as number, max(values) as number])
      .range([barAreaHeight, 0]);


    //  listHtml = netEarningsData.labels.map((num: number)=><rect x={num+10} y={10} width={10} height={10} fill="black"></rect>)
    // bars = netEarningsData.labels.map((num: number, ind:number)=><rect x={ind*10} y={10} width={5} height={10} fill="black"></rect>)
    // bars = netEarningsData.values.map((row: any, ind:number)=>(
    bars = Object.keys(netEarningsData).map((row: any, ind:number)=>(
      <Bar
      x={ind*15}
      y={5}
      barWidth= {10}
      // barHeight = {row/1000}
      barHeight = {yScale(row.values)}
      yValue = {0}

      />
    ))
    // console.log(rectHtml)
  }

// aha!
  Object.keys(netEarningsData).map((row: any, ind:number)=>(console.log(row)))
  console.log(netEarningsData)

  return (
    <>
      <div>{JSON.stringify(netEarningsData)}</div>;{/* <svg>{bars}</svg> */}

      {/* <ul>
       {!isFetching && listHtml}
      </ul> */}

      {/* <g>}</g> */}
      <svg>{bars}</svg>
      {/* <svg>{rectHtml}</svg> */}
      {/* <svg><rect  x={10} y={10} width={10} height={10} fill="black"></rect></svg> */}
    </>
  );
};

export default Earnings;
