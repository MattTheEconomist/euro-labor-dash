import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean } from "d3";

export function generateYaxisValues(ar: Array<number>) {
  const point1 = min(ar);
  const point5 = max(ar);
  const point3 = mean([point1, point5]);
  const point2 = mean([point1, point3]);
  const point4 = mean([point5, point3]);
  let rez = [point5, point4, point3, point2, point1];

  return rez.map((el: any) => parseFloat(el.toFixed(2)));
}

export function generateXaxisValues(labels: Array<any>) {
  const isQuarterly = String(labels[1]).length > 5;

  if (isQuarterly) {
    return labels
      .filter((el: any, ind: number) => ind % 4 == 0)
      .map((el: any) => el.getFullYear());
  } else {
    return labels.map((year: any) => parseInt(year));
  }
}

export function yScale_imported(allValues: Array<number>, currentValue: number){

  const currentScale = (
    scaleLinear()
    .domain([min(allValues) as number, max(allValues) as number])
    .range([chartDimensions.margin.bottom + 50, chartDimensions.chartAreaHeight - chartDimensions.margin.top - 50])
  )
  
  return currentScale(currentValue)

  }

  export function xScale_imported(index:number){

    return index * chartDimensions.dataPoints.centerToCenter + chartDimensions.margin.left;
  }





export function formatQuarterlyData(ar: Array<any>) {
  ar = ar.filter((el) => parseInt(el.split("-")) >= 2005);
  ar = ar.map((el) => {
    const year = el.split("-")[0];
    const qtr = el.split("-")[1];
    const month = parseInt(qtr[1]) * 3;
    return new Date(`${year}-${month}-01`);
  });
  return ar;
}

export const chartDimensions={
  chartAreaHeight: 400, 
  chartAreaWidth: 700,
  margin: { top: 20, right: 10, bottom:10, left: 40,  },
  dataPoints: {centerToCenter: 40, barWidth: 12},
  //is there a way to call within the object? 
  // should be chartAreaHeight - margin.bottom
  chartHeightInner : 390
}