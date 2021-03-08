import React from "react";
import countryData from "../dataSources/countryCodes.json";

interface ControlPanelProps {

  defaultCountry: string, 
  changeCountry: any;
}


export const ControlPanel: React.FC<ControlPanelProps> = ({
    changeCountry,
    defaultCountry
  }) => {
    let countryNames = Object.values(countryData[0]);


    return (<div id="dropdownContainerOutside">
      <div id="countrySelectTextContainer">
      <p id="countrySelectText">Select a Country</p>
      </div>
      <div id="countrySelectContainer">
        <select id="countrySelect" onChange={(e) => changeCountry(e.target.value)} defaultValue={defaultCountry}>
        {countryNames.map((country, ind)=> <option key={ind}>{country}</option> )}
        </select>
        </div>
    </div>)  }

export default ControlPanel;
