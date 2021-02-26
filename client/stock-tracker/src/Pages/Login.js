import React, { useState, useContext, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import usercontext from '../Context/User/usercontext'


function Login() {
    const context = useContext(usercontext)
    const { user, setuser } = context

    const initialState = {
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

    const logind = (e) => {
        e.preventDefault();
        //database stuff here 
    }

    return (
        <Fragment className="outer">
            <form className="inner container mt-5 ">

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handlechange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handlechange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={logind}>Sign in</button>
                <Link to="/signup" className="btn btn-light btn-md btn-block">Create an account
                </Link>
            </form>

        </Fragment>
    )
}

export default Login
