import React, { useEffect, useState } from "react";
import Dotz from "../components/graphComponents/Dotz";
import Linez from "../components/graphComponents/Line";
import { scaleLinear, max, min, line, mean, select } from "d3";

import {
  formatQuarterlyData,
  generateXaxisValues,
  generateYaxisValues,
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
  const lineAreaHeight = 400;
  const lineAreaWidth = 700;
  const margin = {
    top: 30,
    right: 70,
    bottom: 10,
    left: 50,
    centerToCenter: 40,
  };
  const lineChartHeight = lineAreaHeight - margin.bottom;

  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yScale: any;
  let xScale: any;
  let yAxisValues: Array<number> = [];
  let xAxisValues: Array<number> = [];
  let yAxis: any;
  let xAxis: any;
  let lineComponent: any;
  let values_unempScaled: Array<any> = [1, 2, 3];
  let renderYear: boolean[];

  let dots: any;

  labels = unemploymentData.labels;
  values_unemp = unemploymentData.values;

  if (Array.isArray(labels)) {
    labels = formatQuarterlyData(labels);
    xAxisValues = generateXaxisValues(labels, true);
  }

  xScale = function (index: number) {
    return index * margin.centerToCenter + margin.left;
  };

  if (Array.isArray(values_unemp) && Array.isArray(labels)) {
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
    const labelsScaled = values_unemp.map((el, ind) => xScale(ind));
    const renderYear = values_unemp.map((el, ind) =>
      ind % 4 === 0 ? true : false
    );

    yAxisValues = generateYaxisValues(values_unemp);

    yAxis = yAxisValues.map((el) => (
      <text key={`yaxis ${el}`} x={5} y={lineAreaHeight - yScale(el)}>
        {el.toFixed(2)}
      </text>
    ));

    xAxis = xAxisValues.map((el, ind) => (
      <text
        key={`xAxis ${el}`}
        x={xScale(ind)}
        y={lineAreaHeight - margin.bottom}
      >
        {el}
      </text>
    ));

    console.log(xAxis);

    lineComponent = (
      <Linez
        values_unempScaled={values_unempScaled}
        labelsScaled={labelsScaled}
        xScale={xScale}
      />
    );

    // dots  = (
    //   <Dotz
    //   values_unemp={values_unemp}
    //   values_unempScaled={values_unempScaled}
    //   yearLabelYPoz={lineAreaHeight - margin.bottom}
    //   labels={labels}
    //   centerToCenter={margin.centerToCenter}
    //   marginLeft = {margin.left}

    //   />

    // )
  }

  return (
    <>
      {/* <div>{JSON.stringify(unemploymentData)}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={lineAreaWidth} height={lineAreaHeight}>
          {dots}
          {yAxis}
          {lineComponent}
          {xAxis}
        </svg>
      </div>
    </>
  );
};

export default Unemployment;
