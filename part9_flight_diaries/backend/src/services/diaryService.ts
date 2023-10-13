import diaryData from '../../data/diaries'
import { DiaryEntry, NonSensitiveEntries, NewDiaryEntry } from '../types'

const diaries: DiaryEntry[] = diaryData

const getEntries = (): DiaryEntry[] => {
    return diaries
}

// return 'censored' version of DiaryEntry
// omit some fields from DiaryEntry
const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }))
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(x => x.id === id)
    return entry
}

const addDiary = (entry: NewDiaryEntry) => {
    const newEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    }
    diaries.push(newEntry)
    return newEntry
}

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
}