import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, select } from "d3";

// move to another folder?
function Bar() {
  return null;
}

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
//   const[lables, setLables] = useState([])

  let lables :any = []

  useEffect(() => {
    if (!isFetching) {
      console.log(netEarningsData);
      lables = netEarningsData.labels.map((year: string) =>
        parseInt(year)
    //   setLables( netEarningsData.labels.map((year: string) =>
    //     parseInt(year))
      );

      console.log(lables);
    }
  }, [isFetching]);




  const barAreaHeight = 500;

  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  const barChartHeight = barAreaHeight - margin.top - margin.bottom;

  //   const labels = []

  //   if (typeof netEarningsData.lables !== 'undefined') {
  //   if ( netEarningsData !== {}) {

  return <div>{JSON.stringify(netEarningsData)}</div>;
  //   return children as ReactElement<any>;
};

export default Earnings;
