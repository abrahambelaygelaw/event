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
import Registree from "./features/registree/Registree";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/events/:id" element={<Registree />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/:username" element={<Profile />} />
      </>
    )
  );

  return (
    <AuthProvider>
      <div className=" bg-[#1a1a1a] w-full h-screen text-white">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
