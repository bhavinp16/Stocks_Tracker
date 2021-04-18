import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import usercontext from '../Context/User/usercontext';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import NProgress from 'nprogress';
import './nprogress.css';

function Signup() {
    const context = useContext(usercontext)
    const { setuser } = context;

    const initialState = {
        name: "",
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
            NProgress.done();
            console.log("Signed In");
            setuser(res.data);
        } catch (err) {
            console.log(err);
            NProgress.done();
        }
    };

    const signupsubmit = async (e) => {
        e.preventDefault();
        NProgress.start();
        // Register User
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post("http://localhost:5000/api/users/", JSON.stringify(formdata), config);
            if (res.status === 400) {
                alert(res.data.msg);
            }
            localStorage.setItem('token', res.data.token);
            loadUser();
        } catch (err) {
            console.log(err);
            NProgress.done();
            alert("Server Error");
        }
    }

    return (
        <>
            <div className="d-flex">

                <img src={process.env.PUBLIC_URL + "/loginimg.jpg"} alt="#" className="" width="1000" height="791" />

                <form className="container mt-5 mx-2">
                    <h1 style={{ color: "#003152" }} className=" font-weight-normal text-capitalize font-weight-lighter">Stocks Tracker</h1>
                    <br />
                    <br />
                    <h3 className="font-weight-lighter">SignUP</h3>

                    <div className="form-group mt-4">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" onChange={handlechange} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handlechange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handlechange} />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block mt-4" onClick={signupsubmit}>Register</button>

                    <Link to="/login" className="btn btn-light btn-md btn-block">Already have an account</Link>
                </form>
            </div>
        </>
    );
}

export default Signup
