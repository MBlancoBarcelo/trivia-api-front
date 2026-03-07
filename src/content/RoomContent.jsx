import { Link, useNavigate } from "react-router";
import {
  leaveRoom,
  getPlayers,
  eliminateRoom,
  createTeam,
  getTeams,
  removeATeam,
  getHostId,
  putMemberInTeam,
  getPlayerTeam,
  deletePlayerFromATeam,
  startGame,
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const idRoom = localStorage.getItem("id");
      const teamsData = await getTeams(idRoom);
      setTeams(teamsData);
    };

    const fetchPlayers = async () => {
      let hostid = await getHostId(localStorage.getItem("id"));
      setHostId(hostid);
      const idRoom = localStorage.getItem("id");
      const playersData = await getPlayers(idRoom);
      setPlayers(playersData);
      setHasPlayersBefore(true);
    };
    fetchTeams();
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

    const onGameCreated = () => {
      console.log("SE DEBERIA INICAR");
      navigate("/");
    };

    const onRoomDeleted = () => {
      console.log("SE DEBERIA INICAR");
      //navigate("/")
    };

    const onTeamCreated = async () => {
      const teamData = await getTeams(localStorage.getItem("id"));
      setTeams(teamData);
    };

    const onTeamDeleted = async () => {
      const teamData = await getTeams(localStorage.getItem("id"));
      setTeams(teamData);
    };

    const onPlayerAssignedToTeam = async () => {
      const allPlayers = await getPlayers(localStorage.getItem("id"));
      setPlayers(allPlayers);
    };

    const onPlayerRemovedToTeam = async () => {
      const allPlayers = await getPlayers(localStorage.getItem("id"));
      setPlayers(allPlayers);
    };

    addEventListener("player-joined", onPlayerJoined);
    addEventListener("player-left", onPlayerLeft);
    addEventListener("room-deleted", onRoomDeleted);
    addEventListener("game-created", onGameCreated);
    addEventListener("team-created", onTeamCreated);
    addEventListener("team-deleted", onTeamDeleted);

    addEventListener("player-assigned-to-team", onPlayerAssignedToTeam);
    addEventListener("player-removed-from-team", onPlayerRemovedToTeam);

    return () => {
      removeEventListener("player-joined", onPlayerJoined);
      removeEventListener("player-left", onPlayerLeft);
      removeEventListener("game-created", onGameCreated);
      removeEventListener("room-deleted", onRoomDeleted);
      removeEventListener("team-created", onTeamCreated);
      removeEventListener("player-assigned-to-team", onPlayerAssignedToTeam);
      removeEventListener("player-removed-from-team", onPlayerRemovedToTeam);
    };
  }, [addEventListener, removeEventListener, navigate]);

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

  async function handleStart() {
    await startGame();
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

  async function handlePutMemberInTeam(playerId, teamId) {
    let idRoom = localStorage.getItem("id");
    if (teamId === "" || teamId === "SinEquipo") {
      let playerTeamId = await getPlayerTeam(idRoom, playerId);
      await deletePlayerFromATeam(idRoom, playerTeamId, playerId);
      setPlayers((prev) =>
        prev.map((p) => (p.id === playerId ? { ...p, teamId: null } : p)),
      );
      return;
    } else {
      await putMemberInTeam(idRoom, teamId, playerId);
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, teamId: Number(teamId) } : p,
        ),
      );
    }
  }

  return (
    <div>
      <h1>Room Content</h1>
      <h2>Hola</h2>

      {String(hostId) === playerId && (
        <button onClick={handleCreateTeam}>Crear Equipo</button>
      )}
      <h3>Equipos</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <strong>Equipo {team.id}</strong>

            <ul>
              {players
                .filter((player) => player.teamId === team.id)
                .map((player) => (
                  <li key={player.id}>
                    {player.username}
                    {String(hostId) === playerId && (
                      <button
                        onClick={() => handlePutMemberInTeam(player.id, "")}
                      >
                        Sacar
                      </button>
                    )}
                  </li>
                ))}
            </ul>

            {String(hostId) === playerId && (
              <button onClick={() => handleEliminateTeam(team.id)}>X</button>
            )}
          </li>
        ))}
      </ul>

      <h3>Sin equipo</h3>
      <ul>
        {players
          .filter((player) => !player.teamId)
          .map((player) => (
            <li key={player.id}>
              {player.username}
              {String(hostId) === playerId && (
                <select
                  value={player.teamId ?? ""}
                  onChange={(e) =>
                    handlePutMemberInTeam(player.id, e.target.value)
                  }
                >
                  <option value="">SinEquipo</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.id}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
      </ul>

      {String(hostId) === playerId && (
        <button onClick={handleStart}>Start</button>
      )}

      <Link to="/" onClick={handleLeave}>
        Salir
      </Link>
    </div>
  );
}

export default RoomContent;
