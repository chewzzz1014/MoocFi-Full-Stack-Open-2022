import { PartProps } from "../types";
import { assertNever } from "../utils";

function Part(props: PartProps) {
    let renderedElement;
    let part = props.part

    switch (part.kind) {
        case "basic":
          renderedElement = (
            <span><i>{part.description}</i></span>
          )
          break;
        case "group":
            renderedElement = (
                <span>project exercises {part.groupProjectCount}</span>
            )
          break;
        case "background":
            renderedElement = (
                <span>
                    <i>{part.description}</i>
                    <br/>
                    submit to {part.backgroundMaterial}
                </span>
            )
          break;
        case "special":
            renderedElement = (
                <span>
                    <i>{part.description}</i>
                    <br/>
                    required skills: {part.requirements.join(', ')}
                </span>
            )
          break;
        default:
          return assertNever(part)
    }
    return renderedElement
}

export default Part