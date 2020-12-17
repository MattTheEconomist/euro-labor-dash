import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";
import { create } from "domain";

interface BarProps {
  x: number;
  y_gross: number;
  y_net: number
  barWidth: number;
  barHeight_net: number;
  barHeight_gross: number;
  yValue: number;
  yearLabel:any; 
  yearLableYPoz: number, 

}

const Bar: React.FC<BarProps> = ({ x, y_gross, y_net, barWidth, barHeight_net, barHeight_gross, yValue, yearLabel, yearLableYPoz }) => {

  if(isNaN(y_gross)){y_gross=0}
  if(isNaN(y_net)){y_net=0}

 const axisText :number=125

  // console.log(barHeight)
  return (
    <g>
      <rect x={x} y={ y_net} width={barWidth} height={barHeight_net} fill="black"/>
      <rect x={x} y={y_gross} width={barWidth} height={barHeight_gross} fill="blue"/>
      <text x={x} y={yearLableYPoz} 
      // style={{transform:'rotate(1deg)'}}
      >{yearLabel}</text>
      </g>
  
  );
};


interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  grossEarningsData: any;
  netEarningsData: any; 
  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  grossEarningsData: grossEarningsData,
  netEarningsData : netEarningsData, 
  selectedCountry,
  isFetching,
}) => {

  const barAreaHeight = 400;
  const barAreaWidth = 700;
  const margin = { top: 10, right: 25, bottom: 30, left: 40 };
  const barChartHeight = barAreaHeight - margin.bottom;

  const barDimensions = {
    barWidth: 12,
    barSideMargin: 0.2,
    centerToCenter: 40,
    labelMarginTop: 2,
  };

  let labels: Array<Number> = [];
  let values_gross: Array<Number> = [];
  let values_net: Array<Number> = [];
    
    let bars :any = <rect></rect>
    
    if(!isFetching){
      
      values_gross = grossEarningsData.values;
      values_net = netEarningsData.values
      labels = grossEarningsData.labels;

    const yScale_gross = scaleLinear()
      .domain([min(values_gross) as number, max(values_gross) as number])
      .range([5,barChartHeight]);

      const yScale_net = scaleLinear()
      .domain([min(values_net) as number, max(values_net) as number])
      .range([5,barChartHeight]);


      // console.log(values_gross, values_net)
    
      const xScale = scaleLinear()
      .domain([min(labels) as number, max(labels) as number])
      .range([0, barAreaWidth]);

    bars = values_gross.map((row: any, ind:number)=>(
      <Bar
      x={(ind*barDimensions.centerToCenter)+margin.right}
      // y={barAreaHeight}
      y_gross={barChartHeight-yScale_gross(row)+margin.top}
      y_net={barChartHeight-yScale_net(values_net[ind])+margin.top}
      barWidth= {barDimensions.barWidth}
      // barHeight_net = {yScale(values_net[ind])+220}
      barHeight_net = {yScale_net(values_net[ind])}
      barHeight_gross = {yScale_gross(row)}
      yValue = {0}
      key={ind}
      yearLabel = {labels[ind]}
      yearLableYPoz = {barChartHeight+margin.bottom }

      />
    ))
  }


  return (
    <>
      <div>{JSON.stringify(netEarningsData)}</div>

      <div style={{backgroundColor: "grey", height: 400, width: 700}}>
      <svg width={barAreaWidth} height={barAreaHeight}>
        {bars}</svg>
      </div>
     
    </>
  );
};

export default Earnings;
