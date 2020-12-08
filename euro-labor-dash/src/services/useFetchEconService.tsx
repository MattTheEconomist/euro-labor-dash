import React, { useState, useEffect } from "react";
import data from "../dataSources/countryCodes.json";
import { Service } from "../types/Service";
// import {EconResponse}  from 'C:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/types/EconResponse'

let countryData = data[0];

function getKeyByValue(object: any, value: string) {
  return Object.keys(object).find((key) => object[key] === value);
}

function generateFetchURL_unemployemnt(selectedCountry: string) {
  let countryCode = getKeyByValue(countryData, selectedCountry);

  // if (!countryCode) {
  //   countryCode = "EA19";
  // }

  let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/une_rt_q/Q.SA.Y20-64.PC_ACT.T.${countryCode}?observations=True`;

  return fetchURL;
}

export interface EconResponses {
  // results: {dataset: any },
  dataset: any;
  provider: any;
  series: any;
  _meta: any;
}

const useFetchEconService = (selectedCountry: string) => {
  const [result, setResult] = useState<Service<EconResponses>>({
    status: "loading",
  });

  useEffect(() => {
    const fetchURL = generateFetchURL_unemployemnt(selectedCountry);

    let countryCode = getKeyByValue(countryData, selectedCountry);

    if(countryCode){
      fetch(fetchURL)
      .then((res) => res.json())
      .then((response) => setResult({ status: "loaded", payload: response }))
      .catch((error) => setResult({ status: "error", error }));

    }



    // console.log(!countryCode);
  // }, []);
  }, [selectedCountry]);

  return result;
};

export default useFetchEconService;
// export default fetchEconService
