import patientData from '../../data/patients'
import { Patient, ProtectedPatient, EntryWithoutId } from '../types'
import { v4 as uuidv4 } from 'uuid';

let patients: Patient[] = patientData

const getPatient = (): ProtectedPatient[] => {
    return patients
}

const getSelectedPatient = (id: string): Patient | string => {
    return patients.find(x => x.id === id) || 'No record found!'
}

const addEntry = (patientId: string, entry: EntryWithoutId) => {
    const newEntry = {
        id: uuidv4(),
        ...entry
    }

    const foundPatient = patients.find(p => p.id === patientId)
    if (!foundPatient) {
        throw new Error ('Patient record is unavailable')
    } else {
        let updatedPatientEntry = {...foundPatient, entries: foundPatient.entries.push(newEntry)}
        patients = patients.map(p => p.id === patientId ? updatedPatientEntry : p)
    }
    
    return newEntry
}

export default {
    getPatient,
    getSelectedPatient,
    addEntry
}

