import { Link } from "react-router";
import { leaveRoom , getPlayers , eliminateRoom, createTeam } from "../Room.js";
import { useState, useEffect } from "react";
import { useSSE } from "../context/SSEContext.jsx";

function RoomContent() {
    const { addEventListener, removeEventListener } = useSSE();
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const idRoom = localStorage.getItem("id");
            const playersData = await getPlayers(idRoom);
            setPlayers(playersData);
        };
        fetchPlayers();
    }, []);

    useEffect(() => {
    const onPlayerJoined = async () => {
        const allPlayers = await getPlayers(localStorage.getItem("id"));
        setPlayers(allPlayers);
    }

    const onPlayerLeft = async () => {        
        const allPlayers = await getPlayers(localStorage.getItem("id"));
        setPlayers(allPlayers);
    }

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
        if (players.length <= 0){
            eliminateRoom(idRoom)
        }
    }, [players]);

    function handleLeave() {
        let idRoom = localStorage.getItem("id");
        let idPlayer = localStorage.getItem("playerId");
        leaveRoom(idRoom, idPlayer);  
    }

    function handleCreateTeam(){
        let idRoom = localStorage.getItem("id")
        let data = createTeam(idRoom);
        setTeams(prev => [...prev, data.id])

    }

    return (
        <div>
            <h1>Room Content</h1>
            <h2>Hola</h2>
            <button onClick={handleCreateTeam}>Crear Equipo</button>

            <h3>Equipos</h3>
            <ul>
                {teams.map(team => {
                    <li>
                        Equipo {team}
                    </li>
                })}
            </ul>

            <Link to="/" onClick={handleLeave}>Salir</Link>
        </div>
    );
}

export default RoomContent;