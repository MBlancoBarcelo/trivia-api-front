export async function createGame(roomId) {
  try {
    console.log("RoomId enviado:", roomId, typeof roomId);

    const mensaje = {
      roomId: Number(roomId),
      rounds: 1,
      timePerRound: 10,
      questionsPerRound: 1,
    };

    const response = await fetch("http://localhost:8083/games", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensaje),
    });

    let data = await response.json();

    return data;

  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function getGame(gameId) {

    
}
