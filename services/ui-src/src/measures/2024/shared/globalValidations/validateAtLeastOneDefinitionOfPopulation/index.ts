import * as Types from "measures/2024/shared/CommonQuestions/types";

export const validateAtLeastOneDefinitionOfPopulation = (
  data: Types.DefinitionOfPopulation,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (
    !data.DefinitionOfDenominator ||
    data.DefinitionOfDenominator.length === 0
  ) {
    errorArray.push({
      errorLocation: "Definition of Population",
      errorMessage:
        errorMessage ??
        "You must select at least one definition of population option",
    });
  }

  return errorArray;
};
