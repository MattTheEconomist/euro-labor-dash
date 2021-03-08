import React from "react";
// import { scaleLinear, max, min, line, mean, select } from "d3";
import { xScaleQuarterly } from "../../services/graphUtilityFunctions";

interface DotzProps {
  valuesRaw: number[];
  valuesScaled: number[];
  labels: Array<any>;
  mouseX: number | null;
  mouseY: number | null;
  isFetching: boolean;
}

const Dotz: React.FC<DotzProps> = ({
  valuesRaw,
  valuesScaled,
  mouseX,
  mouseY,
  isFetching,
}) => {
  const dots = !isFetching
    ? valuesScaled.map((row: any, ind: number) => (
        <Dot
          key={Math.random()}
          x={xScaleQuarterly(ind)}
          //use for tooltip later
          y_raw={valuesRaw[ind]}
          dotHeight={row}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))
    : null;

  return <g>{dots}</g>;
};

interface DotProps {
  x: number;
  y_raw: number;
  dotHeight: number;
  mouseX: number | null;
  mouseY: number | null;
}

const Dot: React.FC<DotProps> = ({ x, dotHeight, mouseX, mouseY }) => {
  const dotRef: any = React.createRef();

  let opacity = 0;
  let mouseDistance = 600;

  if (mouseX !== null && mouseY !== null) {
    mouseDistance = Math.sqrt(
      Math.pow(mouseX - x, 2) + Math.pow(mouseY - dotHeight, 2)
    );
  }

  if (mouseDistance > 125) {
    opacity = 0;
  } else {
    opacity = 100 / Math.pow(mouseDistance, 1.75);
  }

  return (
    <g>
      <circle
        fill="black"
        ref={dotRef}
        r={3}
        cx={x}
        cy={dotHeight}
        fillOpacity={`${opacity}`}
      ></circle>
    </g>
  );
};

// const animtaeDots = (dotRef: any, dotHeight: number, x: number) => {
//   const dot = select(dotRef.current);

//   dot.transition().duration(1000).attr("cy", dotHeight).attr("cx", x);
// };

export default Dotz;
