import React, { useEffect } from "react";
import {
  chartDimensions,
  consistentArrayLengths,
} from "../services/graphUtilityFunctions";

interface HoverTableRowProps {
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
  isQuarterly,
}) => {
  let yearHovered: number;
  let yearQuarterHovered: string;
  let finalYearOutput: string;

  if (!fetchError && values !== undefined && values !== null) {
    // if ( values!==null ) {
    labels = consistentArrayLengths(labels, values)[0];
    values = consistentArrayLengths(labels, values)[1];
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
    if (mouseX > 690) {
      closestQuarter = 4;
    }

    let yearQuarter = `${closestYear}-Q${closestQuarter}`;

    return yearQuarter;
  }

  function returnYearFromMouseX(mouseX: number) {
    let yearOutput: number;
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

  yearHovered = returnYearFromMouseX(mouseX);

  function hoverValueFromAnnualData(
    labelsArray: Array<any>,
    valuesArray: Array<any>
  ) {
    if (fetchError || values === undefined) {
      return "No Data";
    } else {
      const indexPoz = labelsArray.indexOf(yearHovered);
      const valueOutput = valuesArray[indexPoz];

      if (valueOutput === 0 || valueOutput === undefined) {
        return "No Data";
      } else {
        return valueOutput;
      }
    }
  }

  function hoverValueFromQuarterlyData(
    mouseX: number,
    valuesArray: Array<any>
  ) {
    if (fetchError || values === undefined || values === null) {
      return "No Data";
    }

    valuesArray = consistentArrayLengths(labels, values)[1];

    // console.log("values in hover component", valuesArray)
    // console.log("labels in hover component", labels)

    let quarterXDistance = chartDimensions.dataPoints.centerToCenter / 4;
    let mouseQuarters = Math.floor(mouseX / quarterXDistance);

    mouseQuarters -= 5;

    if (mouseQuarters < 0) {
      mouseQuarters = 0;
    }

    if (mouseQuarters > 61) {
      // last element of values array
      return valuesArray.slice(-1)[0];
    }

    const valueOutput = valuesArray[mouseQuarters];

    return valueOutput;
  }

  function formatFinalValue(valueOutput: any) {
    if (valueOutput === "No Data") {
      return valueOutput;
    } else {
      valueOutput = parseFloat(valueOutput);
    }

    // console.log(valueOutput)

    if (valueOutput > 1000) {
      return (valueOutput / 1000).toFixed(2);
    } else {
      return valueOutput.toFixed(2);
    }
  }

  let valueHovered = isQuarterly
    ? hoverValueFromQuarterlyData(mouseX, values)
    : hoverValueFromAnnualData(labels, values);

  let finalValueOutput = formatFinalValue(valueHovered);

  finalYearOutput = isQuarterly
    ? returnQuarterFromMouseX(mouseX)
    : `${returnYearFromMouseX(mouseX)}`;

  return (
    <tr>
      <td className="tableCell">{finalYearOutput}</td>
      <td
        className={
          finalValueOutput === "No Data" ? "tableCell noData" : "tableCell"
        }
      >
        {finalValueOutput}
      </td>
    </tr>
  );
};

export default HoverTableRow;
