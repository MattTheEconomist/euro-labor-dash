// import React from "react";
import data from "../dataSources/countryCodes.json";


let countryData = data[0];

export function getKeyByValue(object: any, value: string) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function generateFetchURL_unemployemnt(selectedCountry: string) {
  let countryCode = getKeyByValue(countryData, selectedCountry);

  let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/une_rt_q/Q.SA.Y20-64.PC_ACT.T.${countryCode}?observations=True`;

  return fetchURL;
}


export function generateFetchURL_vacancies(selectedCountry: string) {
  let countryCode = getKeyByValue(countryData, selectedCountry);

  let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/tps00172/Q.NSA.B-S.TOTAL.JOBRATE.${countryCode}?observations=True`;

  return fetchURL;
}


export function generateFetchURL_gross(selectedCountry: string) {
let countryCode = getKeyByValue(countryData, selectedCountry);



// let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.EUR.GRS.A1_80.li?observations=True`;
let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.EUR.GRS.A1_80.${countryCode}?observations=True`;
return fetchURL;
}

export function generateFetchURL_net(selectedCountry: string) {
  let countryCode = getKeyByValue(countryData, selectedCountry);

  // let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.PPS.GRS.A1_80.${countryCode}?observations=True`;
  let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_netft/A.VAL_A.PPS.${countryCode}?observations=true`;

 

  return fetchURL;
}





