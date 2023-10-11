import express from 'express'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/ping', (_req, res) => {
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
