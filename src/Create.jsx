import "./MainMenu.css";
import { useEffect , useState } from "react";
import { Link, useNavigate} from "react-router";
import { hacerAlgo } from "./Create.js"


function Create() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToRoom = async () => {
      const link = await hacerAlgo();
      if (link) {
        navigate(link.replace(window.location.origin, ""));
      }
    };
    redirectToRoom();
  },[])

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
