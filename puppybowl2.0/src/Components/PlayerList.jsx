import React from "react";
import PlayerRow from "./PlayerRow";

export default function PlayerList({ 
  setSelectedPlayerId, 
  players, 
  setPlayers, 
  searchQuery, 
  setSearchQuery, 
  setView 
}) {
  console.log("PlayerList received players:", players);

  // Gets the userId from localStorage
  const userId = localStorage.getItem("userId");

  // Filters the players based on the search query
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a player by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div className="player-list">
        {filteredPlayers &&
          filteredPlayers.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              setSelectedPlayerId={setSelectedPlayerId}
              setView={setView}
              userId={userId}
              setPlayers={setPlayers}
            />
          ))}
      </div>
    </>
  );
}
