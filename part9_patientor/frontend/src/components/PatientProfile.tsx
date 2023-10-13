import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import { Patient } from "../types";
import patientService from '../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

function PatientProfile() {
    const {patientId} = useParams();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
            const result = await patientService.getSelectedPatient(patientId!);
            setPatient(result);
        };
        void fetchPatient();
    }, []);

    return (
        <div>
            <h1>
                {patient?.name} <span>{ patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon /> }</span>
            </h1>
            <div>
                ssh: {patient?.ssn}
                <br />
                occupation: {patient?.occupation}
            </div>
        </div>
    )
}

export default PatientProfile
