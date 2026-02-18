import "./MainMenu.css";
import { Link } from "react-router";
import { joinRoom } from "./Join.js"
import { useState } from "react";
import { useSearchParams } from "react-router";

function Join() {
  const [username, setUsername] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    code: "",
    id: ""
  });


  return (
    <>
      <div id="titulo">
        <h1>JOIN</h1>
      </div>
      <div>
        <label htmlFor="username">
          Nombre jugador:
        </label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="code">
          COdigo de la sale:
        </label>
        <input type="text" id="code" value={searchParams.get("code")} onChange={(e) => setSearchParams({ ...searchParams, code: e.target.value })} />
        <button onClick={() => joinRoom(searchParams.get("code"),username,searchParams.get("id"))}>Unirse</button>
        <Link to="/">PULSAME ESTAAAAAQQ</Link>
      </div>
    </>
  );
}

export default Join;