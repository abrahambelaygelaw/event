import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import Event from "./features/event/Event";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./components/Navigation";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Home />} />
        <Route path="events/:id" element={<Event />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path=":username" element={<Profile />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <div className=" bg-background w-full h-full text-white">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
