import React, { useState } from "react";

export default function PlayerForm({
  setPlayers,
  setShowForm,
  setView,
  setSelectedPlayerId,
  setSearchQuery,
}) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            breed,
            status,
            imageUrl: imageUrl || "/AdobeStock_581847170.png",
            creatorId: userId
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const newPlayer = {
          ...data.data.newPlayer,
          creatorId: userId
        };

        setPlayers((prevPlayers) => {
          const updatedPlayers = [...prevPlayers, newPlayer];
          localStorage.setItem("players", JSON.stringify(updatedPlayers));
          return updatedPlayers;
        });

        setSearchQuery("");
        setSelectedPlayerId(null);
        setShowForm(false);
        setView("players");
        setName("");
        setBreed("");
        setStatus("bench");
        setImageUrl("");
      } else {
        console.error("Error creating player:", data.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form className="create-player-form" onSubmit={handleSubmit}>
      <h2>Create New Player</h2>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Breed:
        <input value={breed} onChange={(e) => setBreed(e.target.value)} required />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>
      </label>
      <label>
        Image URL:
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}
