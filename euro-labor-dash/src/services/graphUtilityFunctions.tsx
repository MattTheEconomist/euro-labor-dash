import React, { useEffect, useState } from "react";
import {
    scaleLinear,
    max,
    min,
    line,
    mean,
    select,
  } from "d3";


export function generateYaxisValues(ar: Array<number>) {
    const point1 = min(ar);
    const point5 = max(ar);
    const point3 = mean([point1, point5]);
    const point2 = mean([point1, point3]);
    const point4 = mean([point5, point3]);
    let rez = [point5, point4, point3, point2, point1];

    return rez.map((el: any) => parseFloat(el.toFixed(2)));
  }

  export function generateXaxisValues(labelsFormatted:Array<number>, isQuarterly: boolean){
    if(!isQuarterly){
        return labelsFormatted.map((year:any)=>parseInt(year))
    }else{
        return labelsFormatted.filter((el:any, ind:number)=>ind%4==0).map((el:any)=>el.getFullYear())
    }

  }


export function formatQuarterlyData(ar: Array<any>){
    ar = ar.filter((el) => parseInt(el.split("-")) >= 2005);
    ar= ar.map((el) => {
      const year = el.split("-")[0];
      const qtr = el.split("-")[1];
      const month = parseInt(qtr[1]) * 3;
      return new Date(`${year}-${month}-01`);
    })
    return ar
}

