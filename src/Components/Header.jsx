import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../src/netflix.png"
import {GoSearch} from "react-icons/go" 

const Header = () => {
  return (
    
    <nav className="header">
        <img src={logo} alt="netflix logo" />
        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recent">Recently Added</Link>
            <Link to="/mylist">MyList</Link>
        </div>
        <GoSearch/>
    </nav>
  )
}

export default Header
