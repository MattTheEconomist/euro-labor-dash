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
  generateGraphTitle,
  missingDataMessage, 
} from "../services/graphUtilityFunctions";
import "../App.css";
// import { geoConicConformalRaw } from "d3";
// import { error } from "console";

interface VacancyProps {
  children?: any;
  selectedCountry: string;
  vacanciesData: any;
  isFetching: boolean;
  mouseYear: number; 
  // status:string; 
}

const Vacancies: React.FC<VacancyProps> = ({
  vacanciesData,
  selectedCountry,
  isFetching,
  mouseYear,
}) => {
  let labels: Array<any> = [];
  let values_vac: Array<number> = [1, 2, 3];
  let yAxis: any;
  let xAxis: any;
  let fetchError : boolean = false; 
  let errorMessage: any; 
  const seriesName: string = 'Vacancy Rate'
  let graphTitle:any; 

  let bars: any;

  

  values_vac = vacanciesData.values;
  labels = vacanciesData.labels;

  if(values_vac=== null){
    fetchError=true 
  }else{
    fetchError=false
  }



  if (Array.isArray(values_vac)) {
    labels = consistentArrayLengths(labels, values_vac)[0];
    values_vac = consistentArrayLengths(labels, values_vac)[1];

    yAxis = generateYAxisFull(values_vac);
    xAxis = generateXaxisFull(labels);


    bars =  values_vac.map((row: any, ind: number) => (

        <Bar
        currentHover = {mouseYear=== labels[ind]?true: false}
          labelScaled={xScaleAnnual(ind)}
          valueScaled={yScale_imported( values_vac, row)}
          barWidth={chartDimensions.dataPoints.barWidth}
          key={`${ind} vac`}
          valueRaw = {row}
        />
      ))

  }


  
  if(fetchError){
    errorMessage = missingDataMessage(seriesName, selectedCountry)
  }

  graphTitle = generateGraphTitle(seriesName, selectedCountry)



  return(
  <>
  {/* <div>{JSON.stringify(vacanciesData)}</div> */}

  {/* <div style={{ backgroundColor: "grey", height: 350, width: 700 }}> */}
  {/* <div className='graphContainer' id="vacGraphContainer"> */}
  <div >
        <svg  id="vacGraph"
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



  ) ;
};

export default Vacancies;
