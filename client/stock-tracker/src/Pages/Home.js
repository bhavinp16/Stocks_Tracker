import React from 'react'
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/SearchBar'

function Home() {

    return (
        <div>
            <Navbar />
            <SearchBar />

            <div className="d-flex justify-content-between m-2 font-italic font-weight-lighter">
                <h6 className="ml-lg-5">In the short run, the market is a voting machine, but in long run its a weighing machine.</h6>
                <h6 className="mr-lg-5 mb-3">-Benjamin Graham</h6>
            </div>
        </div>
    )
}

export default Home;
