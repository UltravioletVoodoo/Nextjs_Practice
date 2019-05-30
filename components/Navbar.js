import "../styles/Navbar.css";

const Navbar = () => (
    <div id="navbar" className="container">
        <div className="columns">
            <div className="navbar column col-12">
                <section className="navbar navbar-section">
                    <div className="col-3">
                        <a href="/" className="btn btn-link">Home</a>
                    </div>
                    <div className="col-3">
                        <a href="/about" className="btn btn-link">About</a>                    
                    </div>
                    <div className="col-3">
                        <a href="/work" className="btn btn-link">Work</a>                    
                    </div>
                    <div className="col-3">
                        <a href="/personal-projects" className="btn btn-link">Projects</a>                        
                    </div>
                </section>
            </div>
        </div>
    </div>
);

export default Navbar;