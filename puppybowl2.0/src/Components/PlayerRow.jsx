import React from "react";
import "./PlayerRow.css";


export default function PlayerRow({ setSelectedPlayerId, setView, player }) {
    const handleSelect = () => {
        setSelectedPlayerId(player.id);
        setView("selectedPlayer");
    };

    return (
        <div className="player-card" onClick={handleSelect}>
            {player.imageUrl && (
                <img
                    className="player-image"
                    src={player.imageUrl}
                    alt={`${player.name}'s profile`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/AdobeStock_581847170.png";
                    }}
                />
            )}
            <div className="player-background"></div>
            <div className="player-details">
                <p className="player-name">{player.name}</p>
                <div className="detail-item">
                    <strong>Player Breed:</strong><p>{player.breed}</p>
                    <strong>Player Status:</strong><p>{player.status}</p>
                </div>
                <div className="more-info">
                    <button onClick={handleSelect}>More Details</button>
                </div>
            </div>
        </div>
    );
}
