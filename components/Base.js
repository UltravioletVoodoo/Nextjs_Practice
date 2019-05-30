import Navbar from "./Navbar";
import spectre from "spectre.css";
import "../styles/baseStyle.css";

const Base = props => (
    <>
        <Navbar />
        {props.children}
    </>
)

export default Base;