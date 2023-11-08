import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, InputLabel } from '@mui/material';
import { EntryFormProps } from "../../types";

const OccupationalHealthcareEntryForm = ({ onClose, onSubmit }: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const clearFields =() => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const splitedDiagnosisCoders = diagnosisCodes.trim() ? diagnosisCodes.split(/(?:,| )+/) : [];

    onSubmit({
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      diagnosisCodes: splitedDiagnosisCoders,
      employerName,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
      }
    }, clearFields);
  };

  return (
    <div style={{marginBottom: "80px"}}>
      <h3>New Occupational Healthcare Entry</h3>
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
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          label="Employer"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <InputLabel sx={{marginTop: "10px", marginBottom: "10px"}}>Sickleave</InputLabel>
        <TextField
          variant="standard"
          sx={{marginLeft: "10px"}}
          InputLabelProps={{ shrink: true }}
          label="Start Date"
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          variant="standard"
          sx={{marginLeft: "10px"}}
          InputLabelProps={{ shrink: true }}
          label="End Date"
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default OccupationalHealthcareEntryForm;