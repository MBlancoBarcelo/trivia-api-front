import "./MainMenu.css";
import { Link } from "react-router";
import { joinRoom } from "./Join.js"
import { useState } from "react";

function Create() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");


  return (
    <>
      <div id="titulo">
        <h1>JOIN</h1>
      </div>
      <div>
        <label htmlFor="code">
          Nombre jugador:
        </label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="code">
          COdigo de la sale:
        </label>
        <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        <button onClick={() => joinRoom(219334,username)}>Unirse</button>
        <Link to="/">PULSAME ESTAAAAAQQ</Link>
      </div>
    </>
  );
}

export default Create;