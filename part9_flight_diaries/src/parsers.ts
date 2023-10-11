import { Visibility, Weather } from "./types"

// type guard
// string validation
// 'text is string': type predicate (parameterName is Type)
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

// type guard
// to validate comment field
const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrct or missing comment')
    }

    return comment
}

// date validation
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorract or missing date: ' + date)
    }
    return date
}

// weather validation
const isWeather = (str: string): str is Weather => {
    // compared with enum. Enum is converted to array first
    return Object.values(Weather).map(v => v.toString()).includes(str)
}

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather ' + weather)
    }
    return weather
}

// visibility validation
const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param)
}

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility)
    }
    return visibility
}

export default {
    parseComment,
    parseDate,
    parseWeather,
    parseVisibility
}