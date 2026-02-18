import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import MainMenu from './MainMenu.jsx'
import Create from './Create.jsx'
import Join from './Join.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainMenu,
  },{
    path:"/rooms",
    Component: Create,
  },{
    path:"/join",
    Component: Join
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
