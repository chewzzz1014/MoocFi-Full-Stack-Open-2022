import { TotalProps } from "../types"

function Total(props: TotalProps) {
    return (
        <p>Number of exercises {props.totalExercises}</p>
    )
}

export default Total