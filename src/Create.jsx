import "./MainMenu.css";
import { Link } from "react-router";
import { hacerAlgo } from "./Create.js"

function Create() {
    hacerAlgo()
  return (
    <>
      <div id="titulo">
        <h1>TRIVIA</h1>
      </div>
      <div>
        <Link to="/">PULSAME ESTAAAAAQQ</Link>
      </div>
    </>
  );
}

export default Create;
