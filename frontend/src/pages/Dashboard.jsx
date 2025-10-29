import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserFeedback } from "../api/feedbackApi";
import FeedbackCard from "../components/FeedbackCard";
import GiveFeedbackModal from "../components/GiveFeedbackModal";
import GiveFeedbackInlineForm from "../components/GiveFeedbackInlineForm";
import UserSearch from "../components/UserSearch";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showGiveFeedbackModal, setShowGiveFeedbackModal] = useState(false);

  const fetchFeedbacks = async () => {
    if (!user?.token) return;
    
    try {
      const data = await getUserFeedback(user.token);
      setFeedbacks(data);
    } catch (err) {
      setError("Failed to load feedback");
      console.error("Feedback fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [user]);



  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const copyProfileLink = () => {
    const username = user.user?.username || user.username;
    if (!username) {
      alert("Username not found. Please try logging in again.");
      return;
    }
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl);
    alert("Profile link copied to clipboard!");
  };

  if (!user) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  const username = user.user?.username || user.username;
  const email = user.user?.email || user.email;

  // Debug: Log user object to see its structure
  console.log("User object:", user);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {email}!</h2>
              <p className="text-gray-400">@{username}</p>
            </div>
            <div className="text-right">
              <button
                onClick={copyProfileLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                📋 Copy Profile Link
              </button>
              <p className="text-xs text-gray-400 mt-2">Share your profile link to receive feedback</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🔍 Find Users</h3>
            <UserSearch />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <button
                onClick={() => setShowGiveFeedbackModal(!showGiveFeedbackModal)}
                className="flex items-center p-4 bg-green-700 hover:bg-green-600 rounded-lg transition-colors w-full"
              >
                <div className="text-2xl mr-3">💬</div>
                <div className="text-left">
                  <div className="font-semibold">Give Feedback</div>
                  <div className="text-sm text-gray-300">Send feedback to someone</div>
                </div>
                <div className="ml-auto">
                  <svg 
                    className={`w-5 h-5 transition-transform ${showGiveFeedbackModal ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Inline Give Feedback Form */}
              {showGiveFeedbackModal && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <GiveFeedbackInlineForm onSuccess={() => {
                    setShowGiveFeedbackModal(false);
                    fetchFeedbacks();
                  }} />
                </div>
              )}
            </div>
            
            <button
              onClick={copyProfileLink}
              className="flex items-center p-4 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <div className="text-2xl mr-3">🔗</div>
              <div className="text-left">
                <div className="font-semibold">Share Profile</div>
                <div className="text-sm text-gray-300">Copy your profile link</div>
              </div>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{feedbacks.length}</div>
            <div className="text-gray-400">Total Feedback</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              {feedbacks.filter(f => f.from !== "Anonymous").length}
            </div>
            <div className="text-gray-400">Named Feedback</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {feedbacks.filter(f => f.from === "Anonymous").length}
            </div>
            <div className="text-gray-400">Anonymous Feedback</div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Your Feedback</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading feedback...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h4 className="text-lg font-semibold mb-2">No feedback yet</h4>
              <p className="text-gray-400 mb-4">Share your profile link to start receiving feedback!</p>
              <button
                onClick={copyProfileLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
              >
                Copy Profile Link
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default Dashboard;
