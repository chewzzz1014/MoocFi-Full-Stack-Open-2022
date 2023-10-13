import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import { Diagnosis, Patient } from "../types";
import patientService from '../services/patients';
import diagnosesService from "../services/diagnoses";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

function PatientProfile() {
    const {patientId} = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [codesWithDetails, setCodesWithDetails] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchPatient = async () => {
            const result = await patientService.getSelectedPatient(patientId!);
            setPatient(result);

            if (result?.entries.length) {
                for (let i=0; i<result.entries.length; i++) {
                    if (result.entries[i].diagnosisCodes) {
                        const codes = result.entries[i].diagnosisCodes;
                        diagnosesService
                            .getDiagnosesDesc(codes)
                            .then(data => setCodesWithDetails(data)); 
                    }
                }
            }
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

            <h3>entires</h3>
            {patient?.entries.map((x, idx1) => (
                <div key={idx1}>
                    <p>{x.date} {x.description}</p>
                    {codesWithDetails?.map((c, idx2) => <li key={idx2}>{c.code} {c.name}</li>)}
                </div>
            ))}
        </div>
    )
}

export default PatientProfile
