import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import Stock from '../Components/Stock';
import axios from 'axios';

function StockDetail(props) {

    // catch the name of the stock from the url 
    const stocksymbol = props.match.params.name;

    const [GeneralData, setGeneralData] = useState();

    // make api call to fetch the stock details
    // rapidapi key used
    useEffect(() => {
        fetch(`https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${stocksymbol}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d6bd8362c3msh180930e5c56b072p1ca825jsn731ccf821720",
                "x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setGeneralData(data["Global Quote"]);
            })
            .catch(err => {
                console.error(err);
            });
    }, [stocksymbol]);


    const addStock = async () => {
        const stock = {
            symbol: stocksymbol
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            await axios.post('http://localhost:5000/api/stocks/', JSON.stringify(stock), config);
            alert("Stock Successfully Added To Your Portfolio");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div >
            <Navbar />
            <div className="d-flex flex-row mt-lg-4">
                {/* Basic stock details */}
                <div className="d-flex flex-column justify-content-center jumbotron container w-25 mb-0" style={{ color: "grey", fontSize: "20px" }}>
                    <div><h2 className="ml-5 mb-4 text-dark">Stock Details </h2>
                        <b>Stock :&nbsp;&nbsp;</b> {GeneralData && GeneralData["01. symbol"]}
                        <br />
                        <b>Open :&nbsp;&nbsp;</b> {GeneralData && GeneralData["02. open"]}
                        <br />
                        <b>High :&nbsp;&nbsp;</b> {GeneralData && GeneralData["03. high"]}
                        <br />
                        <b>Low :&nbsp;&nbsp;</b> {GeneralData && GeneralData["04. low"]}
                        <br />
                        <b>Price :&nbsp;&nbsp;</b> {GeneralData && GeneralData["05. price"]}
                        <br />
                        <b>Volume : &nbsp;&nbsp;</b>  {GeneralData && GeneralData["06. volume"]}
                        <br />
                        <b>Latest Trading Day :&nbsp;&nbsp;</b> {GeneralData && GeneralData["07. latest trading day"]}
                        <br />
                        <b>Previous Close :&nbsp;&nbsp;</b> {GeneralData && GeneralData["08. previous close"]}
                        <br />
                        <b>Change :&nbsp;&nbsp;</b> {GeneralData && GeneralData["09. change"]}
                        <br />
                        <b>Change Percent :&nbsp;&nbsp;</b> {GeneralData && GeneralData["10. change percent"]}

                        <div className="d-flex justify-content-center m-2">
                            <button className="mt-4 btn btn-dark w-75" onClick={addStock} >Add to Portfolio</button>
                        </div>
                    </div>

                </div>
                <br />

                {/* Graph of Historical Data */}
                <Stock stocksymbol={stocksymbol} />

            </div>
        </div>
    )
}

export default StockDetail
