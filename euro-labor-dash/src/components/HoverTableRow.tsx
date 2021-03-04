import React from "react";
import { chartDimensions, consistentArrayLengths } from "../services/graphUtilityFunctions";

interface HoverTableRowProps{
mouseX: number; 
values: Array<any>; 
labels: Array<any>;
fetchError: boolean; 
isQuarterly: boolean; 

}


const HoverTableRow: React.FC<HoverTableRowProps> = ({
    mouseX, 
    values, 
    labels, 
    fetchError, 
    isQuarterly

  }) => {

    console.log("fetchError in Child", fetchError)

    let yearHovered: number; 
    let yearQuarterHovered: string; 
    let finalYearOutput: string; 


    if(!fetchError){
      labels= consistentArrayLengths(labels, values)[0]
      values = consistentArrayLengths(labels, values)[1]
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
        // if (yearOutput ===0){
        //     yearOutput = 2005
        // }
        return yearOutput;
      }



      yearHovered = returnYearFromMouseX(mouseX)

      
      // yearQuarterHovered = returnQuarterFromMouseX(mouseX)

      console.log( ' error in row component', fetchError)

      function hoverValueFromAnnualData(labelsArray:Array<any>, valuesArray: Array<any>){
        if(fetchError){
          return "No Data"
        }
        else{

          const indexPoz = labelsArray.indexOf(yearHovered) 
          const valueOutput = valuesArray[indexPoz]

          if (valueOutput ===0|| valueOutput===undefined){

            return "No Data"
          }else{
            return valueOutput
          }
        }

    }

    let valueHovered = isQuarterly? 'placeholder for quarterly ':hoverValueFromAnnualData(labels, values)


      // let finalValueOutput = fetchError? 'No Data': valueHovered
      let finalValueOutput = valueHovered

      finalYearOutput = isQuarterly? returnQuarterFromMouseX(mouseX):`${returnYearFromMouseX(mouseX) }`



    return   <tr>
    <td>{finalYearOutput}</td>
    <td>{finalValueOutput}</td>
  </tr>
    

  }


  export default HoverTableRow