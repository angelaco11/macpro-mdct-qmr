import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For beneficiaries ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission. Data are reported in the following categories:",
  ],
  questionListItems: [
    "Count of Index Hospital Stays (IHS)",
    "Count of Observed 30-Day Readmissions",
    "Count of Expected 30-Day Readmissions",
  ],
  categories,
  qualifiers,
};
