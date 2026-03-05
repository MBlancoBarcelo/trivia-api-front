import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { getPlayers, subscribeToRoomEvents, leaveRoom, makeTeamsIfHost, getTeams, getRoomId , getHostId} from "./Room.js";

function Room() {
    const [searchParams] = useSearchParams();

    
}

export default Room;
