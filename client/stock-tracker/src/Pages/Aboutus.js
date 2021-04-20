import React from 'react'
import Navbar from '../Components/Navbar'

function Aboutus() {
    return (
        <>
            <Navbar />
            <div className="jumbotron flex m-lg-5 p-lg-5">
                <h1> <b>ABOUT US</b></h1>
                <br />
                There are a lot of stocks in the market to select a stock. 
                We need to do a proper study of the previous trends and data. 
                Also after going through all that trouble it's difficult to manage the stocks in our portfolio and keeping track of them all at once. 
                Hence, we decided to address this issue and created this website to ease the process.
                <br />
                <br />
                Created by:
                <br />
                Bhavin Patel
                <br />
                Parth Pawar
            </div>
        </>
    )
}

export default Aboutus
