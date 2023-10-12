import { ContentProps } from "../types"

function Content(props: ContentProps) {
    const courseParts = props.courseParts

    return (
        <>
            {courseParts.map((p, idx) => (
                <p key={idx}>
                    {p.name} {p.exerciseCount}
                </p>
            ))}
        </>
    )
}

export default Content