import { scaleLinear, max, min, mean } from "d3";
import { isLabeledStatement } from "typescript";

export function generateYAxisFull(ar: Array<number>) {
  const yAxisValues = generateYaxisValues(ar);

  const yAxisText = yAxisValues.map((el) => (
    <text
      key={`yaxis ${el}`}
      x={5}
      y={chartDimensions.chartAreaHeight - yScale_imported(yAxisValues, el)}
    >
      {el}
    </text>
  ));

  const yAxisLine = (
    <line
      id="xAxis_unemp"
      x1={chartDimensions.margin.left}
      y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      // y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      x2={chartDimensions.margin.left}
      y2={chartDimensions.margin.top}
      // y2={chartDimensions.margin.axisTop}
      stroke="black"
    />
  );

  return (
    <svg>
      {yAxisText}
      {yAxisLine}
    </svg>
  );
}

export function generateXaxisFull(labels: Array<any>) {
  const isQuarterly = String(labels[1]).length > 5;
  if (isQuarterly) {
    labels = formatQuarterlyData(labels);
  }

  const xAxisValues = generateXaxisValues(labels);

  const xAxisText = xAxisValues.map((el, ind) => (
    <text
      key={`xAxis ${el}`}
      x={xScaleAnnual(ind)}
      y={chartDimensions.chartAreaHeight - chartDimensions.margin.bottom}
      fontSize="small"
    >
      {el}
    </text>
  ));

  const xAxisLine = (
    <line
      id="xAxis_unemp"
      x1={chartDimensions.margin.left}
      y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      x2={chartDimensions.chartAreaWidth - chartDimensions.margin.right}
      y2={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      stroke="black"
    />
  );

  return (
    <svg>
      {xAxisText}
      {xAxisLine}
    </svg>
  );
}

export function generateYaxisValues(ar: Array<number>) {
  const point1 = min(ar);
  const point5 = max(ar);
  const point3 = mean([point1, point5]);
  const point2 = mean([point1, point3]);
  const point4 = mean([point5, point3]);
  let rez = [point5, point4, point3, point2, point1];

  return rez.map((el: any) => parseFloat(el.toFixed(2)));
}

export function generateXaxisValues(labels: Array<any>) {
  const isQuarterly = String(labels[1]).length > 5;

  if (isQuarterly) {
    return labels
      .filter((el: any, ind: number) => ind % 4 === 0)
      .map((el: any) => el.getFullYear());
  } else {
    return labels.map((year: any) => parseInt(year));
  }
}

export function yScale_imported(
  allValues: Array<number>,
  currentValue: number
) {
  const currentScale = scaleLinear()
    .domain([min(allValues) as number, max(allValues) as number])
    .range([
      chartDimensions.margin.bottom + 50,
      chartDimensions.chartAreaHeight - chartDimensions.margin.top - 50,
    ]);

  return currentScale(currentValue);
}



export function xScaleAnnual(index: number) {
  return (
    index * chartDimensions.dataPoints.centerToCenter +
    chartDimensions.margin.left
  );
}

export function xScaleQuarterly(index: number) {

  return ((index *chartDimensions.dataPoints.centerToCenter)/4+ chartDimensions.margin.left)
  
}

export function formatQuarterlyData(ar: Array<any>) {
  ar = ar.filter((el) => parseInt(el.split("-")) >= 2005);
  ar = ar.map((el) => {
    const year = el.split("-")[0];
    const qtr = el.split("-")[1];
    const month = parseInt(qtr[1]) * 3;
    return new Date(`${year}-${month}-01`);
  });
  return ar;
}


export function consistentArrayLengths(labels: Array<any>, values:Array<any>){
  labels = labels.map((year: any) => parseInt(year))
  if(min(labels) < 2005 ){
    const elementsToSlice = 2005 - min(labels);
    labels = labels.slice(elementsToSlice)
    values= values.slice(elementsToSlice)
  }
  if(min(labels) > 2005){
    const minYear = min(labels);
    const elementsToAdd: number = minYear - 2005;

    for (let i = 0; i < elementsToAdd; i++) {
      labels.unshift(labels[0] - 1);
      values.unshift(0);
    }

    values = values.slice(elementsToAdd);
  }

  return [labels, values]
}


export const chartDimensions = {
  chartAreaHeight: 400,
  chartAreaWidth: 700,
  margin: { top: 50, right: 10, bottom: 10, left: 50, axisTop: 20 },
  dataPoints: { centerToCenter: 40, barWidth: 12 },
  chartHeightInner: 380,

};