import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(BASE_URL)
    console.log(response.data)
    return response.data
}

export {
    getAll
}