import * as Q from "./questions";
import * as CMQ from "../CommonQuestions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const CCWAD = ({ setValidationFunctions }: Measure.Props) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const { getValues } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchReportingRadio = useWatch({
    name: "DidReport",
  });
  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });
  const watchReversibleRates = useWatch({
    name: "PerformanceMeasure-ReversibleMethodOfContraceptionRate",
  });
  const watchModeratelyRates = useWatch({
    name: "PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate",
  });

  // Conditionals for Performance Measures
  const isOpa = watchMeasureSpecification === "OPA";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;
  const showModeratelyRates = !!watchModeratelyRates?.[0]?.rate;
  const showReversibleRates = !!watchReversibleRates?.[0]?.rate;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (showModeratelyRates) {
    ageGroups.push({
      label: "Most effective or moderately effective method of contraception",
      id: 0,
    });
  }

  if (showReversibleRates) {
    ageGroups.push({
      label: "Long-acting reversible method of contraception (LARC)",
      id: 0,
    });
  }

  if (showOtherPerformanceMeasureRates) {
    let otherRates = getValues("OtherPerformanceMeasure-Rates");
    otherRates.forEach((rate) => {
      if (rate.description) {
        ageGroups.push({ label: rate.description, id: ageGroups.length });
      }
    });
  }

  return (
    <>
      <Q.Reporting />

      {!watchReportingRadio?.includes("No") && (
        <>
          <Q.Status />
          <Q.MeasurementSpecification />
          <CMQ.DataSource />
          <Q.DateRange type="adult" />
          <Q.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isOpa && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isOpa && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                showModeratelyRates,
                showReversibleRates,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
          {/* Show Other Performance Measures when isOpa is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(showReversibleRates ||
            showModeratelyRates ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showModeratelyRates,
                showReversibleRates,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
        </>
      )}
      <Q.AdditionalNotes />
    </>
  );
};
