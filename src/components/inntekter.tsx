import React from "react";
import { Inntekt } from "../api/types";

interface InntekterProps {

  inntekter: Inntekt[] | undefined;
}

const Inntekter: React.FC<InntekterProps> = ({ inntekter }) => {
  return (
    <div>
      {inntekter?.map((inntektData, index) => (
        <div key={index}>
          <p>Inntekt: {inntektData.type}</p>
          <p>Beløp: {inntektData.belop}</p>
        </div>
      ))}
    </div>
  );
};

export default Inntekter;
