import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import { create } from "domain";


interface VacancyProps{

    selectedCountry?: string;
    vacancyData: any;
    isFetching: boolean;
}




const Vacancies: React.FC<VacancyProps>=({
    vacancyData: vacancyData, 
    selectedCountry, 
    isFetching


}) =>{

    return  <div>{JSON.stringify(vacancyData)}</div>
}


export default Vacancies