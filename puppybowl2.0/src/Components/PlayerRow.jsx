import React from "react";
import "./PlayerRow.css";

export default function PlayerRow({ setSelectedPlayerId, setView, player, userId, setPlayers }) {
  const handleSelect = () => {
    setSelectedPlayerId(player.id);
    setView("selectedPlayer");
  };

  const handleDelete = (e) => {
    e.stopPropagation();  // Prevents a card click event
    
    console.log("Attempting to delete player:", player);
    console.log("Player creatorId:", player.creatorId);
    console.log("Current userId from localStorage:", userId);

    if (player.creatorId === userId) {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${player.name}?`);
      if (confirmDelete) {
        // Deletes the player from the players array
        setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== player.id));
        // Removes the player from localStorage
        const updatedPlayers = JSON.parse(localStorage.getItem("players")).filter((p) => p.id !== player.id);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
       
        
      }
    } else {
      alert("You can only delete players you created.");
    }
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
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
