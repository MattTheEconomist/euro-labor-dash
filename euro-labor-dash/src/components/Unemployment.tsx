import React, { useEffect, useState } from "react";
import Dotz from "../components/graphComponents/Dotz";
import Linez from "../components/graphComponents/Line";
import { scaleLinear, max, min, line, mean, select } from "d3";

import {
  formatQuarterlyData,
  generateXaxisValues,
  generateYaxisValues,
  chartDimensions, 
  yScale_imported,
  xScale_imported,
  generateYAxisFull, 
  generateXaxisFull, 

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


  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yScale: any;
  let xScale: any;
  let yAxis: any; 
  let yAxisValues: Array<number> = [];
  let xAxisValues: Array<number> = [];
  let yAxisText: any;
  let xAxis: any;
  let xAxisLine: any;
  let yAxisLine: any;
  let lineComponent: any;
  let values_unempScaled: Array<any> = [1, 2, 3];


  let dots: any;

  labels = unemploymentData.labels;
  values_unemp = unemploymentData.values;



  if (Array.isArray(values_unemp) && Array.isArray(labels)) {
    const elementsToSlice = values_unemp.length - labels.length;
    values_unemp = values_unemp.slice(elementsToSlice);



  } 



  if (Array.isArray(values_unemp)) {
    // values_unempScaled = values_unemp.map((el) => yScale(el));
    values_unempScaled = values_unemp.map((el) => yScale_imported(values_unemp ,el));
    const labelsScaled = values_unemp.map((el, ind) => xScale_imported(ind));

    yAxisValues = generateYaxisValues(values_unemp);

    yAxis = generateYAxisFull(values_unempScaled)
    xAxis = generateXaxisFull(labels)


    lineComponent = (
      <Linez
        values_unempScaled={values_unempScaled}
        labelsScaled={labelsScaled}
        xScale={xScale_imported}
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

        </svg>
      </div>
    </>
  );
};

export default Unemployment;
