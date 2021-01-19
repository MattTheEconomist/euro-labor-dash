
import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import { create } from "domain";


interface UnemploymentProps{

    selectedCountry?: string;
    unemploymentData: any;
    isFetching: boolean;
}




const Unemployment: React.FC<UnemploymentProps>=({
    unemploymentData:  unemploymentData, 
    selectedCountry, 
    isFetching


}) =>{

    console.log(unemploymentData)

    return  <div>{JSON.stringify(unemploymentData)}</div>
}


export default Unemployment

