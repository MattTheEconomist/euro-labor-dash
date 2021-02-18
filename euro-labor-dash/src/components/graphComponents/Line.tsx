import React, { useEffect, useState } from "react";
import {
    line,
    select,
  } from "d3";

  import {xScaleQuarterly} from "../../services/graphUtilityFunctions";


  interface LineProps {

    valuesScaled:any; 
    labelsScaled:any; 
  }


  const Linez: React.FC<LineProps>= (valuesScaled: any, labelsScaled: any) => {

    valuesScaled = valuesScaled.valuesScaled
    labelsScaled = labelsScaled.lablesScaled;


    const [lineValues, setLineValues] = useState([1, 2, 3]);
  
    const lineRef: any = React.createRef();

 
  
    useEffect(() => {
      if (Array.isArray(valuesScaled)) {
        setLineValues(valuesScaled);
  
        const currentLine = select(lineRef.current);
        animateLine(currentLine, valuesScaled);
      }
    },[valuesScaled]);
  
    return (
      <g>
        <path ref={lineRef} />
      </g>
    );
  };
  
  const animateLine = (
    currentLine: any,
    valuesScaled: Array<number>
  ) => {
  
  
    if (Array.isArray(valuesScaled)) {
      const drawLine = line()
        // .x((d: any, i: any) => i * 10 + 50)
        .x((d: any, i: any) => xScaleQuarterly(i))
        //Passing function does not work :(
        // .x((d: any, i: any) => xScale(i))
        .y((d: any) => d);
  
      const linePath = drawLine(valuesScaled as Array<number> | any);
  
      currentLine
        .transition()
        .duration(1000)
        .attr("d", linePath)
        .attr("fill", "none")
        .attr("stroke", "black");
    }
  };

  export default Linez
