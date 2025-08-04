import React, { useState } from "react";
import MatchingTiles from "./MatchingTiles/MatchingTiles";
import Jigsaw from "./Jigsaw/Jigsaw";
import { Outlet, Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
    const [activeGame, setActiveGame] = useState(null);

    // const renderGame = () => {
    //     switch (activeGame) {
    //         case "jigsaw":
    //             return <Jigsaw />;
    //         case "matching":
    //             return <MatchingTiles />;
    //         default:
    //             return null;
    //     }
    // };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>🎮 Mini Broswer Games</h1>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Link to="/jigsaw" className = "button">🧩 Jigsaw Puzzle</Link>
                <Link to="/matching-tiles" className = "button">🃏 Matching Tiles</Link>
                <Link to="/" className = "button">🏠 Home</Link>
            </div>
           <p style={{ textAlign: 'center' }}>Pick a game to get started!</p>
        </div>
        
    )
}

export default Home;