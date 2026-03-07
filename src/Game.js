export async function getGame(gameId) {
  try {
    const response = await fetch(`http://localhost:8083/games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("no se ha podido conseguir el game")
    let data = await response.json()
    return data.id
    console.log(data)
  } catch (err) {
    console.log(err);
  }
}
