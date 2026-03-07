import { StrictMode } from "react";
import { SSEProvider } from "./context/SSEContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainMenu from "./MainMenu.jsx";
import Create from "./Create.jsx";
import Join from "./Join.jsx";
import Room from "./Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainMenu,
  },
  {
    path: "/create",
    Component: Create,
  },
  {
    path: "/join",
    Component: Join,
  },
  {
    path: "/rooms",
    Component: Room,
  },
]);

createRoot(document.getElementById("root")).render(
  <SSEProvider>
    <RouterProvider router={router} />
  </SSEProvider>,
);
