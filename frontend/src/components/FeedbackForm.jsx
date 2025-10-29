import { useState } from "react";

function FeedbackForm({ onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Write your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none h-32 resize-none"
      ></textarea>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
      >
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
