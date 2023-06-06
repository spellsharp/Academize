import React  from "react";
import "./navbar.css";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from "./assets/newerlogo.png";

const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
          setIsAuth(true);
        }
      }, [isAuth]);
    
    return (
        <>
        <nav className="stickyNav">
            <nav className="main-nav" style={{height:'90px'}}>
                <div>
                    <Link to="/home">
                        <img style={{marginTop:'7px'}} src={logo} alt="ACADEMIZE" className="App-logo"/>
                    </Link>
                </div>
                <div className= {showMediaIcons ? "menu-link mobile-menu-link" : "menu-link" }>
                    <ul>
                        <li>
                            <Link to="/student" style={{}} onClick={() => setShowMediaIcons(false)}>GPA</Link>
                        </li>
                        <li>
                            <Link to="/marks" style={{}} onClick={() => setShowMediaIcons(false)}>Marks</Link>
                        </li>
                        <li>
                            <Link to="/add" style={{}} onClick={() => setShowMediaIcons(false)}>Add Marks</Link>
                        </li>
                        <li>
                            <Link to="/addStudents" style={{}} onClick={() => setShowMediaIcons(false)}>Students</Link>
                        </li>
                        <li>
                            {isAuth ?
                            <Link to="/logout" >Logout</Link>:
                            <Link to="/" style={{}} >Login</Link>
                             }
                        </li>
                    </ul>
                </div>
                <div className="social-media">
                    <div className="hamburger-menu">
                        <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                            <FaBars style={{color:'white'}}/>
                        </a>
                    </div>
                </div>
            </nav>
            </nav>
        </>
    );
};

export default Navbar;