import express from 'express'
import diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils'
import { NonSensitiveEntries } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diaryService.getNonSensitiveEntries())
})

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id))

    if (diary) res.send(diary)
    else res.sendStatus(404)
})

router.post('/', (req, res) => {
    try{
        const newEntry = toNewDiaryEntry(req.body)

        const addedEntry = diaryService.addDiary(newEntry)
        res.json(addedEntry as NonSensitiveEntries)
    } catch(error: unknown){
        let errorMsg = ''
        if (error instanceof Error) {
            errorMsg += `Error: ${error.message}`
        }
        res.status(400).send(errorMsg)
    }
})

export default router