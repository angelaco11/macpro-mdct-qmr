import * as PMD from "./data";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
} from "../../globalValidations/validationsLib";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { FormData } from "./types";

const CISCHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateEqualDenominators(performanceMeasureArray, ageGroups),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [CISCHValidation];
