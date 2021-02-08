import React, { useEffect, useState } from "react";
import Dotz from "../components/graphComponents/Dotz";
import Linez from "../components/graphComponents/Line";
import { scaleLinear, max, min, line, mean, select } from "d3";

import {
  formatQuarterlyData,
  generateXaxisValues,
  generateYaxisValues,
  chartDimensions

} from "../services/graphUtilityFunctions";

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
  // const chartAreaHeight = 400;
  // const chartAreaWidth = 700;
  // const margin = {
  //   top: 20,
  //   right: 10,
  //   bottom: 10,
  //   left: 40,
  //   centerToCenter: 40,
  // };
  // const chartHeightInner = chartAreaHeight - margin.bottom;


  // const chartDimensions={
  //   chartAreaHeight: 400, 
  //   chartAreaWidth: 700,
  //   margin: { top: 20, right: 10, bottom:10, left: 40,  },
  //   dataPoints: {centerToCenter: 40, barWidth: 12},
  //   //is there a way to call within the object? 
  //   // should be chartAreaHeight - margin.bottom
  //   chartHeightInner : 390
  // }

  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yScale: any;
  let xScale: any;
  let yAxisValues: Array<number> = [];
  let xAxisValues: Array<number> = [];
  let yAxis: any;
  let xAxis: any;
  let xAxisLine: any;
  let yAxisLine: any;
  let lineComponent: any;
  let values_unempScaled: Array<any> = [1, 2, 3];
  let renderYear: boolean[];

  let dots: any;

  labels = unemploymentData.labels;
  values_unemp = unemploymentData.values;

  if (Array.isArray(labels)) {
    labels = formatQuarterlyData(labels);
    xAxisValues = generateXaxisValues(labels);
  }

  xScale = function (index: number) {
    return index * chartDimensions.dataPoints.centerToCenter + chartDimensions.margin.left;
  };

  if (Array.isArray(values_unemp) && Array.isArray(labels)) {
    const elementsToSlice = values_unemp.length - labels.length;
    values_unemp = values_unemp.slice(elementsToSlice);

    yScale = scaleLinear()
      .domain([min(values_unemp) as number, max(values_unemp) as number])
      .range([chartDimensions.margin.bottom + 50, chartDimensions.chartAreaHeight - chartDimensions.margin.top - 50]);
  } else {
    //used as a placeholder when waiting for values to arrive
    yScale = scaleLinear()
      .domain([0, 100])
      .range([chartDimensions.margin.bottom, chartDimensions.chartAreaHeight - chartDimensions.margin.top]);
  }

  if (Array.isArray(values_unemp)) {
    values_unempScaled = values_unemp.map((el) => yScale(el));
    const labelsScaled = values_unemp.map((el, ind) => xScale(ind));

    yAxisValues = generateYaxisValues(values_unemp);

    yAxis = yAxisValues.map((el) => (
      <text
        fontSize="small"
        key={`yaxis ${el}`}
        x={5}
        y={chartDimensions.chartAreaHeight - yScale(el)}
      >
        {el.toFixed(2)}
      </text>
    ));

    xAxis = xAxisValues.map((el, ind) => (
      <text
        key={`xAxis ${el}`}
        x={xScale(ind)}
        y={chartDimensions.chartAreaHeight - chartDimensions.margin.bottom}
        fontSize="small"
      >
        {el}
      </text>
    ));

    xAxisLine = (
      <line
        id="xAxis_unemp"
        x1={chartDimensions.margin.left}
        y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
        x2={chartDimensions.chartAreaWidth - chartDimensions.margin.right}
        y2={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
        stroke="black"
      />
    );

    yAxisLine = (
      <line
        id="xAxis_unemp"
        x1={chartDimensions.margin.left}
        y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
        x2={chartDimensions.margin.left}
        y2={chartDimensions.margin.top}
        stroke="black"
      />
    );
    lineComponent = (
      <Linez
        values_unempScaled={values_unempScaled}
        labelsScaled={labelsScaled}
        xScale={xScale}
      />
    );

    dots  = (
      <Dotz
      values_unemp={values_unemp}
      values_unempScaled={values_unempScaled}
      yearLabelYPoz={chartDimensions.chartAreaHeight - chartDimensions.margin.bottom}
      labels={labels}
      centerToCenter={chartDimensions.dataPoints.centerToCenter/4}
      marginLeft = {chartDimensions.margin.left+chartDimensions.margin.right}

      />

    )
  }

  return (
    <>
      {/* <div>{JSON.stringify(unemploymentData)}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={chartDimensions.chartAreaWidth} height={chartDimensions.chartAreaHeight}>
          {dots}
          {lineComponent}
          {yAxis}
          {xAxis}
          {xAxisLine}
          {yAxisLine}
        </svg>
      </div>
    </>
  );
};

export default Unemployment;
