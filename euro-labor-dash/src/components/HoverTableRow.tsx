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

    let yearHovered: number; 
    let yearQuarterHovered: string; 
    let finalYearValue: string; 

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
      yearQuarterHovered = returnQuarterFromMouseX(mouseX)


      finalYearValue = isQuarterly? yearQuarterHovered:`${yearHovered }`



    return   <tr>
    {/* vacancies row  */}
    <td>{yearHovered}</td>
    {/* <td>{mouseX}</td> */}
    <td>{0}</td>
  </tr>
    

  }


  export default HoverTableRow