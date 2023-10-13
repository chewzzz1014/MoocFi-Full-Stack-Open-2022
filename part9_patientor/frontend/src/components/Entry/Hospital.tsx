import { EntryProps } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function Hospital(props: EntryProps) {
    const {entry, codesWithDetails} = props;
    return (
        <div style={{border: "1px solid #000", marginBottom: "10px", borderRadius: "8px", padding: "5px",}}>
            <p>{entry.date} <LocalHospitalIcon /></p>
            <p><i>{entry.description}</i></p>
            {entry.discharge ? 
                <div style={{fontWeight: 'bold'}}>
                    Discharge on {entry.discharge.date}
                    <br />
                    Reason of discharge: {entry.discharge.criteria}
                </div> : ''}
            <br/>
            {codesWithDetails?.map((c, idx2) => <li key={idx2}>{c.code} {c.name}</li>)}
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    )
}
