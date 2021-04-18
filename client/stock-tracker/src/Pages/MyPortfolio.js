import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';
import './nprogress.css';
import { useToasts } from 'react-toast-notifications';

function MyPortfolio() {

    const { addToast } = useToasts();

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

    const deleteStock = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/stocks/${id}`);
            getStock();
            NProgress.done();
            addToast("Stock Removed From Your Portfolio", { appearance: 'error', autoDismiss: true });
        } catch (err) {
            NProgress.done();
            console.log(err);
        }
    }

    const getRealtimeData = async (symbol) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/search?searchquery=${symbol}%20yahoo`);
            NProgress.done();
            addToast(<div>
                <br />
                <h5>{`${symbol}:`}</h5>
                <br />
                <h6>{`======> Price: [ ${res.data.price} ]`}</h6>
                <br />
                <h6>{`======> Change: [ ${res.data.change} ] `}</h6>
            </div>, { appearance: 'success' });
        } catch (err) {
            NProgress.done();
            console.log(err);
        }
    }

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <div className="container mt-lg-5 mr-5 overflow-scroll">
                    <h7 className="mt-5">.</h7>
                    {!mystocks?.[0]
                        ? <h3 className="text-bold bold"> NO STOCKS ADDED TO YOUR PORTFOLIO </h3>
                        :
                        (
                            <>
                                <h3 className="font-weight-light">Users portfolio</h3>
                                {mystocks.map((stock) => {
                                    return (
                                        <Link to={`/stock/${stock.symbol}`} className="btn btn-block btn-light w-100 m-3" >
                                            <div className="d-flex justify-content-between align-content-center mx-2">
                                                {stock.symbol}
                                                <div>
                                                    <button type="button" className="btn btn-dark mx-5 font-smaller font-weight-lighter" onClick={((e) => {
                                                        e.preventDefault();
                                                        NProgress.start();
                                                        getRealtimeData(stock.symbol)
                                                    })}>
                                                        Get Realtime Data
                                                    </button>
                                                    <button type="button" className="close" aria-label="Close" onClick={(e) => {
                                                        e.preventDefault();
                                                        NProgress.start();
                                                        deleteStock(stock._id)
                                                    }
                                                    }>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </>
                        )
                    }
                </div>
                <img src={process.env.PUBLIC_URL + "/homeimgg.png"} alt="#" className="" width="800" height="791" />
            </div>
        </>
    )
}

export default MyPortfolio
