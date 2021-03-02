import React from "react";
import Bar from "./graphComponents/Bar";
// import Bar from "C:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/components/Barz";
// import styles from './App.css'
import  '../App.css'

import {
  chartDimensions,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
  yScale_imported,
  consistentArrayLengths,
} from "../services/graphUtilityFunctions";
import "../App.css";

interface VacancyProps {
  children?: any;
  selectedCountry?: string;
  vacanciesData: any;
  isFetching: boolean;
}

const Vacancies: React.FC<VacancyProps> = ({
  vacanciesData,
  selectedCountry,
  isFetching,
}) => {
  let labels: Array<any> = [];
  let values_vac: Array<number> = [1, 2, 3];
  let yAxis: any;
  let xAxis: any;

  let bars: any;

  values_vac = vacanciesData.values;
  labels = vacanciesData.labels;

  if (Array.isArray(values_vac)) {
    labels = consistentArrayLengths(labels, values_vac)[0];
    values_vac = consistentArrayLengths(labels, values_vac)[1];

    yAxis = generateYAxisFull(values_vac);
    xAxis = generateXaxisFull(labels);


    bars = values_vac.map((row: any, ind: number) => (

        <Bar
          labelScaled={xScaleAnnual(ind)}
          valueScaled={yScale_imported( values_vac, row)}
          barWidth={chartDimensions.dataPoints.barWidth}
          key={`${ind} vac`}
          valueRaw = {row}
        />
      ))


  }

  return(<>
  <div>{JSON.stringify(vacanciesData)}</div>

  {/* <div style={{ backgroundColor: "grey", height: 350, width: 700 }}> */}
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



  ) ;
};

export default Vacancies;
