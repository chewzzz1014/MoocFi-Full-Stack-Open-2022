import axios from "axios"

const baseURL = 'http://localhost:3001/persons'

function getAllContacts() {
    return axios.get(baseURL)
}

function updateContacts(id, newObj) {
    return axios.put(`${baseURL}/${id}`, newObj)
}

function addContacts(newObj) {
    return axios.post(baseURL, newObj)
}

function deleteContacts(id) {
    return axios.delete(`${baseURL}/${id}`)
}

export default { getAllContacts, updateContacts, addContacts, deleteContacts }