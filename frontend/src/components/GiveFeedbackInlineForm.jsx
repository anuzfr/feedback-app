import { useState } from "react";
import { submitFeedback } from "../api/feedbackApi";
import { useAuth } from "../context/AuthContext";

function GiveFeedbackInlineForm({ onSuccess }) {
  const { user } = useAuth();
  const [targetUsername, setTargetUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
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
      
      // Reset form
      setTargetUsername("");
      setMessage("");
      setIsAnonymous(false);
      
      // Show success and close
      alert(`Feedback sent ${isAnonymous ? 'anonymously' : 'publicly'} to @${targetUsername}!`);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback. Make sure the username exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Username
        </label>
        <div className="relative">
          <div className="absolute left-2 top-2 text-gray-400 text-sm">@</div>
          <input
            type="text"
            value={targetUsername}
            onChange={(e) => setTargetUsername(e.target.value.toLowerCase())}
            placeholder="username"
            className="w-full pl-6 pr-3 py-2 bg-gray-600 text-white text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Feedback
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full px-3 py-2 bg-gray-600 text-white text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none border border-gray-500"
          rows="3"
          maxLength="300"
          required
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {message.length}/300
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="feedbackType"
              checked={!isAnonymous}
              onChange={() => setIsAnonymous(false)}
              className="w-3 h-3 text-green-600 bg-gray-600 border-gray-500"
            />
            <span className="ml-1 text-xs text-gray-300">👤 Public</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="feedbackType"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(true)}
              className="w-3 h-3 text-purple-600 bg-gray-600 border-gray-500"
            />
            <span className="ml-1 text-xs text-gray-300">🔒 Anonymous</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !targetUsername.trim() || !message.trim()}
          className={`px-4 py-2 text-xs font-medium rounded transition-colors ${
            loading || !targetUsername.trim() || !message.trim()
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : isAnonymous
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Sending..." : `Send ${isAnonymous ? "Anonymously" : "Publicly"}`}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-xs bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}
    </form>
  );
}

export default GiveFeedbackInlineForm;