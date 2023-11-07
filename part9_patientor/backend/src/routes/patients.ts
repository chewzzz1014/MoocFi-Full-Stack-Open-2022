import express from 'express'
import patientService from '../services/patientService'
import toNewEntry from '../utils'
import { Entry } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getPatient())
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    res.send(patientService.getSelectedPatient(id))
})

router.post('/:id/entries', (req, res) => {
    try {
        const {id} = req.params
        const newEntry = toNewEntry(req.body)

        const addedEntry = patientService.addEntry(id, newEntry)
        res.json(addedEntry as Entry)
    } catch (error: unknown) {
        let errorMsg = ''
        if (error instanceof Error) {
            errorMsg += `${error.message}`
        }
        res.status(400).send(errorMsg)
    }
})
export default router