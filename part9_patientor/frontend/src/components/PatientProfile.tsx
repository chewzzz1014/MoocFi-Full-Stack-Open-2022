import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import { Diagnosis, Patient } from "../types";
import patientService from '../services/patients';
import diagnosesService from "../services/diagnoses";
import HealthCheck from "./Entry/HealthCheck";
import Hospital from "./Entry/Hospital";
import OccHealthcare from "./Entry/OccHealthcare";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button } from "@mui/material";
import EntryForm from "./Entry/EntryForm";

function PatientProfile() {
    const {patientId} = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [codesWithDetails, setCodesWithDetails] = useState<Diagnosis[]>([]);
    // for entry form
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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
            <div style={{ marginBottom: "20px" }}> 
                <h1>
                    {patient?.name} <span>{ patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon /> }</span>
                </h1>
                <div>
                    ssh: {patient?.ssn}
                    <br />
                    occupation: {patient?.occupation}
                </div>
            </div>

            <EntryForm
                modalOpen={modalOpen}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>

            <div>
                {patient?.entries.length ? <h3>entries</h3> : ''}
                {patient?.entries.map((x, idx) => {
                    switch(x.type) {
                        case 'HealthCheck':
                            return <HealthCheck key={idx} entry={x} codesWithDetails={codesWithDetails} />;
                        case 'Hospital':
                            return <Hospital key={idx} entry={x} codesWithDetails={codesWithDetails} />;
                        case 'OccupationalHealthcare':
                            return <OccHealthcare key={idx} entry={x} codesWithDetails={codesWithDetails} />;
                    }
                })}
            </div>
        </div>
    )
}

export default PatientProfile;
