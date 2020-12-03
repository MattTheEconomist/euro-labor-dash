import React, {useState, useEffect} from "react";
import ControlPanel from "./ControlPanel";


const DashContainer: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState <string> ("Euro area")
    // const [selectedCountry, setSelectedCountry] = useState <string> ("Euro area")

    function changeCountry(newCountry :string) :void{
        setSelectedCountry(newCountry)
        console.log(newCountry)
    }
    

  return <div>
      {/* <ControlPanel changeCountry={changeCountry}/> */}
      <ControlPanel  changeCountry={changeCountry} propNumber={6} anotherNumber={7}/>
      {/* <ControlPanel /> */}


  </div>;
};

export default DashContainer;
