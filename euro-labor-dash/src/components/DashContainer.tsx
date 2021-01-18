import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import {
  generateFetchURL_net,
  // generateFetchURL_gross,
  generateFetchURL_vacancies,
} from "../services/URLgenerationFunctions";
import Earnings from "./Earnings";
import Vacancies from "./Vacancies"


const DashContainer: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Euro area");
  // const [grossEarningsData, setGrossEarningsData] = useState({
  //   data: {},
  //   isFetching: false,
  //   status: "",

  // });
  const [netEarningsData, setNetEarningsData] = useState({
    data: {},
    isFetching: false,
    status: "",
  });
  const [vacancyData, setVacancyData] = useState({
    data:{}, 
    isFetching: false,
    status: "",
  })




  function fetchData() {
    // const fetchURL_gross: string = generateFetchURL_gross(selectedCountry);
    const fetchURL_net: string = generateFetchURL_net(selectedCountry);

    netEarningsData.isFetching=true

    fetch(fetchURL_net)
      .then((res) => res.json())
      .then((res) =>
        setNetEarningsData({
          data: returnLabelsAndValues(res),
          isFetching: false,
          status: "",

        })
      )
      .catch((error: string) =>
        setNetEarningsData({ data: {}, isFetching: false, status: error, })
      );

  }

function fetchData_vacancies(){

  const fetchURL_vac: string = generateFetchURL_vacancies(selectedCountry);

  netEarningsData.isFetching=true

  fetch(fetchURL_vac)
    .then((res) => res.json())
    .then((res) =>
        setVacancyData({
        data: returnLabelsAndValues(res),
        isFetching: false,
        status: "",

      })
    )
    .catch((error: string) =>
       setVacancyData({ data: {}, isFetching: false, status: error, })
    );

}

  useEffect(() => {
    fetchData();
    fetchData_vacancies();
  }, []);

  useEffect(() => {
    fetchData();
    fetchData_vacancies();
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
          // defaultCountry="Romania"
        />
      </div>
      <div>
        <Vacancies 
        selectedCountry={selectedCountry}
        vacancyData = {vacancyData.data}
        isFetching = {vacancyData.isFetching}
        

        />
      </div>

      <div>
        <Earnings
          netEarningsData={netEarningsData.data}
          selectedCountry={selectedCountry}
          isFetching={netEarningsData.isFetching}

        />
      </div>
    </>
  );
};

export default DashContainer;

//   interface PropsWithChildren<netEarningsData>{
//     labels: any | undefined;
//     values?: any | undefined;
//     seriesName?: any | undefined;
// }
// interface intrinsicAttributes{
//   netEarningsData: {lables: any, values: any }
// }

// interface netEarningsData{
//   labels: any | undefined;
//   values?: any | undefined;
//   seriesName?: any | undefined;
// }
