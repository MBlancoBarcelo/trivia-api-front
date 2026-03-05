import { Link } from "react-router";
import { leaveRoom , getPlayers } from "../Room.js";
import { useState, useEffect } from "react";

function RoomContent() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const idRoom = localStorage.getItem("id");
            const playersData = await getPlayers(idRoom);
            setPlayers(playersData);
        };
        fetchPlayers();
    }, []);

    useEffect(() => {
        console.log("Players in room:", players);
    }, [players]);

    function handleLeave() {
        let idRoom = localStorage.getItem("id");
        let idPlayer = localStorage.getItem("playerId");
        leaveRoom(idRoom, idPlayer);  
    }


    return (
        <div>
            <h1>Room Content</h1>
            <h2>Hola</h2>
            <Link to="/" onClick={handleLeave}>Salir</Link>
        </div>
    );
}

export default RoomContent;