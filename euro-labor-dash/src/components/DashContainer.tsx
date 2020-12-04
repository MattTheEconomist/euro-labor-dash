import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import data from "../dataSources/countryCodes.json";

const DashContainer: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Euro area");
  const [unemploymentURL, setUnemploymentURL] = useState<string>("")
  const [vacanciesURL, setVacanciesURL] = useState<string>("")
  const [netEarningsURL, setNetEarningsURL] = useState<string>("")
  const [grossEarningsURL, setGrossEarningsURL] = useState<string>("")


  let countryData = data[0];

  function changeCountry(newCountry: string): void {
    setSelectedCountry(newCountry);
  }

  function getKeyByValue(object: any, value: string) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function generateFetchURL_unemployemnt(selectedCountry: string) {
    let countryCode = getKeyByValue(countryData, selectedCountry);

    let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/une_rt_q/Q.SA.Y20-64.PC_ACT.T.${countryCode}?observations=True`;

    return fetchURL;
  }


  
  function generateFetchURL_vacancies(selectedCountry: string) {
    let countryCode = getKeyByValue(countryData, selectedCountry);

    let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/tps00172/Q.NSA.B-S.TOTAL.JOBRATE.${countryCode}?observations=True`;

    return fetchURL;
  }

    
  function generateFetchURL_net_earnings(selectedCountry: string) {
    let countryCode = getKeyByValue(countryData, selectedCountry);

    let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.EUR.GRS.A1_80.${countryCode}?observations=True`;

    return fetchURL;
  }


      
  function generateFetchURL_gross_earnings(selectedCountry: string) {
    let countryCode = getKeyByValue(countryData, selectedCountry);

    let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.PPS.GRS.A1_80.${countryCode}?observations=True`;

    return fetchURL;
  }





  useEffect(() => {
    setUnemploymentURL(generateFetchURL_unemployemnt(selectedCountry))
    setVacanciesURL(generateFetchURL_vacancies(selectedCountry))
    setNetEarningsURL( generateFetchURL_net_earnings(selectedCountry))
    setGrossEarningsURL(generateFetchURL_gross_earnings(selectedCountry))
  }, [selectedCountry]);

  

  return (
    <div>
      <ControlPanel changeCountry={changeCountry} defaultCountry="Euro area" />
    </div>
  );
};

export default DashContainer;
