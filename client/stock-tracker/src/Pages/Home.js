import React from 'react'
import HomeBody from '../Components/HomeBody'
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/SearchBar'

function home() {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <HomeBody />
        </div>
    )
}

export default home
