export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// Hospital Entry
interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

// Occupational Healthcare Entry
interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

// Healthcheck Entry
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// use Omit to exclude a property (for union type): resulting type would only contain the common properties
type UnionOmit<T, K extends string| number | symbol> = T extends unknown ? Omit<T, K> : never; // Define special omit for unions
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

// for entries
export interface EntryProps {
  entry: Entry;
  codesWithDetails: Diagnosis[];
}

export interface EntryFormProps {
  onClose: () => void;
  onSubmit: (values: unknown, func: () => void) => void;
  error: undefined | string;
  modalOpen: boolean;
}