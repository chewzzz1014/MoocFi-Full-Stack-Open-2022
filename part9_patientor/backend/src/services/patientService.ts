import patientData from '../../data/patients'
import { Patient, ProtectedPatient } from '../types'

const getPatient = (): ProtectedPatient[] => {
    return patientData
}

const getSelectedPatient = (id: string): Patient | string => {
    return patientData.find(x => x.id === id) || 'No record found!'
}

export default {
    getPatient,
    getSelectedPatient,
}

