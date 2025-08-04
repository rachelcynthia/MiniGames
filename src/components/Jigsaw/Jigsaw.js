import { useEffect, useState } from "react";
import "./Jigsaw.css";
import Tile from "./Tile";
import { Link } from "react-router-dom";


const GRID_SIZE = 4;
const TILE_SIZE = 100;
const IMAGE_SRC = "/puzzle1.jpg";

export default function Jigsaw() {
    const [tiles, setTiles] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const initialTiles = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                initialTiles.push({
                    id: row * GRID_SIZE + col,
                    correctX: col,
                    correctY: row,
                    x: Math.random() * 300 + 450, // scattered to the right side
                    y: Math.random() * 300 + 50,
                    locked: false,
                });
            }
        }
        setTiles(initialTiles);
    }, []);

    const handleSnap = (id, newX, newY, lock) => {
        setTiles((prevTiles) => {
            const updated = prevTiles.map((tile) =>
                tile.id === id ? { ...tile, x: newX, y: newY, locked: lock } : tile
            );

            const allLocked = updated.every((tile) => tile.locked);
            if (allLocked) setCompleted(true);

            return updated;
        });
    };

    return (
        <div>
            <div className="puzzle-container">
                {/* Drop zones */}
                {[...Array(GRID_SIZE)].map((_, row) =>
                    [...Array(GRID_SIZE)].map((_, col) => (
                        <div
                            key={`${row}-${col}`}
                            className="drop-zone"
                            style={{
                                left: col * TILE_SIZE,
                                top: row * TILE_SIZE,
                            }}
                        />
                    ))
                )}

                {/* Puzzle tiles */}

                {tiles.map((tile) =>
                    tile.locked ? (
                        <div
                            key={tile.id}
                            className="tile"
                            style={{
                                left: tile.correctX * TILE_SIZE,
                                top: tile.correctY * TILE_SIZE,
                                width: TILE_SIZE,
                                height: TILE_SIZE,
                                backgroundImage: `url(${IMAGE_SRC})`,
                                backgroundPosition: `-${tile.correctX * TILE_SIZE}px -${tile.correctY * TILE_SIZE}px`,
                                backgroundSize: `${TILE_SIZE * GRID_SIZE}px ${TILE_SIZE * GRID_SIZE}px`,
                                position: "absolute",
                                cursor: "default",
                                zIndex: 1,
                            }}
                        />
                    ) : (
                        <Tile
                            key={tile.id}
                            tile={tile}
                            onSnap={handleSnap}
                            imageSrc={IMAGE_SRC}
                        />
                    )
                )}

                {completed && <div className="win-text">🎉 Puzzle Completed!</div>}

            </div>
            <Link to="/" className="button1">🏠 Home</Link>
        </div>
    );
}