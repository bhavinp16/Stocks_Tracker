import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'

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
            <div>
                <ul>
                    <h1>Current Stock Prices of Stocks in users Portfolio displayed</h1>
                    {!mystocks
                        ? <h5> NO STOCKS ADDED TO YOUR PORTFOLIO </h5>
                        :
                        (
                            mystocks.map((stock, key) => {
                                return (
                                    <li> {stock.symbol} </li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default MyPortfolio
