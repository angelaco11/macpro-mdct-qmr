import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/2023/shared/CommonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2023/shared/globalValidations";
import * as QMR from "components";
//form type
import { DefaultFormData as FormData } from "measures/2023/shared/CommonQuestions/types";

export const COLHH = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
        healthHomeMeasure
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates healthHomeMeasure />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              adultMeasure={false}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
