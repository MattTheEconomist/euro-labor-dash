import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";
import { create } from "domain";


const animateBars = (rectRef: any, y_net: number, barHeight_net: number) => {
  const rect = select(rectRef.current);


  rect

    .transition()
    .duration(1000)
    .attr("height", barHeight_net)
    .attr("y", y_net);
};

interface BarProps {
  x: number;
  // y_gross: number;
  y_net: number;
  barWidth: number;
  barHeight_net: number;
  // barHeight_gross: number;
  yValue: number;
  yearLabel: any;
  yearLableYPoz: number;
}

const Bar: React.FC<BarProps> = ({
  x,
  // y_gross,
  y_net,
  barWidth,
  barHeight_net,
  // barHeight_gross,
  yValue,
  yearLabel,
  yearLableYPoz,
}) => {
  // if (isNaN(y_gross)) {
  //   y_gross = 0;
  // }
  if (isNaN(y_net)) {
    y_net = 0;
  }

  const axisText: number = 125;
  const rectRef: any = React.createRef();

  useEffect(() => {
    animateBars(rectRef, y_net, barHeight_net);
  });


  return (
    <g>
      <rect
        ref={rectRef}
        x={x}
        width={barWidth}
        fill="black"
      />
      {/* <rect x={x} y={y_gross} width={barWidth} height={barHeight_gross} fill="blue"/> */}
      <text
        x={x}
        y={yearLableYPoz}
        // style={{transform:'rotate(1deg)'}}
      >
        {yearLabel}
      </text>
    </g>
  );
};

interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  grossEarningsData: any;
  netEarningsData: any;

  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  grossEarningsData: grossEarningsData,
  netEarningsData: netEarningsData,
  selectedCountry,
  isFetching,
}) => {
  const barAreaHeight = 400;
  const barAreaWidth = 700;
  const margin = { top: 10, right: 45, bottom: 30, left: 20 };
  const barChartHeight = barAreaHeight - margin.bottom;

  const barDimensions = {
    barWidth: 12,
    barSideMargin: 0.2,
    centerToCenter: 40,
    labelMarginTop: 2,
  };

  let labels: Array<any> = [];
  // let values_gross: Array<Number> = [];
  let values_net: Array<Number> = [1, 2, 3];
  let yScale_net: any;

  let bars: any = <rect></rect>;


  useEffect(()=>{
    console.log(isFetching)
  }, [isFetching])
  
  
    // console.log(netEarningsData)
    // values_gross = grossEarningsData.values;
    values_net = netEarningsData.values;
    if ( values_net !== undefined) {
    labels = netEarningsData.labels.map((year: any) => parseInt(year));

    }

    if (min(labels) < 2005 && values_net !== undefined) {
      const elementsToSlice = 2005 - min(labels);
      labels = labels.slice(elementsToSlice);
      // values_gross = values_gross.slice(elementsToSlice);
      values_net = values_net.slice(elementsToSlice);
    }

    // const yScale_gross = scaleLinear()
    //   .domain([min(values_gross) as number, max(values_gross) as number])
    //   .range([5, barChartHeight]);

    if (values_net !== undefined) {
      yScale_net = scaleLinear()
        .domain([min(values_net) as number, max(values_net) as number])
        .range([5, barChartHeight]);
    } else {
      //used as a placeholder when waiting for values to arrive

      yScale_net = scaleLinear().domain([0, 100]).range([5, barChartHeight]);
    }

    const xScale = scaleLinear()
      .domain([min(labels) as number, max(labels) as number])
      .range([0, barAreaWidth]);


      if (values_net !== undefined) {
     
    bars = values_net.map((row: any, ind: number) => (
      <Bar
        x={ind * barDimensions.centerToCenter + margin.right}
        // y={barAreaHeight}
        // y_gross={barChartHeight - yScale_gross(row) + margin.top}
        y_net={(values_net===undefined|| values_net.length ===0)? 0: barChartHeight - yScale_net(values_net[ind]) + margin.top}
        barWidth={barDimensions.barWidth}
        // barHeight_net = {yScale(values_net[ind])+220}
        barHeight_net={(values_net===undefined|| values_net.length ===0)? 0: yScale_net(values_net[ind])}
        // barHeight_gross={yScale_gross(row)}
        yValue={0}
        key={ind}
        yearLabel={labels[ind]}
        yearLableYPoz={barChartHeight + margin.bottom}
      />
    ))
    }



  return (
    <>
      <div>{JSON.stringify(netEarningsData)}</div>

      <div style={{ backgroundColor: "grey", height: 400, width: 700 }}>
        <svg width={barAreaWidth} height={barAreaHeight}>
          <line
            id="xAxis"
            x1={margin.left}
            y1={barChartHeight + margin.top}
            x2={barAreaWidth - margin.right}
            y2={barChartHeight + margin.top}
            stroke="black"
          />

          {bars}
        </svg>
      </div>
    </>
  );
};

export default Earnings;
