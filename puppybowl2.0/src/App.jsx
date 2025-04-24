import { useEffect, useState } from 'react';
import './App.css';
import PlayerForm from "./Components/PlayerForm.jsx";
import PlayerList from "./Components/PlayerList.jsx";
import SelectedPlayer from "./Components/SelectedPlayer.jsx";
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function App() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = `user-${Date.now()}`;
    localStorage.setItem("userId", userId);
  }

  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [view, setView] = useState("players");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  console.log("current view", view);
  console.log("selected player id", selectedPlayerId);
  console.log("show form: ", showForm)

  async function fetchPlayers() {
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players');
      const data = await response.json();
      setPlayers(data.data.players);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }; 

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSearchQuery(""); // Resets the search query when the form is closed
    }
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="content">
          <h1>Welcome to PuppyBowl!</h1>
        </div>

        <div>
          <p className="introduction">
            Thanks for joining this year's Puppy Bowl, get your team ready and let's Puppy Bowl!!
          </p>
       “The better I get to know men, the more I find myself loving dogs.”
       — Charles de Gaulle
          <div className="quote">
            <blockquote>
              “The better I get to know men, the more I find myself loving dogs.” 
              — Charles de Gaulle
            </blockquote>
          </div>
        </div>

        <div className="app-container">

          {view === "players" && !selectedPlayerId && (
            <>
              <PlayerList
                setSelectedPlayerId={setSelectedPlayerId}
                players={players}
                setPlayers={setPlayers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setView={setView}
                fetchPlayers={fetchPlayers}
              />

              <button
                onClick={handleToggleForm}
                className="toggle-form-button"
              >
                {showForm ? "Hide Form" : "Add New Player"}
              </button>

              {showForm && (
                <PlayerForm 
                  setPlayers={setPlayers} 
                  setShowForm={setShowForm} 
                  setView={setView} 
                  setSelectedPlayerId={setSelectedPlayerId} 
                  fetchPlayers={fetchPlayers}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </>
          )}

          {view === "selectedPlayer" && selectedPlayerId && (
            <SelectedPlayer
              selectedPlayerId={selectedPlayerId}
              setSelectedPlayerId={setSelectedPlayerId}
              setView={setView}
            />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}
