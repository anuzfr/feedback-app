function Admin() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-400">Here you can manage all users and feedback.</p>

      <div className="mt-6 grid gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-lg">User: anuj | Feedback: 12</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-lg">User: alex | Feedback: 8</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
