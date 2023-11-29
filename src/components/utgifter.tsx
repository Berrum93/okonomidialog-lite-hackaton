import { ChangeEvent, FC } from 'react';
import { useAtom } from 'jotai';
import { dataAtom } from '../App'; // import the atom from where it's defined
import { TextField } from '@skatteetaten/ds-forms';

export const Utgifter: FC = () => {
  const [data, setData] = useAtom(dataAtom); // use the atom in your component

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

  return (
    <div>
      <h2>Utgifter</h2>
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
