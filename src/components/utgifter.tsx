import { ChangeEvent, FC, useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom, totalUtgifterAtom } from "../App"; // import the atom from where it's defined
import { TextField } from "@skatteetaten/ds-forms";
import { Utgift } from "../api/types";

export const Utgifter: FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component
  const [totalUtgifter] = useAtom(totalUtgifterAtom);

  useEffect(() => {
    if (data !== null) {
      setData({ ...data, utgifter: sortUtgifter(data.utgifter) });
    }
  }, []);

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

      <br />
      <strong style={{ fontSize: "larger" }}>
        Totale utgifter: {totalUtgifter}
      </strong>
    </div>
  );
};
