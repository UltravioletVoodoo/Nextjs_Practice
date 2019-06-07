
let toggleBtnStyle = {
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

export function ToggleBtn(props) {
    return <button style={toggleBtnStyle} onClick={props.onClick}>
        {props.label}
    </button>
}