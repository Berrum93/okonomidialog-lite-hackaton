import { ChangeEvent, FC, useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../App"; // import the atom from where it's defined
import { TextField } from "@skatteetaten/ds-forms";
import { Utgift } from "../api/types";

export const Utgifter: FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component

  useEffect(() => {
    if (data !== null) {
      setData({ ...data, utgifter: sortUtgifter(data.utgifter) });
    }
  }, [data]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (data !== null) {
      const updatedUtgifter = [...data.utgifter];
      updatedUtgifter[index].belop = value as unknown as number;
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
    </div>
  );
};
