import { ResolverResult } from "react-hook-form";
import twentyTwentyOneMeasures, { QualifierData as data2021 } from "./2021";
import twentyTwentyTwoMeasures, { QualifierData as data2022 } from "./2022";
import twentyTwentyThreeMeasures, { QualifierData as data2023 } from "./2022";
import * as QMR from "components";

export type CustomValidator = (res: ResolverResult) => ResolverResult;

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: QMR.MeasureWrapperProps) => JSX.Element | null;
  };
}

interface IQualifierData {
  year: string;
  data: any;
}

// TODO: Flag 2023
const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
  2022: twentyTwentyTwoMeasures,
  2023: twentyTwentyThreeMeasures,
};

export default measuresByYear;
export const QualifierData: IQualifierData[] = [
  { year: "2021", data: data2021 },
  { year: "2022", data: data2022 },
  { year: "2022", data: data2023 },
];
