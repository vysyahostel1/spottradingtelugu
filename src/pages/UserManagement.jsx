import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Users, Mail, Phone, Calendar, UserCheck, UserX } from "lucide-react";

export default function UserManagement() {
  const { getAllUsers, getTotalUsers, updateUserRole, deleteUser } = useUser();
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, totalData] = await Promise.all([
          getAllUsers(),
          getTotalUsers()
        ]);
        setUsers(usersData);
        setTotalUsers(totalData);
      } catch (error) {
        console.error('Error loading user data:', error);
        setUsers([]);
        setTotalUsers(0);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [getAllUsers, getTotalUsers]);

  const filteredUsers = activeTab === "all" ? users : users.filter(user => user.role === activeTab);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      // Update local state
      setUsers(prev => prev.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
      alert(`User role updated to ${newRole}!`);
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role. Please try again.');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      try {
        await deleteUser(userId);
        // Update local state
        setUsers(prev => prev.filter(user => user._id !== userId));
        setTotalUsers(prev => prev - 1);
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  // Check if users list is empty and log for debugging
  if (!users || users.length === 0) {
    console.warn("UserManagement: No users found in getAllUsers()");
  }

  // Function to add sample users for testing
  const addSampleUsers = () => {
    const sampleUsers = [
      {
        id: Date.now() + 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        role: "user",
        registrationDate: new Date().toISOString()
      },
      {
        id: Date.now() + 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+0987654321",
        role: "admin",
        registrationDate: new Date().toISOString()
      },
      {
        id: Date.now() + 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+1122334455",
        role: "user",
        registrationDate: new Date().toISOString()
      }
    ];

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...existingUsers, ...sampleUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.location.reload(); // Refresh to show new users
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
          <nav className="flex-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === "all" ? "bg-gray-200 border-r-4 border-blue-500" : ""
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              All Users ({totalUsers})
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === "user" ? "bg-gray-200 border-r-4 border-blue-500" : ""
              }`}
            >
              <UserCheck className="w-5 h-5 mr-3" />
              Regular Users ({users.filter(u => u.role === "user").length})
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === "admin" ? "bg-gray-200 border-r-4 border-blue-500" : ""
              }`}
            >
              <UserX className="w-5 h-5 mr-3" />
              Admins ({users.filter(u => u.role === "admin").length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts and signup data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Regular Users</h3>
                <p className="text-3xl font-bold text-green-600">{users.filter(u => u.role === "user").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Admins</h3>
                <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === "admin").length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === "all" ? "All Users" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Users`}
              </h2>
              {users.length === 0 && (
                <button
                  onClick={addSampleUsers}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  Add Sample Users
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No users found in this category.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center mb-1">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(user.registrationDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.registrationDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
