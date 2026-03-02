import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import MainMenu from './MainMenu.jsx'
import Create from './Create.jsx'
import Join from './Join.jsx'
import Room from './Room.jsx'
import Game from './Game.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainMenu,
  },{
    path:"/create",
    Component: Create,
  },{
    path:"/join",
    Component: Join
  },
  {
    path: "/rooms",
    Component: Room
  },{
    path: "/game",
    Component: Game
  }
])



createRoot(document.getElementById('root')).render(
   <RouterProvider router={router} />
)
