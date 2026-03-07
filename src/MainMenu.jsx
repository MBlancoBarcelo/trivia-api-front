import { Link } from 'react-router'
import './MainMenu.css'

function MainMenu() {
  localStorage.removeItem("token")

  return (
    <>
    <div id='titulo'>
      <h1>TRIVIA</h1>
    </div>
    <div id="botones">
      <Link to="/create"> CREAR SALA </Link>
      <Link to="/join"> Unirse SALA </Link>
      </div>
    </>
  )
}

export default MainMenu
