import axios from "axios";

const BASE_URL = 'http://localhost:3001/notes'

export const getNotes = () => {
    return axios.get(BASE_URL).then(res => res.data)
}

export const createNote = (newNote) => {
    return axios.post(BASE_URL, newNote).then(res => res.data)
}

export const updateNote = (updatedNote) => {
    return axios.put(`${BASE_URL}/${updatedNote.id}`, updatedNote).then(res => res.data)
}