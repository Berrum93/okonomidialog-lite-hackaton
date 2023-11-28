// server.js
import express from "express";

type Inntekt = {
  belop: number;
  type: string;
};

type Utgift = {
  belop: number;
  type: string;
};

type DataModel = {
  name: string;
  age: number;
  inntekter: Inntekt[];
  utgifter: Utgift[];
  totalInntekt: number;
  totalUtgift: number;
  resultat: number;
};

const inntekter: Inntekt[] = [{ belop: 123, type: "lønn" }];
const utgifter: Utgift[] = [{ belop: 123, type: "livsopphold" }];

const datamodell: DataModel = {
  name: "datamodell",
  age: 25,
  inntekter: inntekter,
  utgifter: utgifter,
  totalInntekt: 123123,
  totalUtgift: 123333,
  resultat: 22,
};

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(datamodell);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
