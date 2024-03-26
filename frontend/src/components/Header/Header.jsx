import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className="bg-slate-700">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
