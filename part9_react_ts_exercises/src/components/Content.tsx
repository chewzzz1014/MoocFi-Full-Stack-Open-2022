import { ContentProps } from "../types"
import Part from "./Part"

function Content(props: ContentProps) {
    const courseParts = props.courseParts

    return (
        <>
            {courseParts.map((p, idx) => (
                <div key={idx} style={{marginBottom: "15px"}}>
                    <b>{p.name} {p.exerciseCount}</b>
                    <br/>
                    <Part part={p}/>
                </div>
            ))}
        </>
    )
}

export default Content