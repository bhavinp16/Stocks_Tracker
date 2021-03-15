import React, { useState } from 'react';
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
        console.log("hello")
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
        <div className="mt-5 d-flex flex-column w-10">
            <div className="ml-4 mt-2">
                <input type="search" className=" w-75 p-lg-2 m-lg-3 h-25 border-gray shadow-sm" placeholder="Enter the stock name you want to search for: " onChange={handleChange} />
                <button onClick={searchStock} className="btn btn-primary btn-lg shadow-sm"> Search </button>
            </div>

            {
                suggArray[1] &&
                <div className="jumbotron d-flex flex-row justify-content-around">
                    <ul className="overflow-auto">
                        {
                            suggArray.map((obj) => {
                                return (

                                    <button className="btn btn-block btn-dark w-full" > {obj["2. name"]} </button>
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

            <div className="mx-lg-5 ">
                <h6 className="ml-lg-5">In the short run, the market is a voting machine, but in long run its a weighing machine.
            <br />
                    <h6 className="d-flex flex-row-reverse mr-lg-5">-Benjamin Graham</h6>
                </h6>
            </div>


        </div>
    )
}

export default SearchBar
