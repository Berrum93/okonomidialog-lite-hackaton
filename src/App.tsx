import { useEffect } from 'react';
import { DataModel } from './api/types';
import Inntekter from './components/inntekter';
import Resultat from './components/resultat';
import { Utgifter } from './components/utgifter';
import { atom, useAtom } from 'jotai';
import { StepList } from '@skatteetaten/ds-collections';

export const dataAtom = atom<DataModel | null>(null);

export const App = () => {
  const [, setData] = useAtom(dataAtom);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000');
      const fetchedData = await response.json();
      setData(fetchedData); // Set the fetched data to the data state
      console.log('Data: ' + fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <StepList>
        <StepList.Step
          title={'Inntekter'}
          id={'step-1'}
          onEdit={() => console.log('trykket på endre knapp')}
          editButtonText={'egendefinert tekst'}
          stepNumber={1}
        >
          <Inntekter />
        </StepList.Step>
        <StepList.Step
          title={'Utgifter'}
          id={'step-2'}
          onEdit={() => console.log('trykket på endre knapp')}
          editButtonText={'egendefinert tekst'}
          stepNumber={2}
        >
          <Utgifter />
        </StepList.Step>
        <StepList.Step
          title={'Resultat'}
          id={'step-3'}
          onEdit={() => console.log('trykket på endre knapp')}
          editButtonText={'egendefinert tekst'}
          stepNumber={3}
        >
          {' '}
          <Resultat />
        </StepList.Step>
      </StepList>
      ;
    </div>
  );
};
