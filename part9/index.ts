import express from 'express'
const app = express()

// the noUnusedParameters is set to true
// prefix the unused variable with _ to inform compiler we knew abt this and nothing we can do
app.get('/ping', (_req, res) => {
    res.send('pong')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})