import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom';
import usercontext from '../Context/User/usercontext';

function Signup() {
    const context = useContext(usercontext)
    const { user, setuser } = context;

    const initialState = {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    }
    const [formdata, setformdata] = useState(initialState)

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value.trim(),  //to clear any whitespaces before or after 
        })
    }

    const signupsubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form className="container mt-5">
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstname" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastname" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={signupsubmit}>Register</button>

                <Link to="/login" className="btn btn-light btn-md btn-block">Already have an account</Link>
            </form>

        </>
    );
}

export default Signup
