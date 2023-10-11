import diaryData from '../../data/diaries'
import { DiaryEntry, NonSensitiveEntries } from '../types'

const diaries: DiaryEntry[] = diaryData

const getEntries = (): DiaryEntry[] => {
    return diaries
}

const addDiary = () => {
    return null
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

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries
}