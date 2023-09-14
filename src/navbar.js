/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import React from 'react';
import './Navbar.css';
import AppLogo from './AppLogo.png';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <a className="backHome" href="/">
                <img className={"logo"} src={AppLogo} alt={"logo"} width={150} height={130}/>
            </a>

            <div className="links_container">
                <Link to="/" className="links">Home</Link>
                <Link to="/report" className="links">Report</Link>
                <Link to="/about" className="links">About</Link>

            </div>
        </nav>
    );
}

export default Navbar;
