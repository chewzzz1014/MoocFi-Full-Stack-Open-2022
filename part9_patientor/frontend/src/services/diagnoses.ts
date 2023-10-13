import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getDiagnosesDesc = (codes: string[]) => {
    return axios.post<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses/getAll`, codes
        ).then(response => response.data);
};

export default {
  getDiagnosesDesc
};

