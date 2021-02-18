import React, { useEffect, useState } from "react";
import Dotz from "../components/graphComponents/Dotz";
import Linez from "../components/graphComponents/Line";
import { scaleLinear, max, min, line, mean, select } from "d3";

import {
  generateYaxisValues,
  chartDimensions,
  yScale_imported,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
} from "../services/graphUtilityFunctions";

interface UnemploymentProps {
  selectedCountry?: string;
  unemploymentData: any;
  isFetching: boolean;
}

const Unemployment: React.FC<UnemploymentProps> = ({
  unemploymentData: unemploymentData,
  selectedCountry,
  isFetching,
}) => {
  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yAxis: any;
  let yAxisValues: Array<number> = [];
  let xAxis: any;
  let xAxisLine: any;
  let lineComponent: any;
  // let values_unempScaled: Array<any> = [1, 2, 3];
  let values_unempScaled: any;
  let dots: any;

  const useMousePoz = () => {
    const [mousePoz, setMousePoz] = useState({ mouseX: 0, mouseY: 0 });

    const updateMousePoz = (ev: any) => {
      setMousePoz({ mouseX: ev.clientX, mouseY: ev.clientY });
    };

    useEffect(() => {
      window.addEventListener("mousemove", updateMousePoz);

      return () => window.removeEventListener("mousemove", updateMousePoz);
    }, []);
    return mousePoz;
  };

  const { mouseX, mouseY } = useMousePoz();

  labels = unemploymentData.labels;
  values_unemp = unemploymentData.values;

  if (Array.isArray(values_unemp) && Array.isArray(labels)) {
    const elementsToSlice = values_unemp.length - labels.length;
    values_unemp = values_unemp.slice(elementsToSlice);
  }

  if (Array.isArray(values_unemp)) {
    // values_unempScaled = values_unemp.map((el) => yScale(el));
    values_unempScaled = values_unemp.map((el) =>
      yScale_imported(values_unemp, el)
    );
    const labelsScaled = values_unemp.map((el, ind) => xScaleAnnual(ind));

    yAxisValues = generateYaxisValues(values_unemp);

    yAxis = generateYAxisFull(values_unempScaled);
    xAxis = generateXaxisFull(labels);



    lineComponent = (
      <Linez
        // values_unempScaled={values_unempScaled.values_unempScaled}
        // values_unempScaled={values_unempScaled}
        valuesScaled={values_unempScaled}
        labelsScaled={labelsScaled}
      />
    );

    dots = (
      <Dotz
        valuesRaw={values_unemp}
        valuesScaled={values_unempScaled}
        labels={labels}
        // centerToCenter={chartDimensions.dataPoints.centerToCenter / 4}
        // marginLeft={chartDimensions.margin.left + chartDimensions.margin.right}
        mouseX={mouseX}
        mouseY={mouseY}
        isFetching={isFetching}
      />
    );
  }

  return (
    <>
      {/* <div>{JSON.stringify(unemploymentData)}</div> */}

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg
          width={chartDimensions.chartAreaWidth}
          height={chartDimensions.chartAreaHeight}
        >
          {dots}
          {lineComponent}
          {yAxis}
          {xAxis}
          {xAxisLine}
        </svg>
      </div>
    </>
  );
};

export default Unemployment;
