import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import usercontext from '../Context/User/usercontext';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';

function Signup() {
    const context = useContext(usercontext)
    const { user, setuser } = context;

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
            console.log("Signed In");
            setuser(res.data);
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    };

    const signupsubmit = async (e) => {
        e.preventDefault();
        // Register User
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post("http://localhost:5000/api/users/", JSON.stringify(formdata), config);
            console.log(res);
            localStorage.setItem('token', res.data.token);
            loadUser();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form className="container mt-5">
                <h3>Register</h3>

                <div className="form-group">
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

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={signupsubmit}>Register</button>

                <Link to="/login" className="btn btn-light btn-md btn-block">Already have an account</Link>
            </form>

        </>
    );
}

export default Signup
