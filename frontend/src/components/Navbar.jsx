import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="text-2xl font-bold text-blue-400">
        FeedbackApp
      </Link>
      <div className="space-x-6">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
