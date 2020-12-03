import React, {useState, useEffect} from 'react';
import countryData from '../dataSources/countryCodes.json'

interface ControlPanelProps{
    // changeCountry:()=>string; 
    propNumber: number,
    anotherNumber: number


}


// const ControlPanel: React.FC <Props> = (changeCountry) =>{
const ControlPanel: React.FC <ControlPanelProps> = ({propNumber, anotherNumber}:ControlPanelProps) =>{
// const ControlPanel: React.FC = () =>{
    // const {changeCountry} = props
    // console.log(propNumber.propNumber)
    console.log(propNumber, anotherNumber)
    // const [selectedCountry, setSelectedCountry] = useState <string> ("Euro area")

    
    // function changeCountry(newCountry :string) :void{
    //     setSelectedCountry(newCountry)
    //     console.log(newCountry)
    // }





    // let countries  = countryData[0]

    let countryNames = Object.values(countryData[0])
    // console.log(countryNames)




return <div>
{/* <select onChange={e=>changeCountry(e.target.value)}>
    {countryNames.map((country, ind) =><option key={ind} > {country}</option>)}
    </select> */}

    <h5>hi</h5>
 </div>

}

export default ControlPanel