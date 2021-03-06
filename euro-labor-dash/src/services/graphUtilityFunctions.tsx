import { scaleLinear, max, min, mean } from "d3";
// import { isLabeledStatement } from "typescript";

export function generateYAxisFull(ar: Array<number>) {
  const yAxisValues = generateYaxisValues(ar);

  if(yAxisValues===undefined){

    return null
  }

  const yAxisText = yAxisValues.map((el) => (
    <text
      key={`yaxis ${el}`}
      x={5}
      // y={chartDimensions.chartAreaHeight - yScale_imported(yAxisValues, el)- chartDimensions.margin.bottom-10 }
      y={yScale_imported(yAxisValues, el) }
    >
      {el}
    </text>
  ));

  const yAxisLine = (
    <line
      id="xAxis_unemp"
      x1={chartDimensions.margin.left}
      y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      x2={chartDimensions.margin.left}
      y2={chartDimensions.margin.top}
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


   let xAxisValues = generateXaxisValues(labels);

  const xAxisText = xAxisValues.map((el, ind) => (
    <text
      key={`xAxis ${el} ${Math.random()}`}
      x={xScaleAnnual(ind)}
      y={chartDimensions.chartAreaHeight - chartDimensions.margin.bottom}
      fontSize="small"
    >
      {el}
    </text>
  ));

  const xAxisLine = (
    <line
      id={`xAxisLine`}
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
  if(Array.isArray(ar)){

      const point1 = min(ar);
  const point5 = max(ar);
  const point3 = mean([point1, point5]);
  const point2 = mean([point1, point3]);
  const point4 = mean([point5, point3]);
  let rez = [point5, point4, point3, point2, point1];

  // return rez

  return rez.map((el: any) => parseFloat(el.toFixed(2)));
  // return rez.map((el: any) => el.toFixed(2));
  }

}

export function generateXaxisValues(labels: Array<any>) {
  const isQuarterly = String(labels[1]) === String(labels[0])

  if (isQuarterly) {
    return labels
      .filter((el: any, ind: number) => ind % 4 === 0)
      // .map((el: any) => el.getFullYear());
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
      chartDimensions.margin.bottom + 35,
      chartDimensions.chartAreaHeight - chartDimensions.margin.top -40,
    ]);

  const preScaled = currentScale( currentValue)

  const scaledWithMargins = chartDimensions.chartHeightInner -preScaled - chartDimensions.margin.bottom

  return scaledWithMargins;
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

  const isQuarterly = String(labels[1]).length > 5;
  let years = labels 
  if(isQuarterly){
    years = labels.map(el=>el.split("-")[0])
  }
   years = years.map((year: any) => parseInt(year))


 if(min(years) < 2005 ){
  //  return 5
   let elementsToSlice = 2005 - min(years);

   if(isQuarterly){
     elementsToSlice=elementsToSlice*4
   }
   years = years.slice(elementsToSlice)
   values= values.slice(elementsToSlice)
  }

  if(years.length !== values.length){
    const lengthDiff = values.length-years.length
    values = values.slice(lengthDiff)
  }

  if(min(years) > 2005){
    const minYear = min(years);
    const elementsToAdd: number = minYear - 2005;

    for (let i = 0; i < elementsToAdd; i++) {
      years.unshift(years[0] - 1);
      values.unshift(0);
    }

    values = values.slice(elementsToAdd);
  }

  return [years, values]
}

export function generateGraphTitle(seriesName :string, selectedCountry:string){

  return <text
  x={chartDimensions.title.titleX}
  y={chartDimensions.title.titleY}
  
  >{`${selectedCountry} ${seriesName}`}</text>
}

export function missingDataMessage(seriesName :string, selectedCountry:string){
return (
  <>
<text className="missingDataMessage"
    x={chartDimensions.title.titleX-30}
    y={chartDimensions.chartAreaHeight/2}
    >{`No ${seriesName} data for ${selectedCountry}`}
    </text>


     <line 
       id={`xAxisLine`}
       x1={chartDimensions.margin.left}
       y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
       x2={chartDimensions.chartAreaWidth - chartDimensions.margin.right}
       y2={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
       stroke="black"
     />

<line
      id="xAxis_unemp"
      x1={chartDimensions.margin.left}
      y1={chartDimensions.chartHeightInner - chartDimensions.margin.bottom}
      x2={chartDimensions.margin.left}
      y2={chartDimensions.margin.top}
      stroke="black"
    />

    </>
)
  

}




export const chartDimensions = {
  chartAreaHeight: 250,
  chartAreaWidth: 700,
  margin: { top: 10, right: 10, bottom: 0, left: 50, axisTop: 10 },
  dataPoints: { centerToCenter: 40, barWidth: 12 },
  chartHeightInner: 230, 
  upwardAdjust:50, 
  title:{titleX: 320, titleY: 20}


};