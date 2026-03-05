
export function subscribeToRoomEvents(id, onMessage) {
    const token = localStorage.getItem("token");
    const eventSource = new EventSource(``);
    
    eventSource.addEventListener("player-joined", (event) => {
        const data = event.data;
        console.log("Evento recibido:", data);
        onMessage({ type: "player-joined", data: data });
    });
    
    eventSource.addEventListener("player-left", (event) => {
        const data = event.data;
        console.log("Jugador salió:", data);
        onMessage({ type: "player-left", data: data });
    });

    eventSource.onerror = () => {
        console.error("Error en SSE");
        eventSource.close();
    };
    
    return eventSource;
}

export async function getPlayers(id) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${id}/players`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to fetch players");
        
        return await response.json();
    } catch (err) {
        console.error("Error fetching players:", err);
        return [];
    }
}

export async function leaveRoom(roomId, playerId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}/players/${playerId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to leave room");
        return true;
    } catch (err) {
        console.error("Error leaving room:", err);
        return false;
    }
}

export async function getHostId(roomId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to fetch room");
        const data = await response.json();
        return data.hostId;
    } catch (err) {
        console.error("Error fetching room:", err);
        return null;
    }  
}

export async function getRoomId(roomId) {
     try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to fetch room");
        const data = await response.json();
        return data.id;
    } catch (err) {
        console.error("Error fetching room:", err);
        return null;
    }
}

async function getRoom(roomId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to fetch room");
        return await response.json();
    } catch (err) {
        console.error("Error fetching room:", err);
        return null;
    }
}

export async function getTeams(roomId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}/teams`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to fetch teams");
        return await response.json();
    } catch (err) {
        console.error("Error fetching teams:", err);
        return [];
    }
}

export async function createTeam(roomId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}/teams`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to create team");
        return await response.json();
    } catch (err) {
        console.error("Error creating team:", err);
        return null;
    }
}

export async function assignPlayerToTeam(roomId, teamId, playerId) {
    try {
        const response = await fetch(`http://localhost:8083/rooms/${roomId}/teams/${teamId}/players/${playerId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("failed to assign player");
        return true;
    } catch (err) {
        console.error("Error assigning player:", err);
        return false;
    }
}

export async function makeTeamsIfHost(roomId) {
    const playerIdStr = localStorage.getItem("playerId");
    const playerId = playerIdStr ? parseInt(playerIdStr, 10) : null;
    const salaData = await getRoom(roomId);

    if (salaData && playerId && Number(salaData.hostId) === playerId) {
        try {
            const players = await getPlayers(roomId);
            const teams = await getTeams(roomId);
            const assigned = new Set(
                players.filter(p => p.teamId != null).map(p => p.id)
            );
            for (const p of players) {
                if (!assigned.has(p.id)) {
                    const team = await createTeam(roomId);
                    if (team && team.id) {
                        await assignPlayerToTeam(roomId, team.id, p.id);
                    }
                }
            }
        } catch (err) {
            console.error("Error creando/asegurando equipos:", err);
        }
    } else {
        console.log("No eres el host, no puedes crear equipos.");
    }
}