import { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { createGame } from "./Game.js";
import { subscribeToRoomEvents, getPlayers, makeTeamsIfHost, getTeams } from "./Room.js";


function Game() {
  const [searchParams] = useSearchParams({
    id: "",
  });

 useEffect(() => {

  
    const id = searchParams.get("id");

       const eventSource = subscribeToRoomEvents(id, async (event) => {
         if (event.type === "game-created") {
          console.log("Juego iniciado:", event.data);
         }
      });

  const initGame = async () => {
    if (localStorage.getItem("gameId")) return;
    if (!id) return;

    try {
      const game = await createGame(id);
      localStorage.setItem("gameId", game.id);
    } catch (error) {
      console.error(error);
    }
  };



    initGame();


    return () => {
        if (eventSource) eventSource.close();
      };

}, [searchParams]);

  return (
    <div>
      <h1>Game</h1>
      <Link to="/">SALIR</Link>
      <p>ID de la sala: {searchParams.get("id")}</p>
    </div>
  );
}

export default Game;