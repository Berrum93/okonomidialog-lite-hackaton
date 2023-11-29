import { useEffect, useState, useId } from "react";
import { DataModel, Utgift } from "./api/types";
import Inntekter from "./components/inntekter";
import Resultat from "./components/resultat";
import { Utgifter } from "./components/utgifter";
import { atom, useAtom } from "jotai";
import { StepList } from "@skatteetaten/ds-collections";
import "@skatteetaten/ds-core-designtokens/index.css";

export const dataAtom = atom<DataModel | null>(null);

export const App = () => {
  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wfq4ctzd-3000.euw.devtunnels.ms/"
        );
        const fetchedData = await response.json();
        setData(fetchedData); // Set the fetched data to the data state
        console.log("Data: " + fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const stepId = useId();
  const [activeStep, setActiveStep] = useState(1);
  const step3 = true;
  const onNext = (): void => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    setTimeout((): void => {
      const el = document.getElementById(`${stepId}-${nextStep}-focus-target`);
      el?.focus();
    }, 0);
  };

  return (
    <div className="container">
      <StepList>
        {activeStep >= 1 && (
          <StepList.Step
            id={`${stepId}-1`}
            variant={activeStep === 1 ? "active" : "passive"}
            title={"Inntekter"}
            stepNumber={1}
            onEdit={
              activeStep > 1 && activeStep < 4
                ? (): void => setActiveStep(1)
                : undefined
            }
            onNext={onNext}
          >
            {activeStep === 1 && <Inntekter />}
            {activeStep > 1 && (
              <div>
                <p>
                  Totale inntekter:{" "}
                  {data?.inntekter.reduce(
                    (acc, inntekt) => acc + inntekt.belop,
                    0
                  )}
                </p>
              </div>
            )}
          </StepList.Step>
        )}

        {activeStep >= 2 && (
          <StepList.Step
            className="utgifterStep"
            id={`${stepId}-2`}
            variant={activeStep === 2 ? "active" : "passive"}
            title={"Utgifter"}
            stepNumber={2}
            onEdit={
              activeStep > 2 && activeStep < 4
                ? (): void => setActiveStep(2)
                : undefined
            }
            onNext={onNext}
          >
            {activeStep === 2 && <Utgifter />}
            {activeStep > 2 && (
              <div>
                <p>
                  Totale utgifter:{" "}
                  {data?.utgifter.reduce(
                    (acc, utgift) => acc + utgift.belop,
                    0
                  )}
                </p>
              </div>
            )}
          </StepList.Step>
        )}
        {activeStep >= 3 && (
          <StepList.Step
            id={`${stepId}-3`}
            variant={activeStep === 3 ? "active" : "passive"}
            title={"Oppsummering"}
            stepNumber={3}
            onNext={(): void => {
              if (step3) {
                onNext();
              }
            }}
          >
            <Resultat />
          </StepList.Step>
        )}
        {activeStep >= 4 && step3 === true && (
          <StepList.Step
            id={`${stepId}-4`}
            title={"Dine endringer er nå lagret."}
            variant={"positiveResult"}
            stepNumber={4}
            introTitleAs={"h4"}
          >
            Vi har mottat dine endringer av inntekter og utgifter.
            <br />
            Det kan ta noen dager før det er helt oppdatert hos oss
          </StepList.Step>
        )}
      </StepList>
    </div>
  );
};
