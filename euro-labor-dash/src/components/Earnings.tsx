import React, { useEffect } from "react";
import { scaleLinear, max, select } from "d3";

// move to another folder?
function Bar() {
  return null;
}

interface EarningsProps {
  children?: any;
  selectedCountry?: string;
  netEarningsData: any;
}

const Earnings: React.FC<EarningsProps> = ({
  netEarningsData,
  selectedCountry,
}) => {
  console.log(selectedCountry);

  const barAreaHeight = 500;

  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const barChartHeight = barAreaHeight - margin.top - margin.bottom;

  if (netEarningsData) {
    const lables = netEarningsData.labels;
    console.log(lables);
  }

  return <div>{JSON.stringify(netEarningsData)}</div>;
  //   return children as ReactElement<any>;
};

export default Earnings;
