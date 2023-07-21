const express = require('expresss')
const app = express()

app.get('/ping', (req, res) => {
    res.send('pong')
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})