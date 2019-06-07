export function AddBtn(props) {
    return <button onClick={props.onClick}>
        {props.label}
    </button>
}