import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom';

function MyPortfolio() {

    const [mystocks, setmystocks] = useState(null);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/stocks/');
            setmystocks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="container mt-lg-5">
                    <h4 className="text-bold">Current Stock Prices of Stocks in users Portfolio displayed</h4>
                    {!mystocks
                        ? <h4 className="text-bold bold"> NO STOCKS ADDED TO YOUR PORTFOLIO </h4>
                        :
                        (
                            mystocks.map((stock) => {
                                return (
                                    <Link to={`/stock/${stock.symbol}`} className="btn btn-block btn-dark w-75 m-3" > {stock.symbol}</Link>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default MyPortfolio
