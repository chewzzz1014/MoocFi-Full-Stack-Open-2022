import { EntryProps } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

export default function HealthCheck(props: EntryProps) {
    const {entry, codesWithDetails} = props;
    const ratingColor = {
        0: 'green',
        1: 'yellow',
        2: 'orange',
        3: 'red'
    };

    return (
        <div style={{border: "1px solid #000", marginBottom: "10px", borderRadius: "8px", padding: "5px",}}>
            <p>{entry.date} <MedicalInformationIcon /></p>
            <p><i>{entry.description}</i></p>
            <p><FavoriteIcon style={{ color: ratingColor[entry.healthCheckRating] }} /></p>
            {codesWithDetails?.map((c, idx2) => <li key={idx2}>{c.code} {c.name}</li>)}
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    )
}
