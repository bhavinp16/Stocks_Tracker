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

        // here to make the api request and also create stock context to store current stock information  based on the inputt state
    }

    
    return (
        <>
            <div className="">
                <input type="text" className=" w-75 p-lg-2 m-lg-5 h-25" placeholder="Enter the stock name you want to search for: " onChange={handleChange} />
                <button onclick={searchStock} className="btn btn-primary btn-lg"> Search </button>
            </div>


            <ul>
                {
                    suggArray.map((obj) => {
                        return (
                            <button className="flex w-full" > {obj["2. name"]} </button>
                        )
                    })
                }
            </ul>

        </>
    )
}

export default SearchBar
