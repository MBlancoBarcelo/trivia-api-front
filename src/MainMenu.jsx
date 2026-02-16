import { Link } from 'react-router'
import './MainMenu.css'

function MainMenu() {
  return (
    <>
    <div id='titulo'>
      <h1>TRIVIA</h1>
    </div>
    <div id="botones">
      <Link to="/rooms"> CREAR SALA </Link>
      <Link to="/oscarstream"> Unirse SALA </Link>
      </div>
    </>
  )
}

export default MainMenu
