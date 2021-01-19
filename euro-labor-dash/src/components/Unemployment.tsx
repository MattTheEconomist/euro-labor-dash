
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

    let labels :Array<any> = unemploymentData.labels
    labels  = labels.filter(el=>parseInt(el.split("-"))>=2005)
    labels = labels.map(el=>{
        const year = el.split("-")[0]
        const qtr = el.split("-")[1]
        const month = parseInt(qtr[1])*3
        return new Date(`${year}-${month}-01`)
        })




    console.log(labels)

    return  <div>{JSON.stringify(unemploymentData)}</div>
}


export default Unemployment

