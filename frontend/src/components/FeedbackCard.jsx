function FeedbackCard({ feedback }) {
  const isAnonymous = feedback.from === "Anonymous";
  
  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isAnonymous 
              ? "bg-purple-900 text-purple-300" 
              : "bg-green-900 text-green-300"
          }`}>
            {isAnonymous ? "🔒 Anonymous" : `👤 ${feedback.from}`}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(feedback.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
      <p className="text-gray-200 leading-relaxed">{feedback.message}</p>
    </div>
  );
}

export default FeedbackCard;