import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Import all pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PublicProfile from "../pages/PublicProfile";
import Admin from "../pages/Admin";
import AdminSettings from "../pages/AdminSettings";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Authenticated User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Dynamic Public Profile Route */}
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
