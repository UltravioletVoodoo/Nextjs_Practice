import Base from "../components/Base";

export default function About() {
    return (
        <Base>
            <div className="columns">
                <div className="column col-8 col-mx-auto">
                    
                    <h1>About</h1>
                    <p>
                        Hi there! My name is Jonathan Bezeau. I'm glad you managed to find your way here. Let me tell you a little about myself.
                    </p>
                    
                    <h2>Education</h2>
                    <p>
                        I started my Software Engineering degree at the University of Victoria in September of 2014. I am currently finishing up my degree and plan to graduate in the summer of 2020
                    </p>
                    
                    <h2>Hobbies</h2>
                    <p>
                        In my spare time I like to code personal projects (like this website!) but thats not all that I like to do.
                    </p>
                    <p>
                        I also like to spend my time:
                    </p>
                    <ul>
                        <li>
                            <p>Playing and Running Dungeons and Dragons games</p>
                        </li>
                        <li>
                            <p>Drawing</p>
                        </li>
                        <li>
                            <p>Playing video games</p>
                        </li>
                    </ul>
                </div>
            </div>
        </Base>
    );
}