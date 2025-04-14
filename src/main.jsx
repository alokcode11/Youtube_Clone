import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Create from "./components/createchannel/create";
import Mychannel from "./components/mychannel/mychannel";
import Registration from "./components/Login/registration";
import Web from "./components/Webdevelopment/web";
import Comedy from "./components/Comedycategory/comedy";
import App from "./App";
import Homepage from "./components/Homepage/homepahe";
import Login from "./components/Login/login";
import Videoplayer from "./components/VideoPlayer/videoPlayer";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import All from "./components/allCategory/all";
import Science from "./components/ScienceCategory/science";
import Villain from "./components/Villains/villains";
import Movies from "./components/Movies/movie";
import Gaming from "./components/Gaming/gaming";
import CS from "./components/ComputerScience/cs";
import Filtered from "./components/FilteredCategory/filtered";

// Define the routing configuration for the application
const appRouter = createBrowserRouter([
  {
    path: "/", // Root path, renders the main App component
    element: <App />,
  },
  {
    path: "/home", // Home page route
    element: <App />,
  },
  {
    path: "/filtered", // Filtered category route
    element: <Filtered />,
  },
  {
    path: "/gaming", // Gaming category route
    element: <Gaming />,
  },
  {
    path: "/webdevelopment", // Web development category route
    element: <Web />,
  },
  {
    path: "/movies", // Movies category route
    element: <Movies />,
  },
  {
    path: "/comedy", // Comedy category route
    element: <Comedy />,
  },
  {
    path: "/science", // Science category route
    element: <Science />,
  },
  {
    path: "/villains", // Villains category route
    element: <Villain />,
  },
  {
    path: "/cs", // Computer Science category route
    element: <CS />,
  },
  {
    path: "/register", // User registration page
    element: <Registration />,
  },
  {
    path: "/login", // User login page
    element: <Login />,
  },
  {
    path: "/create", // Create channel page
    element: <Create />,
  },
  {
    path: "/home-page", // Home page route
    element: <Homepage />,
  },
  {
    path: "/all", // Route to display all content categories
    element: <All />,
  },
  {
    path: "/all/:id", // Dynamic route for viewing individual video content
    element: <Videoplayer />,
  },
  {
    path: "/mychannel", // My channel page
    element: <Mychannel />,
  },
]);

// Render the application with StrictMode enabled
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
