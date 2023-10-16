import { EntryWithoutId, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from "../types";
import parsers from "../parsers";

const toNewEntry = (object: unknown): EntryWithoutId => {
    // if object doesn't exist
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    // check BaseEntry fields first
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        let newEntry: EntryWithoutId = {
            description: parsers.parseString('description', object.description),
            date: parsers.parseDate('date', object.date),
            specialist: parsers.parseString('specialist', object.specialist)
        }
        if ('diagnosisCodes' in object) {
            newEntry.diagnosisCodes = parsers.parseDiagnosisCodes(object)
        }

        switch(object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    newEntry = newEntry as HospitalEntry
                    newEntry.discharge = parsers.parseDischarge(object.discharge)
                }
                break;
            case 'OccupationalHealthcare':
                if ('sickLeave' in object) {
                    newEntry = newEntry as OccupationalHealthcareEntry
                    newEntry.sickLeave = parsers.parseSickLeave(object)
                }
                break;
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    newEntry = newEntry as HealthCheckEntry
                    newEntry.healthCheckRating = parsers.parseHealthCheckRating(object.healthCheckRating)
                }
                break;
            default:
                throw new Error('Invalid entry type.')
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing.')
}

export default toNewEntry