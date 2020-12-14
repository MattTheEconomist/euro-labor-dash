import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";
import { create } from "domain";

interface BarProps {
  x: number;
  y: number;
  barWidth: number;
  barHeight: number;
  yValue: number;
}

const Bar: React.FC<BarProps> = ({ x, y, barWidth, barHeight, yValue }) => {
  return (
    <svg>
      {/* <g> */}
        {/* <rect x={x} y={y} width={barWidth} height={barHeight} fill="black"/> */}
        {/* <rect x={x} y={y} width={10} height={10} fill="black"/> */}
        <rect x={10} y={10} width={10} height={10} fill="black">
          {" "}
        </rect>
      {/* </g> */}
    </svg>
  );
};

//  function min<T, U extends Numeric>(array: Iterable<T>, accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null): U | undefined;

interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  netEarningsData: any;
  isFetching: boolean;
}

const Earnings: React.FC<EarningsProps> = ({
  netEarningsData,
  selectedCountry,
  isFetching,
}) => {
  const barAreaHeight = 500;
  const barAreaWidth = 500;
  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const barChartHeight = barAreaHeight - margin.top - margin.bottom;

  const barDimensions = {
    barWidth: 7.8,
    barSideMargin: 0.2,
    centerToCenter: 8,
    labelMarginTop: 2,
  };

  let labels: Array<Number> = [];
  let values: Array<Number> = [];
  let dataNet = {};
  let bars;

  //   netEarningsData.data

  useEffect(() => {
    if (!isFetching) {
      createGraph();
    }
  }, [isFetching]);

  function createGraph() {
    labels = netEarningsData.labels.map((year: string) => parseInt(year));
    // netEarningsData.labels = netEarningsData.labels.map((year: string) => parseInt(year));
    values = netEarningsData.values;

    const xScale = scaleLinear()
      .domain([min(labels) as number, max(labels) as number])
      .range([0, barAreaWidth]);

    const yScale = scaleLinear()
      .domain([min(values) as number, max(values) as number])
      .range([barAreaHeight, 0]);

    netEarningsData.lables = labels;

    bars = Object.keys(netEarningsData).map((row: any, ind: any) => {
      <Bar
        key={ind}
        x={ind * barDimensions.centerToCenter}
        y={0}
        barWidth={barDimensions.barWidth}
        barHeight={(barChartHeight - yScale(row.values)) / 2}
        yValue={row.values}
      />;
    });

    // console.log(netEarningsData)
  }

  return (
    <>
      <div>{JSON.stringify(netEarningsData)}</div>;<g>{bars}</g>
    </>
  );
};

export default Earnings;
