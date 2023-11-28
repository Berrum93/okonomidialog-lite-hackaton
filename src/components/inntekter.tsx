import React from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../App";

const Inntekter: React.FC = () => {
  const [data] = useAtom(dataAtom); // use the atom in your component

  return (
    <div>
      {data?.inntekter?.map((inntekt, index) => (
        <div key={index}>
          <p>Inntekt: {inntekt.type}</p>
          <p>Beløp: {inntekt.belop}</p>
        </div>
      ))}
    </div>
  );
};

export default Inntekter;
