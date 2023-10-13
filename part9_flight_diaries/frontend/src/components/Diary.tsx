import { DiaryProps } from "../types"

export default function Diary(props: DiaryProps) {
    const diary = props.diary

    return (
        <div>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
        </div>
    )
}
