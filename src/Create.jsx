import "./MainMenu.css";
import { Link } from "react-router";
import { hacerAlgo } from "./Create.js"

function Create() {
  return (
    <>
      <div id="titulo">
        <h1>TRIVIA</h1>
      </div>
              <h2>{hacerAlgo()}</h2>

      <div>
        <Link to="/">PULSAME ESTAAAAAQQ</Link>
      </div>
    </>
  );
}

export default Create;
