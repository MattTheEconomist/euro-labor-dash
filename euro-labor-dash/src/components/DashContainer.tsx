import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import {
  generateFetchURL_net,
  generateFetchURL_vacancies,
  generateFetchURL_unemployemnt,
} from "../services/URLgenerationFunctions";
import Earnings from "./Earnings";
import Unemployment from "./Unemployment";
import Vacancies from "./Vacancies";
// import HoverTable from "./HoverTable"
import HoverTable from "./HoverTable";
import {chartDimensions} from "../services/graphUtilityFunctions"

// import HoverTable from 'c:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/components/HoverTable'

const DashContainer: React.FC = () => {

  let mouseYear: number = 2005


  const [selectedCountry, setSelectedCountry] = useState<string>("Euro area");
  const [netEarningsData, setNetEarningsData] = useState({
    data: {},
    isFetching: false,
    status: "",
  });
  const [unemploymentData, setUnemploymentData] = useState({
    data: {},
    isFetching: false,
    status: "",
  });
  const [vacanciesData, setVacanciesData] = useState({
    data: {},
    isFetching: false,
    status: "",
  });

  function fetchData_net() {
    const fetchURL_net: string = generateFetchURL_net(selectedCountry);

    netEarningsData.isFetching = true;

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
        setNetEarningsData({ data: {}, isFetching: false, status: error })
      );
  }
  function fetchData_unemployemnt() {
    const fetchURL_unemployment: string = generateFetchURL_unemployemnt(
      selectedCountry
    );

    netEarningsData.isFetching = true;

    fetch(fetchURL_unemployment)
      .then((res) => res.json())
      .then((res) =>
        setUnemploymentData({
          data: returnLabelsAndValues(res),
          isFetching: false,
          status: "",
        })
      )
      .catch((error: string) =>
        setUnemploymentData({ data: {}, isFetching: false, status: error })
      );
  }

  function fetchData_vacancies() {
    const fetchURL_vac: string = generateFetchURL_vacancies(selectedCountry);

    netEarningsData.isFetching = true;

    fetch(fetchURL_vac)
      .then((res) => res.json())
      .then((res) =>
        setVacanciesData({
          data: returnLabelsAndValues(res),
          isFetching: false,
          status: "found",
        })
      )
      .catch((error: string) =>
        setVacanciesData({ data: {}, isFetching: false, status: "error" })
      );
  }

  // useEffect(fetchData_net, [selectedCountry]);
  // useEffect(fetchData_vacancies, [selectedCountry]);
  // useEffect(fetchData_unemployemnt, [selectedCountry]);


  useEffect(()=>{
    fetchData_net()
  }, [selectedCountry])

  useEffect(()=>{
    fetchData_vacancies()
  }, [selectedCountry])

  useEffect(()=>{
    fetchData_unemployemnt()
  }, [selectedCountry])

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

  
  const useMousePoz = () => {
    const [mousePoz, setMousePoz] = useState({ mouseX: 0, mouseY: 0 });

    const updateMousePoz = (ev: any) => {
      setMousePoz({ mouseX: ev.clientX-window.scrollX - 15, 
        mouseY: ev.clientY-window.scrollY-chartDimensions.chartAreaHeight-chartDimensions.upwardAdjust -15 });
    };

    useEffect(() => {
      window.addEventListener("mousemove", updateMousePoz);

      return () => window.removeEventListener("mousemove", updateMousePoz);
    }, []);
    return mousePoz;
  };

  const { mouseX, mouseY } = useMousePoz();


  function returnYearFromMouseX(mouseX:number){

    let yearOutput :number;
    let yearXDistance = chartDimensions.dataPoints.centerToCenter;
    let yearXStart = 50;

    yearOutput = Math.floor((mouseX - yearXStart) / yearXDistance + 2005);
    if (yearOutput < 2005) {
      yearOutput = 2005;
    }
    if (yearOutput > 2020) {
      yearOutput = 2020;
    }

    return yearOutput;
  }

  mouseYear = returnYearFromMouseX(mouseX)


  return (
    <>
      <div >
        <ControlPanel
          changeCountry={changeCountry}
          defaultCountry="Euro area"
        />
      </div>
      <div id="allGraphs">
      <div id="earningsContainer" className="graphContainer">
        <Earnings
          netEarningsData={netEarningsData.data}
          selectedCountry={selectedCountry}
          isFetching={netEarningsData.isFetching}
          mouseYear = {mouseYear}
        />
      </div>
      {/* <div className="unempAndTableContainer"> */}
        <div 
        // className="float-child" 
        id="unempContainer" className="graphContainer">
          <Unemployment
            isFetching={unemploymentData.isFetching}
            selectedCountry={selectedCountry}
            unemploymentData={unemploymentData.data}
            mouseX = {mouseX}
            mouseY = {mouseY}
          />
        </div>
        <div
        //  className="float-child"
          id="tableContainer" >
          <HoverTable 
          selectedCountry={selectedCountry}
          mouseX = {mouseX}
          mouseY = {mouseY}
          netEarningsData = {netEarningsData.data}
          unemploymentData ={unemploymentData.data }
          vacanciesData = {vacanciesData.data}
          />
        </div>
      {/* </div> */}

      <div id="vacContainer" className="graphContainer">
        <Vacancies
          selectedCountry={selectedCountry}
          vacanciesData={vacanciesData.data}
          isFetching={vacanciesData.isFetching}
          mouseYear = {mouseYear}
        />
      </div>
      </div>
    </>
  );
};

export default DashContainer;
