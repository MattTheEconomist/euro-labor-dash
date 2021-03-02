import React from "react";
import {chartDimensions} from "../services/graphUtilityFunctions"

interface HoverTableProps {
    selectedCountry: string;
    mouseX?: number;
    mouseY?: number; 
  }


const HoverTable: React.FC<HoverTableProps> = ({
    selectedCountry,
    mouseX,
    mouseY,
}) => {


    function returnYearFromMouseX(mouseX:number |undefined){

        let yearXDistance =  chartDimensions.dataPoints.centerToCenter
        let yearXStart = 50

        if (mouseX===undefined){
            return 0
        }else{


            
            return Math.floor(((mouseX-yearXStart)/yearXDistance)+2005)
        }



    }

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
          <td>{returnYearFromMouseX(mouseX)}</td>
          <td>earn val</td>
        </tr>
        <tr>
          <th colSpan={2}>Unemployment</th>
        </tr>
        <tr>
          <td>unemp per</td>
          <td>unemp val</td>
        </tr>
        <tr>
          <th colSpan={2}>Vacancy Rate</th>
        </tr>
        <tr>
          <td>vac per</td>
          <td>vac val</td>
        </tr>

      </tbody>
    </table>
    </>
  );
};

export default HoverTable;
