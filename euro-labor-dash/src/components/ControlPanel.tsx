import React from 'react';
// import countries from './dataSources/countryCodes.json'
import countryData from 'C:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/dataSources/countryCodes.json'

const ControlPanel: React.FC = () =>{

    let countries  = countryData[0]
    console.log(Object.values(countries))

console.log("hi")
return <div>

     <h5>hi</h5>
 </div>

}

export default ControlPanel