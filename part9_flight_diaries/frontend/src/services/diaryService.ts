import axios from 'axios'
import { NonSensitiveEntries, NewDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data as NonSensitiveEntries[])
}

export const addDiary = (diary: unknown) => {
    return axios
        .post(baseUrl, diary)
        .then(response => response.data as NonSensitiveEntries)
}