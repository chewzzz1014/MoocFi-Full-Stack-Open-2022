import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button} from '@mui/material';

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: unknown) => void;
  error: undefined | string;
}


const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthcheckRating, setHealthcheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const splitedDiagnosisCoders = diagnosisCodes.trim() ? diagnosisCodes.split(/(?:,| )+/) : [];

    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: splitedDiagnosisCoders,
      healthCheckRating: healthcheckRating
    });
  };

  return (
    <div style={{marginBottom: "80px"}}>
      <h3>New Health Check Entry</h3>
      <form onSubmit={addPatient}>
        <TextField
          variant="standard"
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          variant="standard"
          label="Date"
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          variant="standard"
          label="Healthcheck rating"
          fullWidth
          value={healthcheckRating}
          onChange={({ target }) => setHealthcheckRating(target.value)}
        />
        <TextField
          variant="standard"
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <Grid style={{marginTop: "20px"}}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;