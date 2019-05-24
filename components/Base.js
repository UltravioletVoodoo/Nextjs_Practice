import Navbar from "./Navbar";
import spectre from "spectre.css";
import "../styles/baseStyle.css";

const Base = props => (
    <div>
        <Navbar />
        {props.children}
    </div>
)

export default Base;