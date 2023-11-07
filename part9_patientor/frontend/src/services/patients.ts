import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getSelectedPatient = async (id: string) =>{
  const {data} = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = (patientId: string, object: unknown) => {
  return axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
      object
  );
};

export default {
  getAll, getSelectedPatient, create, addEntry
};

