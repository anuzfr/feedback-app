function ErrorMessage({ message, onRetry }) {
  const isNetworkError = message?.toLowerCase().includes('network') || 
                         message?.toLowerCase().includes('fetch') ||
                         message?.toLowerCase().includes('connect');

  return (
    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mt-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-400">Error</h3>
          <div className="mt-2 text-sm text-red-300">
            <p>{message}</p>
            {isNetworkError && (
              <div className="mt-3 space-y-2 text-xs">
                <p className="font-semibold">Troubleshooting:</p>
                <ul className="list-disc list-inside space-y-1 text-red-200">
                  <li>Make sure the backend server is running on port 3001</li>
                  <li>Check if MongoDB is connected</li>
                  <li>Verify your network connection</li>
                  <li>Check browser console for detailed errors</li>
                </ul>
              </div>
            )}
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-red-400 hover:text-red-300 underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
