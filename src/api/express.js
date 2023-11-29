// server.js
import express from "express";
import cors from "cors";

const inntekter = [{ belop: 123, type: "lønn" }];
const utgifter = [
  { belop: 100, type: "mat" },
  { belop: 200, type: "transport" },
  { belop: 300, type: "helse" },
  { belop: 123, type: "livsopphold" },
  { belop: 456, type: "husleie" },
  { belop: 789, type: "strømregning" },
];

const datamodell = {
  name: "datamodell",
  age: 25,
  inntekter: inntekter,
  utgifter: utgifter,
  totalInntekt: 123123,
  totalUtgift: 123333,
  resultat: 22,
};

const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send(datamodell);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
