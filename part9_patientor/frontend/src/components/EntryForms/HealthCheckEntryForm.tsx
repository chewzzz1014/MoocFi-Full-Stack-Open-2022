import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button} from '@mui/material';
import { EntryFormProps } from "../../types";

const HealthCheckEntryForm = ({ onClose, onSubmit }: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthcheckRating, setHealthcheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const clearFields =() => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthcheckRating('');
    setDiagnosisCodes('');
  };

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
    }, clearFields);
  };

  const invalidHealthCheckRating = (): boolean => {
    if (healthcheckRating !== '') {
      return isNaN(Number(healthcheckRating)) && (
              (Number(healthcheckRating) !== 0) ||
              (Number(healthcheckRating) !== 1) ||
              (Number(healthcheckRating) !== 2)
            );
    }
    return false;
  };

  return (
    <div style={{marginBottom: "80px"}}>
      <h3>New Health Check Entry</h3>
      <form onSubmit={addPatient}>
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          label="Healthcheck rating"
          fullWidth
          value={healthcheckRating}
          onChange={({ target }) => setHealthcheckRating(target.value)}
          error={invalidHealthCheckRating()}
          />
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
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
              onClick={onClose}
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

export default HealthCheckEntryForm;