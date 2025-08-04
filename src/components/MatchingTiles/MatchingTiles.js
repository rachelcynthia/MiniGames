import { useState, useEffect } from "react";
import "./MatchingTiles.css";
import { Link } from "react-router-dom";
import "../Home.css";

const themes = {
  Food: ["🍎", "🍌", "🍒", "🍇", "🍍", "🥝"],
  Animals: ["🐶", "🐱", "🐰", "🦁", "🐻", "🐼"],
  Planets: ["🌍", "🪐", "☀️", "🌑", "🌕", "⭐"],
};

const MatchingTiles = () => {
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Food");

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const startGame = () => {
    const selectedSet = themes[selectedTheme];
    setTiles(shuffleArray([...selectedSet, ...selectedSet]));
    setFlipped([]);
    setMatched([]);
    setTime(0);
    setGameActive(true);
  };

  const restartGame = () => {
    setGameActive(false);
    setTiles([]);
    setFlipped([]);
    setMatched([]);
    setTime(0);
  }


  useEffect(() => {
    let timer;
    if (gameActive) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (tiles[first] === tiles[second]) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped, tiles]);

  useEffect(() => {
    if (matched.length === tiles.length && tiles.length > 0) {
      setGameActive(false);
    }
  }, [matched, tiles]);

  return (
    <div className="container">
      <h1 className="title"> Matching Tiles Game</h1>

      {!gameActive && (
        <>
          <p>Select a Theme:</p>
          <div className="theme-selector">
            {Object.keys(themes).map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`theme-button ${selectedTheme === theme ? "active" : ""}`}
              >
                {theme}
              </button>
            ))}
          </div>
          <button onClick={startGame} className="start-button">
            ▶️ Start Game
          </button>
        </>
      )}

      {gameActive && (
        <>
          <p>⏱️ Time: {time}s</p>
          <div className="board">
            {tiles.map((tile, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              return (
                <div
                  key={index}
                  className={`tile-wrapper`}
                  onClick={() => handleFlip(index)}
                >
                  <div className={`tile ${isFlipped ? "flipped" : ""}`}>
                    <div className="tile-face tile-front">❓</div>
                    <div className="tile-face tile-back">{tile}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!gameActive && matched.length > 0 && (
        <h2 className="win-text">🎉 You matched all tiles in {time}s!</h2>
      )}

      {gameActive && (
        <button onClick={restartGame} className="restart-button">
          🔄 Restart
        </button>
      )}
      <Link to="/" className="button">🏠 Home</Link>
    </div>
  );
}

export default MatchingTiles;