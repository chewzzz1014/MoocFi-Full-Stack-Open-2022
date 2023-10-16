import { Diagnosis, HealthCheckRating, Discharge, SickLeave } from "./types"

// string validation
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

// parse string
const parseString = (fieldName: string, value: unknown): string => {
    if (!value) {
        throw new Error(`Missing ${fieldName}`)
    }
    if (!isString(value)) {
        throw new Error(`Incorrect ${fieldName}: ${value}`)
    }
    return value
}

// date validation
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

// parse date
const parseDate = (fieldName: string, date: unknown): string => {
    if (!date) {
        throw new Error(`Missing ${fieldName}`)
    }
    if (!isString(date) || !isDate(date)) {
        throw new Error(`Incorrect ${fieldName}: ${date}`)
    }
    return date
}

// healthcheck rating validation
const isHealthCheckRating = (num: number): num is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(h => Number(h)).includes(num)
}

// parse healthcheck rating
const parseHealthCheckRating = (hc: unknown): HealthCheckRating => {
    if (!hc) {
        throw new Error('Missing healthcheck rating')
    }
    if (!isNaN(Number(hc)) || !isHealthCheckRating(hc)) {
        throw new Error(`Incorrect healthcheck rating: ${hc}`)
    }
    return hc
}

// parse diagnosis code: accept the whole data - object
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>
}

// parse discharge: accept object.discharge
const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error('Empty or invalid format of discharge data')
    } 
    if ('date' in object && 'criteria' in object) {
        object.date = parseDate('discharge date', object.date)
        object.criteria = parseString('discharge criteria', object.criteria)
    }
    return object as Discharge
}

// parse sick leave: accept the whole data as input (since sickLeave is optional)
const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
        return {} as SickLeave
    } 
    return object.sickLeave as SickLeave
}

export default {
    parseString,
    parseDate,
    parseHealthCheckRating,
    parseDiagnosisCodes,
    parseDischarge,
    parseSickLeave
}