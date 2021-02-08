import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import Bar from "../components/graphComponents/Barz";
import {
  generateXaxisValues,
  generateYaxisValues,
  chartDimensions,
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

  // const chartDimensions={
  //   chartAreaHeight: 400, 
  //   chartAreaWidth: 700,
  //   margin: { top: 20, right: 10, bottom:10, left: 40,  },
  //   dataPoints: {centerToCenter: 40, barWidth: 12},
  //   //is there a way to call within the object? 
  //   // should be chartAreaHeight - margin.bottom
  //   chartHeightInner : 390
  // }


  let labels: Array<any> = [];
  let values_net: Array<number> = [1, 2, 3];
  let yScale_net: any;
  let yAxisValues :Array<number> = [];
  let xAxisLine: any; 
  let xAxisText: any; 



  let bars: any;


  values_net = netEarningsData.values;
  // labels = netEarningsData.labels
  
  if (Array.isArray(values_net)) {
    labels =netEarningsData.labels.map((year: any) => parseInt(year));
    // labels = labels.map((year: any) => parseInt(year));
    // labels =netEarningsData.labels.map((year: any) => parseInt(year));

  }

  if (min(labels) < 2005 && Array.isArray(values_net)) {
    const elementsToSlice = 2005 - min(labels);
    labels = labels.slice(elementsToSlice);
    values_net = values_net.slice(elementsToSlice);
  }

  if (min(labels) > 2005 && Array.isArray(values_net)) {
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
      .range([chartDimensions.margin.bottom, chartDimensions.chartAreaHeight - chartDimensions.margin.top]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale_net = scaleLinear().domain([0, 100]).range([5, chartDimensions.chartHeightInner]);
  }

  const xScale = scaleLinear()
    .domain([min(labels) as number, max(labels) as number])
    .range([chartDimensions.margin.left, chartDimensions.chartAreaWidth]);

  if (values_net !== undefined) {
    values_net  =values_net.map((el :any)=>Math.round(el))

    yAxisValues = generateYaxisValues(values_net)
    // yAxisValues = yAxisValues.map((el)=>Math.round(el/1000))



    bars = values_net.map((row: any, ind: number) => (
      <Bar
        x={ind * chartDimensions.dataPoints.centerToCenter + chartDimensions.margin.left}
        y_net={
          values_net === undefined || values_net.length === 0
            ? 0
            : chartDimensions.chartHeightInner - yScale_net(values_net[ind])-10
        }
        barWidth={chartDimensions.dataPoints.barWidth}
        barHeight_net={
          values_net === undefined || values_net.length === 0
            ? 0
            : yScale_net(values_net[ind])
        }
        yValue={0}
        key={ind}
        yearLabel={labels[ind]}
        yearLableYPoz={chartDimensions.chartHeightInner + chartDimensions.margin.bottom}
      />
    ));
  }

  // xAxisLine=(

  // )

  // xAxisText= (

  // )

  return (
    <>
      {/* <div>{JSON.stringify(netEarningsData)}</div> */}

      {/* <div>{`${selectedCountry} Net Earnings`}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={chartDimensions.chartAreaWidth} height={chartDimensions.chartAreaHeight}>
          {yAxisValues.map(el=>(
            <text key={`yaxis ${el}`} x={5} y={chartDimensions.chartAreaHeight-yScale_net(el)}>{el}</text>
          ))}
          <line
            id="xAxis"
            x1={chartDimensions.margin.left}
            y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
            x2={chartDimensions.chartAreaWidth - chartDimensions.margin.right}
            y2={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
            stroke="black"
          />

          {bars}
        </svg>
      </div>
    </>
  );
};

export default Earnings;
