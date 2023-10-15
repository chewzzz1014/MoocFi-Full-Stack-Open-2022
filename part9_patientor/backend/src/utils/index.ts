import { EntryWithoutId} from "../types";
import parsers from "../parsers";

const toNewEntry = (object: unknown): EntryWithoutId => {
    // if object doesn't exist
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    // check BaseEntry fields first
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const newEntry: EntryWithoutId = {
            description: parsers.parseString('description', object.description),
            date: parsers.parseDate('date', object.date),
            specialist: parsers.parseString('specialist', object.specialist)
        }
        if ('diagnosisCodes' in object) {
            newEntry.diagnosisCodes = parsers.parseDiagnosisCodes(object.diagnosisCodes)
        }

        switch(object.type) {
            case 'Hospital':
                if ('discharge' in object) {

                }
                
                // // Hospital Entry
                // interface Discharge {
                //     date: string;
                //     criteria: string;
                // }
                
                // interface HospitalEntry extends BaseEntry {
                //     type: 'Hospital';
                //     discharge: Discharge;
                // }
                break;
            case 'OccupationalHealthcare':
                // interface SickLeave {
                //     startDate: string;
                //     endDate: string;
                // }
                
                // interface OccupationalHealthcareEntry extends BaseEntry {
                //     type: 'OccupationalHealthcare';
                //     employerName: string;
                //     sickLeave?: SickLeave;
                // }
                break;
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    newEntry.healthCheckRating = parsers.parseHealthCheckRating(object.healthCheckRating)
                }
                // export enum HealthCheckRating {
                //     "Healthy" = 0,
                //     "LowRisk" = 1,
                //     "HighRisk" = 2,
                //     "CriticalRisk" = 3
                // }
                
                // interface HealthCheckEntry extends BaseEntry {
                //     type: 'HealthCheck';
                //     healthCheckRating: HealthCheckRating;
                // }
                break;
            default:
                throw new Error('Invalid entry type.')
        }
    }
    throw new Error('Incorrect data: some fields are missing.')
}