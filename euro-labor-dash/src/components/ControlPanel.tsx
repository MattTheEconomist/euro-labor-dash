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


    return (<div>

        <select onChange={(e) => changeCountry(e.target.value)} defaultValue={defaultCountry}>
        {countryNames.map((country, ind)=> <option key={ind}>{country}</option> )}
        </select>
    </div>)  }

export default ControlPanel;
