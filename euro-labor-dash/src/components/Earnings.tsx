import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import Bar from "../components/graphComponents/Barz";
import {
  generateXaxisValues,
  generateYaxisValues,
} from "../services/graphUtilityFunctions";


interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  netEarningsData: any;

  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  netEarningsData: netEarningsData,
  selectedCountry,
  isFetching,
}) => {
  const barAreaHeight = 400;
  const barAreaWidth = 700;
  const margin = { top: 30, right: 70, bottom: 10, left: 50 };
  const barChartHeight = barAreaHeight - margin.bottom;

  const barDimensions = {
    barWidth: 12,
    barSideMargin: 0.2,
    centerToCenter: 40,
    labelMarginTop: 2,
  };

  let labels: Array<any> = [];
  let values_net: Array<number> = [1, 2, 3];
  let yScale_net: any;
  let yAxisValues :Array<number> = [];


  // let bars: any = <rect></rect>;
  let bars: any;

  // function generateYaxisValues(ar :Number[]){
  //   const point1  = min(ar)
  //   const point5 = max(ar)
  //   const point3 = mean([point1, point5])
  //   const point2 = mean([point1, point3])
  //   const point4 =  mean([point5, point3])
  //   let rez  = [point5, point4, point3, point2, point1]

  //   return rez.map((el :any)=>Math.round(el))
  // }


  values_net = netEarningsData.values;
  if (values_net !== undefined) {
    labels = netEarningsData.labels.map((year: any) => parseInt(year));
  }

  if (min(labels) < 2005 && values_net !== undefined) {
    const elementsToSlice = 2005 - min(labels);
    labels = labels.slice(elementsToSlice);
    values_net = values_net.slice(elementsToSlice);
  }

  if (min(labels) > 2005 && values_net !== undefined) {
    const minYear = min(labels);
    const elementsToAdd: number = minYear - 2005;

    for (let i = 0; i < elementsToAdd; i++) {
      labels.unshift(labels[0] - 1);
      values_net.unshift(0);
    }

    values_net = values_net.slice(elementsToAdd);
    
  }

  if(Array.isArray(values_net)){


    values_net = values_net.map((el)=>Math.round(el/1000))
  }
  


  if (values_net !== undefined) {
    yScale_net = scaleLinear()
      .domain([min(values_net) as number, max(values_net) as number])
      .range([margin.bottom, barAreaHeight - margin.top]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale_net = scaleLinear().domain([0, 100]).range([5, barChartHeight]);
  }

  const xScale = scaleLinear()
    .domain([min(labels) as number, max(labels) as number])
    .range([margin.left, barAreaWidth]);

  if (values_net !== undefined) {
    values_net  =values_net.map((el :any)=>Math.round(el))

    yAxisValues = generateYaxisValues(values_net)
    // yAxisValues = yAxisValues.map((el)=>Math.round(el/1000))



    bars = values_net.map((row: any, ind: number) => (
      <Bar
        x={ind * barDimensions.centerToCenter + margin.left}
        y_net={
          values_net === undefined || values_net.length === 0
            ? 0
            : barChartHeight - yScale_net(values_net[ind])-10
        }
        barWidth={barDimensions.barWidth}
        barHeight_net={
          values_net === undefined || values_net.length === 0
            ? 0
            : yScale_net(values_net[ind])
        }
        yValue={0}
        key={ind}
        yearLabel={labels[ind]}
        yearLableYPoz={barChartHeight + margin.bottom}
      />
    ));
  }

  return (
    <>
      {/* <div>{JSON.stringify(netEarningsData)}</div> */}

      {/* <div>{`${selectedCountry} Net Earnings`}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={barAreaWidth} height={barAreaHeight}>
          {yAxisValues.map(el=>(
            <text key={`yaxis ${el}`} x={5} y={barAreaHeight-yScale_net(el)}>{el}</text>
          ))}
          <line
            id="xAxis"
            x1={margin.left}
            y1={barChartHeight - margin.bottom}
            x2={barAreaWidth - margin.right}
            y2={barChartHeight - margin.bottom}
            stroke="black"
          />

          {bars}
        </svg>
      </div>
    </>
  );
};

export default Earnings;
