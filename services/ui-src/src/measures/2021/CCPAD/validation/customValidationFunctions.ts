import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        sevenDays[index].denominator &&
        thirtyDays[index].denominator &&
        sevenDays[index].denominator !== thirtyDays[index].denominator
      ) {
        const timeSet =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for both Most Effective or Moderately Effective Contraception rate and Long-acting Reversible Contraception (LARC) rate for ${timeSet}.`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const CCPADValidation = (data: Measure.Form) => {
  const ageGroups = ["3 days postpartem", "60 days postpartem"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-longActingContraception"],
    data["PerformanceMeasure-AgeRates-effectiveContraception"],
  ];
  let errorArray: any[] = [];
  //@ts-ignore
  errorArray = [
    ...errorArray,
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];
  return errorArray;
};

export const validateNoNonZeroNumOrDenom = (
  performanceMeasureArray: any[][],
  OPM: any,
  ageGroups: string[]
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray.forEach((performanceMeasure) => {
      if (
        performanceMeasure &&
        performanceMeasure[i] &&
        performanceMeasure[i].denominator &&
        performanceMeasure[i].numerator &&
        performanceMeasure[i].rate
      ) {
        if (
          parseInt(performanceMeasure[i].rate) !== 0 &&
          parseInt(performanceMeasure[i].numerator) === 0
        ) {
          nonZeroRateError = true;
        }
        if (
          parseInt(performanceMeasure[i].rate) === 0 &&
          parseInt(performanceMeasure[i].numerator) !== 0 &&
          parseInt(performanceMeasure[i].denominator) !== 0
        ) {
          zeroRateError = true;
        }
      }
    });
  });
  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate.forEach((rate: any) => {
        if (parseInt(rate.numerator) === 0 && parseInt(rate.rate) !== 0) {
          nonZeroRateError = true;
        }
        if (
          parseInt(rate.numerator) !== 0 &&
          parseInt(rate.denominator) !== 0 &&
          parseInt(rate.rate) === 0
        ) {
          zeroRateError = true;
        }
      });
    });
  if (nonZeroRateError) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Manually entered rate should not be 0 if numerator and denominator are not 0`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};

const validateThirtyDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  let error;
  const errorArray: any[] = [];

  if (thirtyDays) {
    thirtyDays.forEach((thirtyDay, index) => {
      if (
        thirtyDay &&
        thirtyDay.numerator &&
        thirtyDay.denominator &&
        parseFloat(thirtyDay?.numerator) > parseFloat(thirtyDay?.denominator)
      ) {
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Most Effective/Moderately Effective Contraceptive: Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays) {
    sevenDays.forEach((sevenDay, index) => {
      if (
        sevenDay &&
        sevenDay.numerator &&
        sevenDay.denominator &&
        parseFloat(sevenDay?.numerator) > parseFloat(sevenDay?.denominator)
      ) {
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Long-acting Reversible Contraceptive (LARC): Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate) > parseFloat(thirtyDays[index]?.rate)
      ) {
        const ageGroup =
          index === 0 ? "3 Days Postpartum" : "60 Days Postpartum";
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Long-acting Reversible Contraception (LARC) Rate should not be higher than Most Effective or Moderately Effective Contraception Rate for ${ageGroup} Rates`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

//TODO:
const validateAtLeastOneNDRSet = (data: Measure.Form) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"] ?? [];
  const isHEDIS = measureSpecification === "HHS-OPA";

  let doesOtherNDRExist = false;
  otherPerformanceRates.forEach((ndr) => {
    const ndrRate = ndr?.rate?.[0]?.rate;
    if (ndrRate) {
      doesOtherNDRExist = true;
    }
  });

  if (
    isHEDIS &&
    !sevenDays?.[0]?.rate &&
    !sevenDays?.[1]?.rate &&
    !thirtyDays?.[0]?.rate &&
    !thirtyDays?.[1]?.rate
  ) {
    error = {
      errorLocation: "Performance Measure",
      errorMessage:
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  } else if (measureSpecification && !isHEDIS && !doesOtherNDRExist) {
    error = {
      errorLocation: "Other Performance Measure",
      errorMessage:
        "At least one Other Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  }

  return error;
};

const validate3daysLessOrEqualTo30days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  console.log("sevenDays", sevenDays);
  console.log("thirtyDays", thirtyDays);

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (parseInt(sevenDays[0].rate) > parseInt(sevenDays[1].rate)) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Long-acting Reversible Method of Contraception (LARC)",
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (parseInt(thirtyDays[0].rate) > parseInt(thirtyDays[1].rate)) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The rate value of the 3 Day Postpartum rate must be less than or equal to the Sixty Day Postpartum rate within Most Effective or Moderately Effective Method of Contraception",
      });
    }
  }

  return errorArray;
};

export const validationFunctions = [
  validateRates,
  CCPADValidation,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
  validateAtLeastOneNDRSet,
  validate7DaysGreaterThan30Days,
  validate3daysLessOrEqualTo30days,
];
