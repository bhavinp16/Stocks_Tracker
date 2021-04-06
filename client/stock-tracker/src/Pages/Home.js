import React from 'react'
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/SearchBar'

function home() {
    return (
        <div>
            <Navbar />
            <SearchBar />

            <div className="mx-lg-5 my-2">
                <h6 className="ml-lg-5">In the short run, the market is a voting machine, but in long run its a weighing machine.
            <br />
                    <h6 className="d-flex flex-row-reverse mr-lg-5">-Benjamin Graham</h6>
                </h6>
            </div>

        </div>
    )
}

export default home
