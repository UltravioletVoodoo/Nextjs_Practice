import Base from "../components/Base";

export default function Work() {
    return (
        <Base>
            <div className="columns">
                <div className="column col-8 col-mx-auto">
                    <h1>Work</h1>
                    <p>
                        Throughout my degree at UVic I have had the oppourtunity to go on a number of co-op work
                        terms with canadian software companies to improve my skillset.
                    </p>

                    <ul>
                        <li>
                            <p>Noratek</p>
                            <a href="http://www.noratek.com/" class="btn" target="_blank">Noratek</a>
                        </li>
                        <li>
                            <p>University of Victoria Bookstore</p>
                            <a href="https://www.uvicbookstore.ca/" class="btn" target="_blank">UVic Bookstore</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Base>
    );
}