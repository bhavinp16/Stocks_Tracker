import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import usercontext from '../Context/User/usercontext'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';

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


    // Load User
    const loadUser = async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('http://localhost:5000/api/auth/');
            console.log("Logged In");
            setuser(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    const logind = async (e) => {
        e.preventDefault();
        // Login User
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post("http://localhost:5000/api/auth/", JSON.stringify(formdata), config);
            localStorage.setItem('token', res.data.token);
            loadUser();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="outer">
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

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={logind}>Log in</button>
                <Link to="/signup" className="btn btn-light btn-md btn-block">Create an account
                </Link>
            </form>

        </div>
    )
}

export default Login
