import { useState } from "react";
import { NavLink } from "react-router";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <nav className="navbar">
            <div className="left">
                <ul>
                    <li className="navbar-item">
                        <NavLink to="/home">Home</NavLink> 
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/community">Community Challenges</NavLink> 
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/learn">Learn</NavLink> 
                    </li>
                </ul>
            </div>
            <div className="right">
                <ul>
                    {isLoggedIn &&
                    <>
                    <li className="navbar-item">
                        <NavLink to="/login">Sign Out</NavLink> 
                    </li>
                    </> ||
                    <>
                    <li className="navbar-item">
                        <NavLink to="/login">Sign In</NavLink> 
                    </li>
                    <li className="navbar-item register-button">
                        <NavLink to="/register">Register</NavLink> 
                    </li>
                    </>
                    }
                </ul>
            </div>
        </nav>
    )
}
