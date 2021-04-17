import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

            //get search endpoints
            fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputt}&apikey=${apikey}`)
                .then(response => response.json())
                .then(data => {
                    // handle success
                    const bestMatches = data.bestMatches;
                    setsuggArray(bestMatches);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    }


    return (
        <div className="mt-5 d-flex flex-column w-100">
            <div className="ml-5 mt-2 input-group w-75">
                <input type="search" className="p-lg-2 m-lg-3 h-25 form-control" placeholder="Enter the stock name you want to search for: " onChange={handleChange} />
                <button onClick={searchStock} className="btn btn-dark btn-lg shadow-sm m-lg-3"> Search </button>
            </div>

            {

                suggArray[1]
                    ?
                    (
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
                            <h1 className="font-weight-lighter">
                                Select the Stock,
                            <br /> which you would like
                            <br /> to know more about
                            </h1>
                        </div>
                    )
                    :
                    (
                        <div className="jumbotron">
                            <h1 className=" m-lg-5 p-lg-5 font-weight-lighter">
                                Search for a Stock,
                            <br /> which you would like
                            <br /> to know more about
                            </h1>
                        </div>
                    )
            }

        </div>
    )
}

export default SearchBar
