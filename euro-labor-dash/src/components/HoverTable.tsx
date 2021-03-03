import React from "react";
import { chartDimensions, consistentArrayLengths } from "../services/graphUtilityFunctions";
import HoverTableRow from './HoverTableRow'

interface HoverTableProps {
  selectedCountry: string;
  mouseX: number;
  mouseY?: number;
  netEarningsData: any;
  unemploymentData: any;
  vacanciesData: any;
}

const HoverTable: React.FC<HoverTableProps> = ({
  selectedCountry,
  mouseX,
  netEarningsData,
  unemploymentData,
  vacanciesData,
  // mouseY,
}) => {

  let labels_vac: Array<any> = [1, 2, 3];
  let values_vac: Array<number> = [1, 2, 3];
  let labels_unemp: Array<any> = [1, 2, 3];
  let values_unemp: Array<number> = [1, 2, 3];
  let labels_net: Array<any> = [1, 2, 3];
  let values_net: Array<number> = [1, 2, 3];


  let yearHovered: number; 
  let yearQuarterHovered: string; 
  let hoverValue_net:number=0; 
  let hoverValue_vac: number=0; 
  let fetchError_net : boolean = false; 
  let fetchError_vac : boolean = false; 
  let fetchError_unemp : boolean = false; 


  // console.log('before array extraction', netEarningsData)

  values_vac = vacanciesData.values;
  labels_vac = vacanciesData.labels;

  values_unemp = unemploymentData.values;
  labels_unemp = unemploymentData.labels;

  values_net= netEarningsData.values
  labels_net = netEarningsData.labels
 

  // console.log(' before arraylengths',  values_net)


  if(Array.isArray(values_net)){
    labels_net = consistentArrayLengths(labels_net, values_net)[0]
    values_net = consistentArrayLengths(labels_net, values_net)[1]
  }
 
  if(Array.isArray(values_unemp)){
  values_unemp = consistentArrayLengths(labels_unemp, values_net)[0]
  labels_unemp = consistentArrayLengths(labels_unemp, values_net)[1]
  }


  if(values_vac=== null){
    fetchError_vac=true 
  }else{
    fetchError_vac=false
  }


  if(Array.isArray(values_vac)){
    if(!fetchError_vac){
  values_vac = consistentArrayLengths(labels_vac, values_vac)[0]
  labels_vac = consistentArrayLengths(labels_vac, values_vac)[1]
  }
}






  function returnQuarterFromMouseX(mouseX: number) {
    let quarterXDistance = chartDimensions.dataPoints.centerToCenter / 4;
    let closestQuarter = Math.floor(mouseX / quarterXDistance) % 4;
    if (closestQuarter === 0) {
      closestQuarter = 4;
    }
    let closestYear = returnYearFromMouseX(mouseX);

    if (mouseX < 50) {
      closestQuarter = 1;
    }
    if (mouseX > 700) {
      closestQuarter = 4;
    }

    let yearQuarter = `${closestYear}-Q${closestQuarter}`;

    return yearQuarter;
  }

  function returnYearFromMouseX(mouseX: number) {
    let yearOutput;
    let yearXDistance = chartDimensions.dataPoints.centerToCenter;
    let yearXStart = 50;

    yearOutput = Math.floor((mouseX - yearXStart) / yearXDistance + 2005);
    if (yearOutput < 2005) {
      yearOutput = 2005;
    }
    if (yearOutput > 2020) {
      yearOutput = 2020;
    }
    return yearOutput;
  }


  yearHovered = returnYearFromMouseX(mouseX)
  yearQuarterHovered = returnQuarterFromMouseX(mouseX)


  function hoverValueFromAnnualData(labelsArray:Array<any>, valuesArray: Array<any>){
      const indexPoz = labelsArray.indexOf(yearHovered) 
      return valuesArray[indexPoz]
      // return valuesArray[1]
      // return yearHovered
  }

  if(Array.isArray(values_net)){
    hoverValue_net  = hoverValueFromAnnualData(labels_net, values_net)
  }else{
    // hoverValue_net= 'No Data'
    hoverValue_net= 0

  }

  // function returnFinalHoverValue(hoverValue){



  // }

  

  // console.log(values_net[1])






  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={1}>Hover Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Period</td>
            <td>Value</td>
          </tr>
          <tr>
            <th colSpan={2}>Earnings</th>
          </tr>
          <tr>
            {/* net earnings row  */}
            <td>{yearHovered}</td>
            <td>{hoverValue_net}</td>
          </tr>
          <tr>
            <th colSpan={2}>Unemployment</th>
          </tr>
          <tr>
            {/* unemp row */}
            <td>{yearQuarterHovered}</td>
            <td>unemp val</td>
          </tr>
          <tr>
            <th colSpan={2}>Vacancy Rate</th>
          </tr>
          <tr>
            {/* vacancies row  */}
            <td>{yearHovered}</td>
            <td>{!fetchError_vac?hoverValue_vac:'No Data'}</td>
          </tr>
          <HoverTableRow
          mouseX = {mouseX}
          fetchError = {fetchError_net}
          values = {values_net}
          labels ={labels_net}
          isQuarterly = {false}          
          />
        </tbody>
      </table>
    </>
  );
};

export default HoverTable;
