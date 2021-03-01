import React, { useEffect, useState } from "react";
import Dotz from "../components/graphComponents/Dotz";
import Linez from "../components/graphComponents/Line";

import {
  chartDimensions,
  yScale_imported,
  xScaleAnnual,
  generateYAxisFull,
  generateXaxisFull,
  consistentArrayLengths,
} from "../services/graphUtilityFunctions";

interface UnemploymentProps {
  selectedCountry?: string;
  unemploymentData: any;
  isFetching: boolean;
}

const Unemployment: React.FC<UnemploymentProps> = ({
  unemploymentData: unemploymentData,
  isFetching,
}) => {
  let labels: Array<any> | any = [1, 2, 3];
  let values_unemp: Array<number> = [];
  let yAxis: any;
  let xAxis: any;
  let xAxisLine: any;
  let lineComponent: any;
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
  

  if(Array.isArray(values_unemp)) {

labels = consistentArrayLengths(labels, values_unemp)[0]
values_unemp = consistentArrayLengths(labels, values_unemp)[1]
  }

  if (Array.isArray(values_unemp)) {


    values_unempScaled = values_unemp.map((el) =>
      yScale_imported(values_unemp, el)
    );
    const labelsScaled = values_unemp.map((el, ind) => xScaleAnnual(ind));


    yAxis = generateYAxisFull(values_unempScaled);
    xAxis = generateXaxisFull(labels);

    lineComponent = (
      <Linez valuesScaled={values_unempScaled} labelsScaled={labelsScaled} />
    );

    dots = (
      <Dotz
        valuesRaw={values_unemp}
        valuesScaled={values_unempScaled}
        labels={labels}
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
