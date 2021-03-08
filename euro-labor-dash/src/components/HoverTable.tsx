import React from "react";
import {
  chartDimensions,
  consistentArrayLengths,
  generateYaxisValues,
} from "../services/graphUtilityFunctions";
import HoverTableRow from "./HoverTableRow";

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
  let hoverValue_net: number = 0;
  let hoverValue_vac: number = 0;
  let fetchError_net: boolean = false;
  let fetchError_vac: boolean = false;
  let fetchError_unemp: boolean = false;


  values_vac = vacanciesData.values;
  labels_vac = vacanciesData.labels;

  values_unemp = unemploymentData.values;
  labels_unemp = unemploymentData.labels;

  values_net = netEarningsData.values;
  labels_net = netEarningsData.labels;

  // console.log('raw data', values_vac)
  // console.log('formatted values', generateYaxisValues(values_vac))


  if (!Array.isArray(values_vac)||values_vac===null) {
    fetchError_vac = true;
  } else {
    fetchError_vac = false;
  }


  return (
    <>
      <table id="fullHoverTable">
        <thead >
          <tr>
            <th colSpan={2} id="hoverTableTitle">Hover Data</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Period</td>
            <td>Value</td>
          </tr> */}
          <tr>
            <th colSpan={2}>Net Earnings (K) </th>
          </tr>

          {/* net earnings row  */}

          <HoverTableRow
          mouseX = {mouseX}
          fetchError = {fetchError_net}
          values = {values_net}
          labels ={labels_net}
          isQuarterly = {false}          
          />

          <tr>
            <th colSpan={2}>Unemployment Rate</th>
          </tr>
          {/* unemp row */}
          <HoverTableRow
            mouseX={mouseX}
            fetchError={fetchError_unemp}
            values={values_unemp}
            labels={labels_unemp}
            isQuarterly={true}
          />

          <tr>
            <th colSpan={2} id="vacancyTableTitle">Vacancy Rate</th>
          </tr>
          {/* vacancies row  */}
          <HoverTableRow
            mouseX={mouseX}
            fetchError={fetchError_vac}
            values={values_vac}
            labels={labels_vac}
            isQuarterly={false}
          />
        </tbody>
      </table>
    </>
  );
};

export default HoverTable;
