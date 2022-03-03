import * as Q from "./questions";
import * as CMQ from "measures/CommonQuestions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";
import { PMD } from "./questions/data";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as Types from "measures/CommonQuestions/types";

export const IETAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
}: Types.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const { getValues } = useFormContext<Measure.Form>();
  const data = getValues();

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  // Watch Values of Form Questions
  const watchReportingRadio = useWatch({ name: "DidReport" });
  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isHEDIS = watchMeasureSpecification === "NCQA/HEDIS";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  const watchInitAlcohol = useWatch({
    name: "PerformanceMeasure-AgeRates-Initiation-Alcohol",
  });
  const watchEngageAlcohol = useWatch({
    name: "PerformanceMeasure-AgeRates-Engagement-Alcohol",
  });
  const watchInitOpioid = useWatch({
    name: "PerformanceMeasure-AgeRates-Initiation-Opioid",
  });
  const watchEngageOpioid = useWatch({
    name: "PerformanceMeasure-AgeRates-Engagement-Opioid",
  });
  const watchInitOther = useWatch({
    name: "PerformanceMeasure-AgeRates-Initiation-Other",
  });
  const watchEngageOther = useWatch({
    name: "PerformanceMeasure-AgeRates-Engagement-Other",
  });
  const watchInitTotal = useWatch({
    name: "PerformanceMeasure-AgeRates-Initiation-Total",
  });
  const watchEngageTotal = useWatch({
    name: "PerformanceMeasure-AgeRates-Engagement-Total",
  });
  const showInitAlcohol18To64 = !!watchInitAlcohol?.[0]?.rate;
  const showEngageAlcohol18To64 = !!watchEngageAlcohol?.[0]?.rate;
  const showInitOpioid18To64 = !!watchInitOpioid?.[0]?.rate;
  const showEngageOpioid18To64 = !!watchEngageOpioid?.[0]?.rate;
  const showInitOther18To64 = !!watchInitOther?.[0]?.rate;
  const showEngageOther18To64 = !!watchEngageOther?.[0]?.rate;
  const showInitTotal18To64 = !!watchInitTotal?.[0]?.rate;
  const showEngageTotal18To64 = !!watchEngageTotal?.[0]?.rate;
  const showInitAlcohol65Plus = !!watchInitAlcohol?.[1]?.rate;
  const showEngageAlcohol65Plus = !!watchEngageAlcohol?.[1]?.rate;
  const showInitOpioid65Plus = !!watchInitOpioid?.[1]?.rate;
  const showEngageOpioid65Plus = !!watchEngageOpioid?.[1]?.rate;
  const showInitOther65Plus = !!watchInitOther?.[1]?.rate;
  const showEngageOther65Plus = !!watchEngageOther?.[1]?.rate;
  const showInitTotal65Plus = !!watchInitTotal?.[1]?.rate;
  const showEngageTotal65Plus = !!watchEngageTotal?.[1]?.rate;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (
    showInitAlcohol18To64 ||
    showEngageAlcohol18To64 ||
    showInitOpioid18To64 ||
    showEngageOpioid18To64 ||
    showInitOther18To64 ||
    showEngageOther18To64 ||
    showInitTotal18To64 ||
    showEngageTotal18To64
  ) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (
    showInitAlcohol65Plus ||
    showEngageAlcohol65Plus ||
    showInitOpioid65Plus ||
    showEngageOpioid65Plus ||
    showInitOther65Plus ||
    showEngageOther65Plus ||
    showInitTotal65Plus ||
    showEngageTotal65Plus
  ) {
    ageGroups.push({ label: "Age 65 and older", id: 1 });
  }
  if (showOtherPerformanceMeasureRates) {
    // @ts-ignore
    let otherRates = getValues("OtherPerformanceMeasure-Rates");
    // @ts-ignore
    otherRates.forEach((rate) => {
      if (rate.description) {
        ageGroups.push({ label: rate.description, id: ageGroups.length });
      }
    });
  }

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const dataSourceWatch = useWatch({ name: "DataSource" });
  const rateReadOnly =
    dataSourceWatch?.every(
      (source: string) => source === "AdministrativeData"
    ) ?? true;

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource data={Q.DataSourceData} />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isHEDIS && (
            <CMQ.PerformanceMeasure
              data={PMD.data}
              rateReadOnly={rateReadOnly}
            />
          )}
          {/* Show Deviation only when Other is not selected */}
          {isHEDIS && (
            <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherSpecification && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {(showInitAlcohol18To64 ||
            showEngageAlcohol18To64 ||
            showInitOpioid18To64 ||
            showEngageOpioid18To64 ||
            showInitOther18To64 ||
            showEngageOther18To64 ||
            showInitTotal18To64 ||
            showEngageTotal18To64 ||
            showInitAlcohol65Plus ||
            showEngageAlcohol65Plus ||
            showInitOpioid65Plus ||
            showEngageOpioid65Plus ||
            showInitOther65Plus ||
            showEngageOther65Plus ||
            showInitTotal65Plus ||
            showEngageTotal65Plus ||
            showOtherPerformanceMeasureRates) && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              adultMeasure
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
