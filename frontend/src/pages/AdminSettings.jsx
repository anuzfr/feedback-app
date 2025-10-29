function AdminSettings() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      <p className="text-gray-400 mb-4">Manage system-wide settings here.</p>

      <div className="bg-gray-800 p-6 rounded-lg max-w-md">
        <label className="block text-sm text-gray-400 mb-2">Change Admin Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
        />
        <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
