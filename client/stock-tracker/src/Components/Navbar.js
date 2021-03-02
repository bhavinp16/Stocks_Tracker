import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import usercontext from '../Context/User/usercontext'

function Navbar() {
    const context = useContext(usercontext);
    const { user, setuser } = context;

    const signout = () => {
        setuser(null);
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/home" className="navbar-brand">Stocks Tracker </Link>
                <ul class="navbar-nav mr-auto ml-5">
                    <li class="nav-item active px-3">
                        <Link to="/home" className="nav-link"> Home </Link>
                    </li>
                    <li class="nav-item px-3">
                        <Link to="/myPortfolio" className="nav-link" > My Portfolio </Link>
                    </li>
                    <li class="nav-item px-3">
                        <Link to="/aboutus" className="nav-link" >About us</Link>
                    </li>
                </ul>
                <div class="my-2 my-lg-0 px-3">
                    <li class="nav-item">
                        <Link className="text-white" onClick={signout}>Sign out</Link>
                    </li>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

