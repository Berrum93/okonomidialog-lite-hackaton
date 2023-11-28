import { useState, useEffect } from "react";
import { DataModel } from "./api/types";
import Inntekter from "./components/inntekter";
import Resultat from "./components/resultat";
import { Utgifter } from "./components/utgifter";


export const App = () => {
  const [data, setData] = useState<DataModel | null>(null); // Add data state
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      const fetchedData: DataModel = await response.json();
      setData(fetchedData); // Set the fetched data to the data state
      console.log(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Inntekter inntekter={data?.inntekter} />
      <Resultat />
      <Utgifter />
    </div>
  );
};
