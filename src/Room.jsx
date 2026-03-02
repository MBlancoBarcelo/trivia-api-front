import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { getPlayers, subscribeToRoomEvents, leaveRoom, makeTeamsIfHost, getTeams } from "./Room.js";

function Room() {
  const [searchParams] = useSearchParams({
    code: "",
    id: "",
  });
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const handleLeaveRoom = async () => {
    const roomId = searchParams.get("id");
    const playerId = localStorage.getItem("playerId");

    if (!roomId || !playerId) {
      console.error("Room ID or Player ID not found");
      return;
    }

    const success = await leaveRoom(roomId, playerId);
    if (success) {
      localStorage.removeItem("playerId");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    async function load() {
      const id = searchParams.get("id");
      if (!id) return;

      const playersData = await getPlayers(id);
      setPlayers(playersData);

      await makeTeamsIfHost(id);

      const teamsData = await getTeams(id);
      setTeams(teamsData);

      console.log("Código de la sala:", searchParams.get("code"));
      console.log("ID de la sala:", id);

      const eventSource = subscribeToRoomEvents(id, async (event) => {
        if (event.type === "player-joined" || event.type === "player-left") {
          const updatedPlayers = await getPlayers(id);
          setPlayers(updatedPlayers);
          await makeTeamsIfHost(id);
          const updatedTeams = await getTeams(id);
          setTeams(updatedTeams);
        } else if (event.type === "team-created") {
          const updatedPlayers = await getPlayers(id);
          setPlayers(updatedPlayers);
          const updatedTeams = await getTeams(id);
          setTeams(updatedTeams);
        } else if (event.type === "player-removed-from-team") {
             const updatedPlayers = await getPlayers(id);
          setPlayers(updatedPlayers);
          const updatedTeams = await getTeams(id);
          setTeams(updatedTeams);
        } else if (event.type === "player-assigned-to-team") {
             const updatedPlayers = await getPlayers(id);
          setPlayers(updatedPlayers);
          const updatedTeams = await getTeams(id);
          setTeams(updatedTeams);
        }
      });

      return () => {
        if (eventSource) eventSource.close();
      };
    }

    load();
  }, [searchParams]);

  return (
    <div>
      <h1>Bienvenido a la sala {searchParams.get("code")}</h1>
      <button onClick={handleLeaveRoom} style={{ color: "red", marginBottom: "20px" }}>
        Salir de la sala
      </button>
      <h2>Equipos:</h2>
      {teams.length > 0 ? (
        <div>
          {teams.map((team) => {
            const teamPlayers = players.filter((p) => p.teamId === team.id);
            return (
              <div key={team.id} style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9"
              }}>
                <h3>Equipo {team.id}</h3>
                {teamPlayers.length > 0 ? (
                  <ul>
                    {teamPlayers.map((player) => (
                      <li key={player.id}>{player.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "#999" }}>Sin jugadores asignados</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>Cargando equipos...</p>
      )}
      <Link to="/game">START</Link>
    </div>
  );
}

export default Room;
