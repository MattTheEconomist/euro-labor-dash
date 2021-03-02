import React from "react";
import Bar from "./graphComponents/Bar";
// import Bar from "C:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/components/Barz";

import {
  chartDimensions,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
  yScale_imported,
  consistentArrayLengths,
} from "../services/graphUtilityFunctions";


interface EarningsProps {
  children?: any;
  selectedCountry?: string;
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

  let bars: any;

  values_net = netEarningsData.values;
  labels = netEarningsData.labels
  
  
  
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

  return (
    <>
      {/* <div>{JSON.stringify(netEarningsData)}</div> */}

      {/* <div>{`${selectedCountry} Net Earnings`}</div> */}

      <div className='graphContainer'>
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
