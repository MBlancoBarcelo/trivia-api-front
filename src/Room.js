export async function eliminateRoom(idRoom) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${idRoom}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("no se ha podido eliminar");
  } catch (error) {
    console.log("Error Eliminando la sala " + error);
  }
}

export async function removeATeam(idTeam, idRoom) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${idRoom}/teams/${idTeam}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("no se ha podido eliminar");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPlayers(id) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${id}/players`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("failed to fetch players");

    return await response.json();
  } catch (err) {
    console.error("Error fetching players:", err);
    return [];
  }
}

export async function leaveRoom(roomId, playerId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/players/${playerId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("failed to leave room");
    return true;
  } catch (err) {
    console.error("Error leaving room:", err);
    return false;
  }
}

export async function getHostId(roomId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("failed to fetch room");
    const data = await response.json();
    return data.id;
  } catch (err) {
    console.error("Error fetching room:", err);
    return null;
  }
}


export async function putMemberInTeam(roomId, teamId, playerId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/teams/${teamId}/players/${playerId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("no se pudo añadir al equipo");
  } catch (err) {
    console.error("Error poniendo a jugador en equipo:", err);
  }
}

export async function deletePlayerFromATeam(roomId, teamId, playerId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/teams/${teamId}/players/${playerId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("no se pudo eliminar jugador del equipo");
  } catch (err) {
    console.error("Error eliminando jugador del equipo:", err);
  }
}

export async function getPlayerTeam(idRoom, idPlayer) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${idRoom}/players/${idPlayer}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("no se pudo conseguir info del jugador");
    let data = await response.json();
    console.log(data);
    return data.teamId;
  } catch (err) {
    console.error("No se ha podido conseguir informacion del jugador:", err);
  }
}

export async function getTeams(roomId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/teams`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("failed to fetch teams");
    return await response.json();
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
}

export async function createTeam(roomId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/teams`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Error creating team:", err);
    return null;
  }
}

export async function assignPlayerToTeam(roomId, teamId, playerId) {
  try {
    const response = await fetch(
      `https://triviaapi.artemrudenko.com/rooms/${roomId}/teams/${teamId}/players/${playerId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("failed to assign player");
    return true;
  } catch (err) {
    console.error("Error assigning player:", err);
    return false;
  }
}

export async function startGame(rounds, timePerRound, questionsPerRound) {
  const object = {
    roomId: Number(localStorage.getItem("id")),
    rounds: rounds,
    timePerRound: timePerRound,
    questionsPerRound: questionsPerRound,
  };

  try {
    const response = await fetch(`https://triviaapi.artemrudenko.com/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(object),
    });
    let data = await response.json();
    console.log(data);
    localStorage.setItem("gameId", data.id);
    if (!response.ok) throw new Error("failed to start game");
  } catch (err) {
    console.error("Error starting game:", err);
  }
}