import "../styles/Navbar.css";

const Navbar = () => (
    <div id="navbar" className="container">
        <div className="columns">
            <div className="navbar column col-12">
                <section className="navbar navbar-section">
                    <div className="col-3">
                        <a href="/" className="navBarBtn">Home</a>
                    </div>
                    <div className="col-3">
                        <a href="/about" className="navBarBtn">About</a>                    
                    </div>
                    <div className="col-3">
                        <a href="/work" className="navBarBtn">Work</a>                    
                    </div>
                    <div className="col-3">
                        <a href="/personal-projects" className="navBarBtn">Projects</a>                        
                    </div>
                </section>
            </div>
        </div>
    </div>
);

export default Navbar;