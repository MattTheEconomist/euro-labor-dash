import React, { useEffect, useState } from "react";
import { scaleLinear, max, min, mean, select } from "d3";
import { create } from "domain";


interface VacancyProps{

    selectedCountry?: string;
    vacanciesData: any;
    isFetching: boolean;
}




const Vacancies: React.FC<VacancyProps>=({
    vacanciesData: vacanciesData, 
    selectedCountry, 
    isFetching


}) =>{

    return  <div>{JSON.stringify(vacanciesData)}</div>
}


export default Vacancies