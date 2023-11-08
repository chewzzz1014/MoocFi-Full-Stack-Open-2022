import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, InputLabel } from '@mui/material';

interface Props {
  onClose: () => void;
  onSubmit: (values: unknown, func: () => void) => void;
  error: undefined | string;
}


const HospitalEntryForm = ({ onClose, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const clearFields =() => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const splitedDiagnosisCoders = diagnosisCodes.trim() ? diagnosisCodes.split(/(?:,| )+/) : [];

    onSubmit({
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes: splitedDiagnosisCoders,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    }, clearFields);
  };

  return (
    <div style={{marginBottom: "80px"}}>
      <h3>New Hospital Entry</h3>
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
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <InputLabel sx={{marginTop: "10px", marginBottom: "10px"}}>Discharge</InputLabel>
        <TextField
          variant="standard"
          sx={{marginLeft: "10px"}}
          InputLabelProps={{ shrink: true }}
          label="Date"
          type="date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          variant="standard"
          sx={{marginLeft: "10px"}}
          InputLabelProps={{ shrink: true }}
          label="Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalEntryForm;