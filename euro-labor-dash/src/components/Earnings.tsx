import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import Bar from "../components/graphComponents/Barz";
import 
{
  formatQuarterlyData,
  generateXaxisValues,
  generateYaxisValues,
  chartDimensions, 
  yScale_bars,
  xScaleAnnual,
  generateYAxisFull, 
  generateXaxisFull, 

}
from "../services/graphUtilityFunctions";

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
  let labels: Array<any> = [];
  let values_net: Array<number> = [1, 2, 3];
  let yScale_net: any;
  // let yAxisValues: Array<number> = [];
  // let yAxisText: any;
  // let xAxisLine: any;
  // let xAxisText: any;
  let yAxis: any; 
  let xAxis: any; 

  let bars: any;

  values_net = netEarningsData.values;
  // labels = netEarningsData.labels

  if (Array.isArray(values_net)) {
    labels = netEarningsData.labels.map((year: any) => parseInt(year));

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

  if (Array.isArray(values_net)) {
    values_net = values_net.map((el) => Math.round(el / 1000));
  }

  if (values_net !== undefined) {
    yScale_net = scaleLinear()
      .domain([min(values_net) as number, max(values_net) as number])
      .range([
        chartDimensions.margin.bottom,
        chartDimensions.chartAreaHeight - chartDimensions.margin.top,
      ]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale_net = scaleLinear()
      .domain([0, 100])
      .range([5, chartDimensions.chartHeightInner]);
  }


  if (Array.isArray(values_net)) {
    values_net = values_net.map((el: any) => Math.round(el));

    yAxis = generateYAxisFull(values_net)
    xAxis = generateXaxisFull(labels)


    bars = values_net.map((row: any, ind: number) => (
      <Bar
      labelScaled={xScaleAnnual(ind)}
        valueScaled= {yScale_bars(values_net, row)-chartDimensions.margin.bottom}
        barWidth={chartDimensions.dataPoints.barWidth}
        // barHeight_net={yScale_bars(values_net, row)-chartDimensions.margin.bottom}
        barHeight_net={
          values_net === undefined || values_net.length === 0
            ? 0
            : yScale_net(values_net[ind])
            // : yScale_bars(values_net, row)
        }
        key={ind}

      />
    ));
  }




  return (
    <>
      {/* <div>{JSON.stringify(netEarningsData)}</div> */}

      {/* <div>{`${selectedCountry} Net Earnings`}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg
          width={chartDimensions.chartAreaWidth}
          height={chartDimensions.chartAreaHeight}
        >

          {yAxis}
          {xAxis}
          {bars}
        </svg>
      </div>
    </>
  );
};

export default Earnings;
