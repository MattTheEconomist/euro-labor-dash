import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import data from "../dataSources/countryCodes.json";
import { Service } from "../types/Service";
// import { EconResponse } from "../types/EconResponse";
import useFetchEconService from "../services/useFetchEconService";

const DashContainer: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Euro area");
  const [unemploymentData, setUnemploymentData] = useState({});
  const [loading, setLoading] = useState(true)

  const service = useFetchEconService(selectedCountry);

  console.log(service)

  
  







  // useEffect(()=>{
  //  if (service.status == "loaded") {
  //   setUnemploymentData(returnLabelsAndValues(service))
  //   console.log(unemploymentData)
  //   }

  //             },[])

  // useEffect(()=>{
  //   const service = useFetchEconService(selectedCountry);
  //   if (service.status == "loaded") {
  //         setUnemploymentData(returnLabelsAndValues(service))
  //         }

  // },[selectedCountry])

  //   useEffect(() => {
  //   setSelectedCountry("Euro area");

  //   if (service.status == "loaded") {
  //     setUnemploymentData(returnLabelsAndValues(service))
  //     }

  //     console.log(unemploymentData)

  // }, []);

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

    // if( String(obj.payload.series.docs[0].period)=='undefined'){return null}

    rez["labels"] = obj.payload.series.docs[0].period;
    rez["values"] = obj.payload.series.docs[0].value;
    rez["seriesName"] = obj.payload.series.docs[0].series_name;

    return rez;
  }


 

  // useEffect(() => {
  //   if (service.status == "loaded") {
  //     setUnemploymentData(returnLabelsAndValues(service));
  //   }

  //   console.log(unemploymentData);
  // }, [selectedCountry]);

  // if (service.status == "loaded") {
  // setUnemploymentData(returnLabelsAndValues(service));
  // console.log(unemploymentData);
  // }

  // useEffect(() => {
  //   const service = useFetchEconService(selectedCountry);

  // }, [selectedCountry]);

  // useEffect(() => {

  //   const service = fetchEconService(selectedCountry)

  //   if (service.status == "loaded") {
  //     setUnemploymentData(returnLabelsAndValues(service));
  //     console.log(unemploymentData);
  //   }
  // }, []);

  return (
    <>
      <div>
        <ControlPanel
          changeCountry={changeCountry}
          defaultCountry="Euro area"
        />
      </div>

      {/* <UnemploymentGraph /> */}

      <div></div>
    </>
  );
};

export default DashContainer;

// const [unemploymentURL, setUnemploymentURL] = useState<string>("");
// const[unemployemnetSeries, setUnemploymentSeries] = useState ([])
// const [vacanciesURL, setVacanciesURL] = useState<string>("");
// const [netEarningsURL, setNetEarningsURL] = useState<string>("");
// const [grossEarningsURL, setGrossEarningsURL] = useState<string>("");

// useEffect(()=>{
//   // export default selectedCountry
//   // export default selectedCountry
// }, [selectedCountry])
// export default selectedCountry

// let countryData = data[0];

// function getKeyByValue(object: any, value: string) {
//   return Object.keys(object).find((key) => object[key] === value);
// }

// function generateFetchURL_unemployemnt(selectedCountry: string) {
//   let countryCode = getKeyByValue(countryData, selectedCountry);

//   let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/une_rt_q/Q.SA.Y20-64.PC_ACT.T.${countryCode}?observations=True`;

//   return fetchURL;
// }

// function generateFetchURL_vacancies(selectedCountry: string) {
//   let countryCode = getKeyByValue(countryData, selectedCountry);

//   let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/tps00172/Q.NSA.B-S.TOTAL.JOBRATE.${countryCode}?observations=True`;

//   return fetchURL;
// }

// function generateFetchURL_net_earnings(selectedCountry: string) {
//   let countryCode = getKeyByValue(countryData, selectedCountry);

//   let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.EUR.GRS.A1_80.${countryCode}?observations=True`;

//   return fetchURL;
// }

// function generateFetchURL_gross_earnings(selectedCountry: string) {
//   let countryCode = getKeyByValue(countryData, selectedCountry);

//   let fetchURL = `https://api.db.nomics.world/v22/series/Eurostat/earn_nt_net/A.PPS.GRS.A1_80.${countryCode}?observations=True`;

//   return fetchURL;
// }

// useEffect(() => {
//   setUnemploymentURL(generateFetchURL_unemployemnt(selectedCountry));
// setVacanciesURL(generateFetchURL_vacancies(selectedCountry));
// setNetEarningsURL(generateFetchURL_net_earnings(selectedCountry));
// setGrossEarningsURL(generateFetchURL_gross_earnings(selectedCountry));
// fetchUnemploymentData(unemploymentURL)
// }, [selectedCountry]);

// useEffect(()=>{

//   function fetchUnemploymentData(unemploymentURL : string){
//     fetch(unemploymentURL)
//     .then(rez=>rez.json())
//     // .then(data=>setUnemploymentSeries(data))
//     .then(data=>console.log(data))
//     // .then(()=> setUnemploymentSeries(unemployemnetSeries.dataset.series.docs[0].value))
//     // .then(()=>console.log(unemployemnetSeries))
//     .catch(err=>{console.log(err)})

//       }

//   fetchUnemploymentData(unemploymentURL)
// }, [unemploymentURL])

// let dataOutput = service
