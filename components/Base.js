import Navbar from "./Navbar";
import spectre from "spectre.css";
import "../styles/baseStyle.css";

const Base = props => (
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Navbar />
        {props.children}
    </>
)

export default Base;