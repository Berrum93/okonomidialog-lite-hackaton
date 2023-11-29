import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../App"; // import the atom from where it's defined
import { TextField } from "@skatteetaten/ds-forms";
import { Utgift } from "../api/types";

export const Utgifter: FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component
  const [totalUtgifter, setTotalUtgifter] = useState(0);

  useEffect(() => {
    if (data !== null) {
      setData({ ...data, utgifter: sortUtgifter(data.utgifter) });
    }
  }, []);

  useEffect(() => {
    if (data !== null) {
      setTotalUtgifter(calculateTotalUtgifter(data.utgifter));
      console.log("Data:", data);
      console.log("Total utgifter:", totalUtgifter);
    }
  }, [data]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value.replace(/\s/g, ""); // Remove spaces from the value
    const belop = value === "" ? 0 : parseInt(value);

    if (data !== null) {
      const updatedUtgifter = [...data.utgifter];
      updatedUtgifter[index].belop = belop;
      setData({ ...data, utgifter: updatedUtgifter });
    }
  };

  const sortUtgifter = (utgifter: Utgift[]) => {
    return [...utgifter].sort((a, b) => {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    });
  };

  const calculateTotalUtgifter = (utgifter: Utgift[]): number => {
    return utgifter.reduce((total, utgift) => total + utgift.belop, 0);
  };

  if (data === null) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {data?.utgifter?.map((utgift, index) => {
        return (
          <div key={index}>
            <p>Type: {utgift.type}</p>
            <p>Beløp: {utgift.belop}</p>

            <TextField
              label="Endre beløp"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event, index)
              }
              thousandSeparator={true}
              placeholder="Hei"
              value={utgift.belop}
            />
          </div>
        );
      })}
      <div>Totale utgifter: {totalUtgifter}</div>
    </div>
  );
};
