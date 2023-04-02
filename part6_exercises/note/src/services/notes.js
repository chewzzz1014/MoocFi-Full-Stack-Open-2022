import axios from 'axios'

const BASE_URL = 'http://localhost:3001/notes'

const getAll = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}

const createNew = async (content) => {
    const object = { content, important: false}
    const response = await axios.post(BASE_URL, object)
    return response.data
}

export { 
    getAll,
    createNew
}
