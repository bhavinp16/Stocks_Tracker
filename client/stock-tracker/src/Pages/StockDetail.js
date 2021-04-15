import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';
import Stock from '../Components/Stock';

function StockDetail(props) {

    // catch the name of the stock from the url 
    const stocksymbol = props.match.params.name;

    const [GeneralData, setGeneralData] = useState();

    // make api call to fetch the stock details
    //rapidapi key used
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: { function: 'GLOBAL_QUOTE', symbol: `${stocksymbol}` },
        headers: {
            'x-rapidapi-key': 'd6bd8362c3msh180930e5c56b072p1ca825jsn731ccf821720',
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    axios.request(options)
        .then(function (response) {
            setGeneralData(response.data["Global Quote"]);
            console.log(GeneralData);
        }).catch(function (error) {
            console.error(error);
        });


    //make api call to fetch historical data about the stock



    return (
        <div >
            <Navbar />
            <SearchBar />
            <div className="d-flex flex-row">
                {/* Basic stock details */}
                <div className="jumbotron container w-25" style={{ color: "grey", fontSize: "20px" }}>
                    <h2 className="ml-5 mb-4 text-dark">Stock Details :</h2>
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
                        <button className="mt-4 btn btn-dark w-75">Add to Portfolio</button>
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
