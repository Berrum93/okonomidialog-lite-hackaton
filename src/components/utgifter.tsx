import { ChangeEvent, FC } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../App"; // import the atom from where it's defined
import { TextField } from "@skatteetaten/ds-forms";

export const Utgifter: FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value } = event.target;
    if (data !== null) {
      setData({ ...data, age: value as unknown as number });
    }
  };

  return (
    <div>
      <h2>Utgifter</h2>
      {data?.utgifter?.map((utgift, index) => (
        <div key={index}>
          <p>Type: {utgift.type}</p>
          <p>Beløp: {utgift.belop}</p>
          <p>Beløp: {data.age}</p>
        </div>
      ))}
      <TextField
        label="Type"
        onChange={handleInputChange}
        thousandSeparator={true}
        placeholder="Hei"
        value={data?.age}
      />
    </div>
  );
};
