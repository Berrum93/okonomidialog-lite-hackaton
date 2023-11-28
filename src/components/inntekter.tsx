import React from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../App";
import { TextField } from '@skatteetaten/ds-forms';
import { Button } from '@skatteetaten/ds-buttons';
import { SendSVGpath } from '@skatteetaten/ds-icons';

const Inntekter: React.FC = () => {
  const [data] = useAtom(dataAtom); // use the atom in your component

  return (
    <div>
      {data?.inntekter?.map((inntekt, index) => (
        <div key={index}>
          <p>Inntekt: {inntekt.type}</p>
          <p>Beløp: {inntekt.belop}</p>
          <div>
            <TextField
              id="inntekt"
              label="Inntekt"
              placeholder="Skriv inn inntekt"
              onChange={(e) => console.log(e.target.value)}
            />
            <Button
              variant="primary"
              svgPath={SendSVGpath}
              onClick={() => console.log("Send")}
            >
              Send
            </Button>
          </div>
        </div>
       
      ))}
    </div>
  );
};

export default Inntekter;
