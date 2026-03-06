import { Link } from "react-router";
import { leaveRoom, getPlayers, eliminateRoom, createTeam, getTeams, removeATeam } from "../Room.js";
import { useState, useEffect } from "react";
import { useSSE } from "../context/SSEContext.jsx";

function RoomContent() {
  const { addEventListener, removeEventListener } = useSSE();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [hasPlayersBefore, setHasPlayersBefore] = useState(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      const idRoom = localStorage.getItem("id");
      const playersData = await getPlayers(idRoom);
      setPlayers(playersData);
      setHasPlayersBefore(true)
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const onPlayerJoined = async () => {
      const allPlayers = await getPlayers(localStorage.getItem("id"));
      setPlayers(allPlayers);
    };

    const onPlayerLeft = async () => {
      const allPlayers = await getPlayers(localStorage.getItem("id"));
      setPlayers(allPlayers);
    };

    addEventListener("player-joined", onPlayerJoined);
    addEventListener("player-left", onPlayerLeft);

    return () => {
      removeEventListener("player-joined", onPlayerJoined);
      removeEventListener("player-left", onPlayerLeft);
    };
  }, [addEventListener, removeEventListener]);

  useEffect(() => {
    let idRoom = localStorage.getItem("id");
    console.log("Players in room:", players);
    if (players.length <= 0 && hasPlayersBefore) {
      eliminateRoom(idRoom);
    }
  }, [players , hasPlayersBefore]);

  async function handleLeave() {
    let idRoom = localStorage.getItem("id");
    let idPlayer = localStorage.getItem("playerId");
    leaveRoom(idRoom, idPlayer);
  }

  async function handleCreateTeam() {
    let idRoom = localStorage.getItem("id");
    console.log(idRoom)
    let data = await createTeam(idRoom);
    
    setTeams((prev) => [...prev, data]);
  }

async function handleEliminateTeam(idTeam) {
  const idRoom = localStorage.getItem("id");
  const success = await removeATeam(idTeam, idRoom);

  if (success) {
      setTeams(prev => prev.filter(team => team.id !== idTeam));
  }
}

  return (
    <div>
      <h1>Room Content</h1>
      <h2>Hola</h2>
      <button onClick={handleCreateTeam}>Crear Equipo</button>

      <h3>Equipos</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>Equipo {team.id}
          <button onClick={() => handleEliminateTeam(team.id)}>X</button>
          </li>
        ))}
      </ul>

      <Link to="/" onClick={() => handleLeave}>
        Salir
      </Link>
    </div>
  );
}

export default RoomContent;
