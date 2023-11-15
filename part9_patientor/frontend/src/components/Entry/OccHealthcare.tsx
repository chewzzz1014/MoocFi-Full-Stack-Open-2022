import { EntryProps } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

export default function OccHealthcare(props: EntryProps) {
    const {entry, codesWithDetails} = props;

    const renderSickleave = () => {
        if (entry.sickLeave) {
            return (
                <p>
                    <b>Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</b>
                </p>
            );
        }
    };

    return (
        <div style={{border: "1px solid #000", marginBottom: "10px", borderRadius: "8px", padding: "5px",}}>
            <p>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></p>
            <p><i>{entry.description}</i></p>
            {renderSickleave()}
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
}