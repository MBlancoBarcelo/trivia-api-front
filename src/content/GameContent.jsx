import { useEffect, useState } from "react";
import { getRoundsOfGame } from "../Game.js";

function GameContent() {
  const [rounds, setRounds] = useState([]);
  const [time, setTime] = useState(0)

  useEffect(() => {
    const getRounds = async () => {
      const arrayofrounds = await getRoundsOfGame(
        localStorage.getItem("gameId"),
      );
      console.log(arrayofrounds);

      setRounds(arrayofrounds)
    };

    getRounds();
  }, []);

  useEffect(() => {
    if (rounds.length === 0) return;

    const endedAt = new Date(rounds[0].endedAt)

    const interval = setInterval(()=> {
        const remaining = Math.floor((endedAt - new Date())/ 1000)
    
        
        if(remaining <= 0) {
            setTime(0)
            clearInterval(interval)
            return
        }

        setTime(remaining)

        
    },1000)

      return () => clearInterval(interval);
  },[rounds])

  
  
  return (
    <>
      <h1>hOLA</h1>
      <h2>tiempo restante : {time}</h2>
    </>
  );
}

export default GameContent;
