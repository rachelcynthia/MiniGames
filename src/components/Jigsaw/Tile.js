import Draggable from "react-draggable";
import React, { useRef, useState, useEffect } from "react";

const TILE_SIZE = 100;

const Tile = ({ tile, onSnap, imageSrc }) => {
    const nodeRef = useRef(null);
    const [dragPos, setDragPos] = useState({ x: tile.x, y: tile.y });

    // Update dragPos only when tile gets locked or position is forced externally
    useEffect(() => {
        if (tile.locked) {
            setDragPos({ x: tile.x, y: tile.y });
        }
    }, [tile.locked, tile.x, tile.y]);

    const handleStop = (e, data) => {
        if (tile.locked) return;

        const dropX = Math.round(data.x / TILE_SIZE);
        const dropY = Math.round(data.y / TILE_SIZE);
        const isCorrect = dropX === tile.correctX && dropY === tile.correctY;

        const finalX = isCorrect ? dropX * TILE_SIZE : data.x;
        const finalY = isCorrect ? dropY * TILE_SIZE : data.y;

        setDragPos({ x: finalX, y: finalY });

        onSnap(tile.id, finalX, finalY, isCorrect);
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: tile.x, y: tile.y }}
            onStop={handleStop}
            disabled={tile.locked}
        >

            <div
                ref={nodeRef}
                className="tile"
                style={{
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundPosition: `-${tile.correctX * TILE_SIZE}px -${tile.correctY * TILE_SIZE}px`,
                    backgroundSize: `${TILE_SIZE * 4}px ${TILE_SIZE * 4}px`,
                    position: "absolute",
                    cursor: tile.locked ? "default" : "grab",
                    borderRadius: 8,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
            />
        </Draggable>
    );
}

export default React.memo(Tile);