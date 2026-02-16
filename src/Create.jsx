import "./MainMenu.css";
import { useEffect } from "react";
import { Link } from "react-router";
import { hacerAlgo } from "./Create.js"

function Create() {
  useEffect(() => {
    hacerAlgo()
  })

  return (
    <>
      <div id="titulo">
        <h1>TRIVIA</h1>

        <Link to="/">PULSAME ESTAAAAAQQ</Link>
      </div>
    </>
  );
}

export default Create;
