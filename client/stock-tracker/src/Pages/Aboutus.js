import React from 'react'
import Navbar from '../Components/Navbar'

function Aboutus() {
    return (
        <>
            <Navbar />
            <div className="jumbotron flex m-lg-5 p-lg-5">
                <div className="container w-50">
                    <h1> <b>ABOUT US</b></h1>
                    <br />
                    <h5 className="font-weight-lighter">
                        There are a lot of stocks in the market to select a stock. <br />
                        We need to do a proper study of the previous trends and data. <br />
                        Also after going through all that trouble it's difficult to manage the stocks in our portfolio and keeping track of them all at once. <br />
                        Hence, we decided to address this issue and created this website to ease the process. <br />
                    </h5>
                    <h6 className="d-flex justify-content-end">- Stocks Tracker</h6>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default Aboutus
