import { useEffect } from "react";
import { DataModel } from "./api/types";
import Inntekter from "./components/inntekter";
import Resultat from "./components/resultat";
import { Utgifter } from "./components/utgifter";
import { atom, useAtom } from "jotai";
import '@skatteetaten/ds-core-designtokens/index.css';

export const dataAtom = atom<DataModel | null>(null);

export const App = () => {
  const [, setData] = useAtom(dataAtom);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      const fetchedData = await response.json();
      setData(fetchedData); // Set the fetched data to the data state
      console.log("Data: " + fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Inntekter />
      <Resultat />
      <Utgifter />
    </div>
  );
};
