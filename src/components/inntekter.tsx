import React from "react";
import { useAtom } from "jotai";
import { dataAtom, totalInntektAtom } from "../App";
import { TextField } from "@skatteetaten/ds-forms";
import { DataModel } from "../api/types";

const Inntekter: React.FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component
  const [totalInntekter] = useAtom(totalInntektAtom);

  const handleChange = (value: string, id: string) => {
    setData((prev) => {
      if (!prev) return null;

      const newData: DataModel = { ...prev };
      newData.inntekter =
        newData.inntekter?.map((inntekt) => {
          if (inntekt.type === id) {
            const parsedValue = parseInt(value.replace(/\s/g, ""));
            return { ...inntekt, belop: isNaN(parsedValue) ? 0 : parsedValue };
          }
          return inntekt;
        }) ?? [];
      return newData;
    });
  };

  return (
    <div>
      {data?.inntekter?.map((inntekt, index) => (
        <div key={index}>
          <p>Inntekt: {inntekt.type}</p>
          <p>
            Beløp:
            <div>
              <TextField
                id="inntekt"
                label="Inntekt"
                placeholder="Skriv inn inntekt"
                onChange={(e) => {
                  handleChange(e.target.value, inntekt.type);
                }}
                value={
                  data?.inntekter?.find((i) => i.type === inntekt.type)?.belop
                }
                thousandSeparator
              />
            </div>
          </p>
        </div>
      ))}
      <br />
      <strong style={{ fontSize: "larger" }}>
        Totale inntekter: {totalInntekter}
      </strong>
    </div>
  );
};

export default Inntekter;
