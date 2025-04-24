import React, { useState, useEffect } from "react";
import "./SelectedPlayer.css"

export default function SelectedPlayer({ selectedPlayerId, setSelectedPlayerId, setView }) {
    const [player, setPlayer] = useState();

    useEffect(() => {
        async function fetchPlayer() {
            try {
                const response = await fetch(
                    `https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players/${selectedPlayerId}`
                );
                const data = await response.json();
                setPlayer(data.data.player);
                console.log(data.data.player);
            } catch (error) {
                console.error("Error fetching player:", error);
            }
        }

        fetchPlayer();
    }, [selectedPlayerId]);

    if (!player || !player.name) {
        return <p className="loading-message">Loading player details...</p>;
    }

    const handleBack = () => {
        setSelectedPlayerId(null);  // Resets selected player
        setView("players");  // Switches view back to players list
    };

    return (
        <div className="selected-player-container">
            {player.imageUrl && (
                <img
                    className="selected-player-image"
                    src={player.imageUrl}
                    alt={`${player.name}'s profile`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/AdobeStock_581847170.png"
                    }}
                />
            )}
            <div className="selected-player-details">
                <h2 className="player-name">{player.name}</h2>
                <strong>Player Breed:</strong><p>{player.breed}</p>
                <strong>Player Status:</strong><p>{player.status}</p>
                <strong>Team Name:</strong><p>{player.team ? player.team.name : "No team assigned"}</p>

               
                <div className="back-button">
                    <button onClick={handleBack}>Back to Players</button>
                </div>

            </div>
        </div>
    );
}

