import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import usercontext from '../Context/User/usercontext'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import NProgress from 'nprogress';
import './nprogress.css';

function Login() {
    const context = useContext(usercontext)
    const { setuser } = context

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
            NProgress.done();
            setuser(res.data);
        } catch (err) {
            console.log(err);
            NProgress.done();
            alert(err);
        }
    };


    const logind = async (e) => {
        e.preventDefault();
        NProgress.start();
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
            NProgress.done();
            alert("Invalid Credentials");
        }
    }

    return (
        <div className="">
            <div className="d-flex">
                <form className="container mt-5 mx-2">

                    <h1 style={{ color: "#003152" }} className=" font-weight-normal text-capitalize font-weight-lighter">Stocks Tracker</h1>
                    <br />
                    <br />
                    <h3 className="font-weight-lighter">LogIN</h3>

                    <div className="form-group mt-4">
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

                    <button type="submit" className="btn btn-dark btn-lg btn-block mt-4" onClick={logind}>Log in</button>
                    <Link to="/signup" className="btn btn-light btn-md btn-block">Create an account</Link>
                </form>
                <img src={process.env.PUBLIC_URL + "/loginimg.jpg"} alt="#" className="" width="1000" height="791" />
            </div>
        </div>
    )
}

export default Login
