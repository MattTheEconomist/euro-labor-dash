import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import data from "../dataSources/countryCodes.json";
import {
  getKeyByValue,
  generateFetchURL_net,
} from "../services/URLgenerationFunctions";
import Earnings from './Earnings'


const DashContainer: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Euro area");
  const [unemploymentData, setUnemploymentData] = useState({});
  const [netEarningsData, setNetEarningsData] = useState({});

  let countryData = data[0];

  function fetchData() {
    // const fetchURL_unemployment: string = generateFetchURL_unemployemnt(selectedCountry);

    const fetchURL_net: string = generateFetchURL_net(selectedCountry);

    // fetch(fetchURL_unemployment)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setUnemploymentData(res);
    //     console.log(unemploymentData);
    //   })
    //   .catch((error) => setUnemploymentData({ status: "error", error }));

    fetch(fetchURL_net)
      .then((res) => res.json())
      .then((res) => setNetEarningsData(returnLabelsAndValues(res)))
      .catch((error) => setNetEarningsData({ status: "error", error }))
      .then(() => console.log(netEarningsData));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCountry]);

  function changeCountry(newCountry: string): void {
    setSelectedCountry(newCountry);
  }

  function returnLabelsAndValues(obj: any): any | null {
    interface rez {
      labels?: any | undefined;
      values?: any | undefined;
      seriesName?: any | undefined;
    }

    let rez = {
      labels: null,
      values: null,
      seriesName: null,
    };

    if (Object.keys(obj).length < 3) {
      return rez;
    }

    rez["labels"] = obj.series.docs[0].period;
    rez["values"] = obj.series.docs[0].value;
    rez["seriesName"] = obj.series.docs[0].series_name;

    return rez;
  }

  return (
    <>
      <div>
        <ControlPanel
          changeCountry={changeCountry}
          defaultCountry="Euro area"
        />
      </div>

      <div>{JSON.stringify(netEarningsData)}</div>

      <div>
        <Earnings netEarningsData={netEarningsData} selectedCountry={selectedCountry}/>
        </div>
    </>
  );
};

export default DashContainer;
