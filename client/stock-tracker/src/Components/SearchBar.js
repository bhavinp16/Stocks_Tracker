import React, { useState, useEffect } from 'react';
import axios from 'axios';

// to add search bar suggestions and make api calls on submit

function SearchBar() {

    const [inputt, setinputt] = useState("");

    const handleChange = (e) => {
        setinputt(e.target.value);
    }

    const searchStock = (e) => {
        e.preventDefault();
        // here to make the api request and also create stock context to store current stock information  based on the inputt state


    }

    useEffect(() => {   //for autocomplete suggestions
        if (inputt.length !== 0) {
            //here to create an api key to make the req and display the json data
            axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputt}&apikey=demo`)
                .then(function (response) {
                    // handle success
                    console.log(response.json());
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }, [inputt])

    return (
        <div>
            <input type="text" className=" w-75 p-lg-2 m-lg-5 h-25" placeholder="Enter the stock name you want to search for: " onChange={handleChange} />
            <button onclick={searchStock} > Search </button>
        </div>
    )
}

export default SearchBar
