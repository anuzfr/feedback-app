import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserByUsername } from "../api/authApi";
import { getPublicFeedback } from "../api/feedbackApi";
import FeedbackModal from "../components/FeedbackModal";
import FeedbackCard from "../components/FeedbackCard";

function PublicProfile() {
  const { username } = useParams();
  const { user } = useAuth();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          {user ? (
            <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">
              ← Back to Dashboard
            </Link>
          ) : (
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              ← Back to Login
            </Link>
          )}
          <h1 className="text-xl font-semibold">Public Profile</h1>
          {user && (
            <div className="text-sm text-gray-400">
              Logged in as {user.user?.email || user.email}
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          {/* Profile Avatar */}
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {username?.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Username */}
          <h2 className="text-3xl font-bold mb-2">@{username}</h2>
          <p className="text-gray-400 mb-8">Public Profile</p>

          {/* Feedback Button */}
          {user && (user.user?.username === username || user.username === username) ? (
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                This is your profile
              </div>
              <p className="text-sm text-gray-400 mt-2">You cannot send feedback to yourself</p>
            </div>
          ) : (
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Send Feedback
            </button>
          )}

          {/* Info Section */}
          <div className="mt-12 p-6 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💬 Send Anonymous Feedback</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Share your honest thoughts and feedback with @{username}. You can choose to send it anonymously or with your name. 
              Your feedback helps them grow and improve!
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-green-400 text-2xl mb-2">🔒</div>
              <h4 className="font-semibold mb-1">Anonymous Option</h4>
              <p className="text-sm text-gray-400">Send feedback without revealing your identity</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-blue-400 text-2xl mb-2">👤</div>
              <h4 className="font-semibold mb-1">Named Feedback</h4>
              <p className="text-sm text-gray-400">Share feedback with your name attached</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        username={username}
      />
    </div>
  );
}

export default PublicProfile;
