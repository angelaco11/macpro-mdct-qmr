/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { CCWAD } from "./CCWAD";
import { CCPAD } from "./CCPAD";
import { CPAAD } from "./CPAAD";
import { FUAAD } from "./FUAAD";
import { FUMAD } from "./FUMAD";
import { FVAAD } from "./FVAAD";
import { IETAD } from "./IETAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { MSCAD } from "./MSCAD";
import { OUDAD } from "./OUDAD";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";
import { PQI08AD } from "./PQI08AD";
import { PQI01AD } from "./PQI01AD";
import { PQI15AD } from "./PQI15AD";
import { PQI05AD } from "./PQI05AD";

const twentyTwentyOneMeasures = {
  "CCP-AD": CCPAD,
  "CPA-AD": CPAAD,
  "FUA-AD": FUAAD,
  "FUM-AD": FUMAD,
  "FVA-AD": FVAAD,
  "IET-AD": IETAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "OUD-AD": OUDAD,
  "NCIDDS-AD": NCIDDSAD,
  "PDENT-CH": PDENTCH,
  "CCW-AD": CCWAD,
  "PQI08-AD": PQI08AD,
  "PQI01-AD": PQI01AD,
  "PQI15-AD": PQI15AD,
  "PQI05-AD": PQI05AD,
};

export default twentyTwentyOneMeasures;
