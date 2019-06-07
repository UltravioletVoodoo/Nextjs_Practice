export function ToggleBtn(props) {
    return <button onClick={props.onClick}>
        {props.label}
    </button>
}