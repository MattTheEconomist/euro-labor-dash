import React from "react";
import Bar from "./graphComponents/Bar";

import {
  chartDimensions,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
  yScale_imported,
  consistentArrayLengths,
  missingDataMessage,
  generateGraphTitle,
} from "../services/graphUtilityFunctions";


interface EarningsProps {
  children?: any;
  selectedCountry: string;
  netEarningsData: any;
  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  // netEarningsData: netEarningsData,
  netEarningsData,
  selectedCountry,
  isFetching,
}) => {
  let labels: Array<any> = [];
  let values_net: Array<number> = [1, 2, 3];
  let yAxis: any;
  let xAxis: any;
  let fetchError : boolean = false; 
  let errorMessage: any; 
  const seriesName: string = 'Earnings';
  let graphTitle:any; 

  let bars: any;

  values_net = netEarningsData.values;
  labels = netEarningsData.labels

  
  if(values_net=== null){
    fetchError=true 
  }else{
    fetchError=false
  }
  
  
  
  if (Array.isArray(values_net)) {

    labels = consistentArrayLengths(labels, values_net)[0]
    values_net = consistentArrayLengths(labels, values_net)[1]


  }
  
  

  if (Array.isArray(values_net)) {
    values_net = values_net.map((el) => Math.round(el / 1000));
  }


  if (Array.isArray(values_net)) {
    // values_net = values_net.map((el: any) => Math.round(el));


    yAxis = generateYAxisFull(values_net);
    xAxis = generateXaxisFull(labels);


    bars = values_net.map((row: any, ind: number) => (

      <Bar
        labelScaled={xScaleAnnual(ind)}
        valueScaled={yScale_imported(values_net, row)}
        valueRaw = {row}
        barWidth={chartDimensions.dataPoints.barWidth}
        key={ind}
      />
    ));
  }

  if(values_net=== null){
    
    errorMessage = missingDataMessage(seriesName, selectedCountry)
  }

  graphTitle = generateGraphTitle(seriesName, selectedCountry)

  return (
    <>
      {/* <div>{JSON.stringify(netEarningsData)}</div> */}

      {/* <div>{`${selectedCountry} Net Earnings`}</div> */}

      <div className='graphContainer'>
        <svg
          width={chartDimensions.chartAreaWidth}
          height={chartDimensions.chartAreaHeight}
        >
          {graphTitle}
          {errorMessage}
          {yAxis}
          {xAxis}
          {bars}
        </svg>
      </div>
    </>
  );
};

export default Earnings;
