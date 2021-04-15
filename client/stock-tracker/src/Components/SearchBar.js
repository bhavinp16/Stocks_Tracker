import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// to add search bar suggestions and make api calls on submit

function SearchBar() {

    const apikey = "B1304M15MQ95KRG9";

    const [inputt, setinputt] = useState("");
    const [suggArray, setsuggArray] = useState([]); // to store the suggestion names 

    const handleChange = (e) => {
        setinputt(e.target.value);
    }

    const searchStock = (e) => {
        e.preventDefault();
        if (inputt.length !== 0) {
            //here to create an api key to make the req and display the json data
            axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputt}&apikey=${apikey}`)
                .then(function (response) {
                    // handle success
                    const bestMatches = response.data.bestMatches;
                    setsuggArray(bestMatches);
                    console.log(suggArray);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }


    return (
        <div className="mt-5 d-flex flex-column w-100">
            <div className="ml-5 mt-2 input-group w-75">
                <input type="search" className="p-lg-2 m-lg-3 h-25 form-control" placeholder="Enter the stock name you want to search for: " onChange={handleChange} />
                <button onClick={searchStock} className="btn btn-primary btn-lg shadow-sm m-lg-3"> Search </button>
            </div>

            {
                suggArray[1] &&
                <div className="jumbotron d-flex flex-row justify-content-around">
                    <ul className="overflow-auto">
                        {
                            suggArray.map((obj, key) => {
                                return (
                                    <Link to={`/stock/${obj["1. symbol"]}`} className="btn btn-block btn-dark w-full" > {obj["2. name"]} </Link>
                                )
                            })
                        }
                    </ul>
                    <h1>
                        Select the Stock,
                        <br /> which you would like
                        <br /> to know more about
                    </h1>
                </div>
            }

        </div>
    )
}

export default SearchBar
