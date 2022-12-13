import axios from "axios"

const baseURL = 'http://localhost:3001/api/persons'

// works
function getAllContacts() {
    return axios.get(baseURL)
}

function updateContacts(id, newObj) {
    return axios.put(`${baseURL}/${id}`, newObj)
}

// works
function addContacts(newObj) {
    return axios.post(baseURL, newObj)
}

// works
function deleteContacts(id) {
    return axios.delete(`${baseURL}/${id}`)
}

export default { getAllContacts, updateContacts, addContacts, deleteContacts }