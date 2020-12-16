import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";
import { create } from "domain";

interface BarProps {
  x: number;
  y: number;
  barWidth: number;
  barHeight: number;
  yValue: number;
  yearLabel:any; 

}

const Bar: React.FC<BarProps> = ({ x, y, barWidth, barHeight, yValue, yearLabel }) => {

 const axisText :number=125

  // console.log(barHeight)
  return (
    <g>
      <rect x={x} y={y} width={barWidth} height={barHeight} fill="black"/>
      <text x={x} y={y+axisText}>{yearLabel}</text>
      </g>
  
  );
};


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

      
      
    }
    
    let bars :any = <rect></rect>
    
    if(!isFetching){
      
      values = netEarningsData.values;
      labels = netEarningsData.labels;

    const yScale = scaleLinear()
      .domain([min(values) as number, max(values) as number])
      .range([barAreaHeight, 0]);

    bars = values.map((row: any, ind:number)=>(
      <Bar
      x={ind*25}
      y={5}
      barWidth= {10}
      // barHeight = {row/1000}
      barHeight = {yScale(row)}
      yValue = {0}
      key={ind}
      yearLabel = {labels[ind]}

      />
    ))
    console.log(bars)
  }


  return (
    <>
      <div>{JSON.stringify(netEarningsData)}</div>;{/* <svg>{bars}</svg> */}

      <svg>{bars}</svg>
    </>
  );
};

export default Earnings;
