
export type Inntekt = {
  belop: number;
  type: string;
};

export type Utgift = {
  belop: number;
  type: string;
};

export type DataModel = {
  name: string;
  age: number;
  inntekter: Inntekt[];
  utgifter: Utgift[];
  totalInntekt: number;
  totalUtgift: number;
  resultat: number;
};
