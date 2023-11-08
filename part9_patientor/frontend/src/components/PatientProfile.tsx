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
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import HealthCheckEntryForm from "./EntryForms/HealthCheckEntryForm";
import HospitalEntryForm from "./EntryForms/HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./EntryForms/OccupationalHealthcareEntryForm";
import EntryFormOption from "./EntryForms/EntryFormOption";
import { AxiosError } from "axios";

function PatientProfile() {
    const {patientId} = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [codesWithDetails, setCodesWithDetails] = useState<Diagnosis[]>([]);
    // for entry form
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entryFormType, setEntryFormType] = useState('')

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
        setEntryFormType('');
    };

    const submitModalData = (data: unknown, callbackFunc: () => void): void => {
        console.log(data);
        patientService.addEntry(patientId!, data)
            .then((response) => {
                setError(undefined);
                callbackFunc();
                console.log(response.data);
            })
            .catch((err: unknown) => {
                if (err instanceof AxiosError) {
                    setError(err.response?.data);
                }
            });
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

            {error && <Alert severity="error">{error}</Alert>}

            {/* TODO: select field to select type of entry form */}
            <EntryFormOption />
            {modalOpen && 
                <HealthCheckEntryForm
                    modalOpen={modalOpen}
                    error={error}
                    onClose={closeModal}
                    onSubmit={submitModalData}
                />
            }

            {modalOpen && 
                <HospitalEntryForm
                    modalOpen={modalOpen}
                    error={error}
                    onClose={closeModal}
                    onSubmit={submitModalData}
                />
            }

            {modalOpen && 
                <OccupationalHealthcareEntryForm
                    modalOpen={modalOpen}
                    error={error}
                    onClose={closeModal}
                    onSubmit={submitModalData}
                />
            }

            {!modalOpen && 
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>
            }

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
