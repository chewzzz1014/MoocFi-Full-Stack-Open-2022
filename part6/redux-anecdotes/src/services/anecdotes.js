import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(BASE_URL, {
        content,
        votes: 0
    })
    return response.data
}

const increaseVote = async (id) => {
    const anecdote_res = await axios.get(BASE_URL)
    const anecdote = anecdote_res.data.find(a => a.id === id)

    const response = await axios.put(`${BASE_URL}/${id}`, {
        ...anecdote,
        votes: anecdote.votes + 1
    })
    return response.data
}

export {
    getAll,
    createNew,
    increaseVote
}