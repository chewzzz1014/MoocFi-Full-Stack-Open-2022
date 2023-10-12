import { HeaderProps } from "../types"

function Header(props: HeaderProps) {
    return (
        <h1>{props.courseName}</h1>
    )
}

export default Header