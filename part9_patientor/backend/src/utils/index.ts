import { EntryWithoutId} from "../types";
import parsers from "../parsers";

const toNewEntry = (object: unknown): EntryWithoutId => {
    // if object doesn't exist
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    // check BaseEntry fields first
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        let newEntry: EntryWithoutId
        switch(object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    newEntry = {
                        type: 'Hospital',
                        description: parsers.parseString('description', object.description),
                        date: parsers.parseDate('date', object.date),
                        specialist: parsers.parseString('specialist', object.specialist),
                        diagnosisCodes: parsers.parseDiagnosisCodes(object),
                        discharge: parsers.parseDischarge(object.discharge)

                    }
                } else {
                    throw new Error('Hospital Entry does not have discharge field.')
                }
                break;
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    newEntry = {
                        type: 'OccupationalHealthcare',
                        description: parsers.parseString('description', object.description),
                        date: parsers.parseDate('date', object.date),
                        specialist: parsers.parseString('specialist', object.specialist),
                        diagnosisCodes: parsers.parseDiagnosisCodes(object),
                        employerName: parsers.parseString('employer name', object.employerName),
                        sickLeave: parsers.parseSickLeave(object)
                    }
                } else {
                    throw new Error('OccupationalHealthcare Entry does not have employer name field.')
                }
                break;
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    newEntry = {
                        type: 'HealthCheck',
                        description: parsers.parseString('description', object.description),
                        date: parsers.parseDate('date', object.date),
                        specialist: parsers.parseString('specialist', object.specialist),
                        diagnosisCodes: parsers.parseDiagnosisCodes(object),
                        healthCheckRating: parsers.parseHealthCheckRating(object.healthCheckRating)
                    }
                } else {
                    throw new Error('Health Check Entry does not have health check rating field.')
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