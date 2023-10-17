import React from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png"

export default function NavBar({ changeDisplay }) {

    return (
        <nav>
            <img src={logo} alt="20 Sided Dice" id="navBarImg" />
            <h1 className="navBarTitle">D&D 5e Player Tracker</h1>
            <ul className="navBarList">
                <button className="navBarButton" value="playerDisplay" onClick={changeDisplay}>Player</button>
                <button className="navBarButton" value="playerForm" onClick={changeDisplay}>Add Player</button>
                <button className="navBarButton" >Monster Manual</button>
                <button className="navBarButton" >Item Manual</button>
            </ul>
        </nav>
    );
}
