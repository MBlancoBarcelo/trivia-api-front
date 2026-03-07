import { useEffect, useState } from "react"
import { getGame } from "../Game.js"

function GameContent() {
            const [gameId, setGameId] = useState()

    useEffect(() => {
        const getGameInfo = async () => {
            const IdOfGame =  await getGame(localStorage.getItem("gameId"));
            console.log(IdOfGame)
            setGameId(IdOfGame)
        }

        getGameInfo()
    },[])

    return (
        <>
        <h1>hOLA</h1>
        </>
    )
}

export default GameContent