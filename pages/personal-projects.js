import Base from "../components/Base";

export default function Projects() {
    return (
        <Base>
            <div>
                <div className="column col-8 col-mx-auto">
                    <h1>Personal Projects</h1>
                    <ul>
                        <li>
                            <p>GitHub</p>
                            <a className="btn" href="https://github.com/UltravioletVoodoo" target="_blank">GitHub</a>
                        </li>
                        <li>
                            <p>D&D Character Generator</p>
                            <a className="btn" href="https://ultravioletvoodoo.github.io/Character_Generator/" target="_blank">Character Generator</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Base>
    );
}