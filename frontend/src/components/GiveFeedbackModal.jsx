import { useState } from "react";
import { submitFeedback } from "../api/feedbackApi";
import { useAuth } from "../context/AuthContext";

function GiveFeedbackModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [targetUsername, setTargetUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetUsername.trim()) {
      setError("Please enter a username");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a feedback message");
      return;
    }

    // Check if user is trying to give feedback to themselves
    const currentUsername = user?.user?.username || user?.username;
    if (targetUsername.toLowerCase() === currentUsername?.toLowerCase()) {
      setError("You cannot give feedback to yourself");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fromName = isAnonymous ? "Anonymous" : (user?.user?.email || user?.email || "Anonymous");
      await submitFeedback(targetUsername.toLowerCase(), message.trim(), fromName);
      setSuccess(true);
      setTargetUsername("");
      setMessage("");
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback. Make sure the username exists.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTargetUsername("");
    setMessage("");
    setError("");
    setSuccess(false);
    setIsAnonymous(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-auto my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">💬</span>
            </div>
            <h2 className="text-xl font-bold text-white">Give Feedback</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        {success ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Feedback Sent!</h3>
            <p className="text-gray-300">
              Your {isAnonymous ? "anonymous" : "public"} feedback has been delivered successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username to give feedback to
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">@</div>
                <input
                  type="text"
                  value={targetUsername}
                  onChange={(e) => setTargetUsername(e.target.value.toLowerCase())}
                  placeholder="username (e.g., john_doe)"
                  className="w-full pl-8 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div className="text-xs text-gray-400 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enter the exact username of the person you want to give feedback to
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your feedback
              </label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your honest feedback here... Be constructive and helpful!"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-gray-600 focus:border-blue-500 transition-colors"
                  rows="4"
                  maxLength="500"
                  required
                />
                <div className={`absolute bottom-2 right-3 text-xs ${
                  message.length > 450 ? 'text-yellow-400' : 
                  message.length > 480 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {message.length}/500
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                How would you like to send this feedback?
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="feedbackType"
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                    className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">👤</span>
                      <span className="font-medium text-white">Send Publicly</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Your feedback will be visible to others and sent as: {user?.user?.email || user?.email || "Unknown"}
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="feedbackType"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(true)}
                    className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="text-purple-400 mr-2">🔒</span>
                      <span className="font-medium text-white">Send Anonymously</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Your feedback will be private and only visible to the recipient
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !targetUsername.trim() || !message.trim()}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  loading || !targetUsername.trim() || !message.trim()
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : isAnonymous
                    ? "bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105"
                    : "bg-green-600 hover:bg-green-700 text-white transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">{isAnonymous ? "🔒" : "👤"}</span>
                    Send {isAnonymous ? "Anonymously" : "Publicly"}
                  </div>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default GiveFeedbackModal;