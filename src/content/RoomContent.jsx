import { Link } from "react-router";
import {
  leaveRoom,
  getPlayers,
  eliminateRoom,
  createTeam,
  getTeams,
  removeATeam,
  getHostId,
} from "../Room.js";
import { useState, useEffect } from "react";
import { useSSE } from "../context/SSEContext.jsx";

function RoomContent() {
  const { addEventListener, removeEventListener } = useSSE();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [hasPlayersBefore, setHasPlayersBefore] = useState(false);
  const [hostId, setHostId] = useState(null);
  const playerId = localStorage.getItem("playerId");

  useEffect(() => {
    const fetchPlayers = async () => {
      let hostid = await getHostId(localStorage.getItem("id"));
      setHostId(hostid);
      const idRoom = localStorage.getItem("id");
      const playersData = await getPlayers(idRoom);
      setPlayers(playersData);
      setHasPlayersBefore(true);
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
  }, [players, hasPlayersBefore]);

  async function handleLeave() {
    let idRoom = localStorage.getItem("id");
    let idPlayer = localStorage.getItem("playerId");
    console.log(
      "YSAJHDBSDJHGASDJHASGDJVSDJHSDGJAHGDBJAHSGDJHGDASJHGASDJHGASDASDJH",
    );
    await leaveRoom(idRoom, idPlayer);
  }

  async function handleCreateTeam() {
    let idRoom = localStorage.getItem("id");
    console.log(idRoom);
    let data = await createTeam(idRoom);

    setTeams((prev) => [...prev, data]);
  }

  async function handleEliminateTeam(idTeam) {
    const idRoom = localStorage.getItem("id");
    const success = await removeATeam(idTeam, idRoom);

    if (success) {
      setTeams((prev) => prev.filter((team) => team.id !== idTeam));
    }
  }

  return (
    <div>
      <h1>Room Content</h1>
      <h2>Hola</h2>

      {String( hostId) === playerId && (
        <button onClick={handleCreateTeam}>Crear Equipo</button>
      )}
      <div>
        Jugadores
        <ul>
          {players.map((player) => (
            <li key={player.id}> {player.username}</li>
          ))}
        </ul>
      </div>


      <h3>Equipos</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            Equipo {team.id}
            <button onClick={() => handleEliminateTeam(team.id)}>X</button>
          </li>
        ))}
      </ul>

      <Link to="/" onClick={handleLeave}>
        Salir
      </Link>
    </div>
  );
}

export default RoomContent;
