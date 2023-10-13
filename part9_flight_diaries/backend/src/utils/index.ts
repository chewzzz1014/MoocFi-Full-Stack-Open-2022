import {NewDiaryEntry} from '../types'
import parsers from '../parsers'

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    // object doesnt exist
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    // when object is type unknown, not allowed to access any of its field
    // before access any of its field, ensure that object has all the desired fields
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
         // validate fields' values
        const newEntry: NewDiaryEntry = {
            date: parsers.parseDate(object.date),
            visibility: parsers.parseVisibility(object.visibility),
            weather: parsers.parseWeather(object.weather),
            comment: parsers.parseComment(object.comment)
        }

        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing.')
}

export default toNewDiaryEntry