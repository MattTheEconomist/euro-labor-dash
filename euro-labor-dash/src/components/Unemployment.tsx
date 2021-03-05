import React, { useEffect, useState } from "react";
import Dotz from "./graphComponents/Dot";
import Linez from "../components/graphComponents/Line";

import {
  chartDimensions,
  yScale_imported,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
  generateYaxisValues,
  consistentArrayLengths,
  generateGraphTitle,
  missingDataMessage,
} from "../services/graphUtilityFunctions";

interface UnemploymentProps {
  selectedCountry: string;
  unemploymentData: any;
  isFetching: boolean;
  mouseX: number; 
   mouseY: number;
}

const Unemployment: React.FC<UnemploymentProps> = ({
  selectedCountry,
  unemploymentData,
  isFetching,
  mouseX, 
  mouseY
}) => {
  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yAxis: any;
  let xAxis: any;
  let xAxisLine: any;
  let lineComponent: any;
  let values_unempScaled: any;
  let dots: any;
  let fetchError : boolean = false; 
  let errorMessage: any; 
  const seriesName: string = 'Unemployment';
  let graphTitle:any; 


  
  labels = unemploymentData.labels;
  values_unemp = unemploymentData.values;
  
  // console.log(selectedCountry)
  // console.log('yAxis values', generateYaxisValues(values_unemp))
  // console.log('raw', values_unemp)

  if(values_unemp=== null){
    fetchError=true 
  }else{
    fetchError=false
  }
  

  if (!fetchError && values_unemp !== undefined && values_unemp !==null) {
  // if(values_unemp!== undefined){
    labels = consistentArrayLengths(labels, values_unemp)[0]
    values_unemp = consistentArrayLengths(labels, values_unemp)[1]

  }



  if (Array.isArray(values_unemp)) {


    values_unempScaled = values_unemp.map((el) =>
      yScale_imported(values_unemp, el)
    );
    const labelsScaled = values_unemp.map((el, ind) => xScaleAnnual(ind));


    yAxis = generateYAxisFull(values_unemp);
    xAxis = generateXaxisFull(labels);

    lineComponent = (
      <Linez valuesScaled={values_unempScaled} labelsScaled={labelsScaled} />
    );

    dots = (
      <Dotz
        valuesRaw={values_unemp}
        valuesScaled={values_unempScaled}
        labels={labels}
        mouseX={mouseX}
        mouseY={mouseY}
        isFetching={isFetching}
      />
    );
  }

  if(fetchError){
    errorMessage = missingDataMessage(seriesName, selectedCountry)
  }

  graphTitle = generateGraphTitle(seriesName, selectedCountry)
  


  return (
    <>
      {/* <div>{JSON.stringify(unemploymentData)}</div> */}

      {/* <div className='graphContainer'> */}
      <div >
        <svg id="unempGraph"
          width={chartDimensions.chartAreaWidth}
          height={chartDimensions.chartAreaHeight}
        >
         {graphTitle}
          {errorMessage}
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
