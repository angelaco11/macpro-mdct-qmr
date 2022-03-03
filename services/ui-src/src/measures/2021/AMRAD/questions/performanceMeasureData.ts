import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = [];
export const categories = [
  "Ages 19 to 50",
  "Ages 51 to 64",
  "Total (Ages 19 to 64)",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText:
    "The percentage of beneficiaries ages 19 to 64 who were identified as having persistent asthma and had a ratio of controller medications to total asthma medications of 0.50 or greater during the measurement year.",
  questionListItems: [],
  categories,
  qualifiers,
};
