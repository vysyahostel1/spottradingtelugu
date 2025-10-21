import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      // Error loading users
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    if (users.length === 0) {
      await loadUsers();
    }
    return users;
  };

  const getRecentUsers = async (limit = 10) => {
    try {
      const data = await apiService.getRecentUsers(limit);
      return data;
    } catch (error) {
      // Error loading recent users
      return [];
    }
  };

  const getTotalUsers = async () => {
    try {
      const data = await apiService.getTotalUsers();
      return data.total;
    } catch (error) {
      // Error loading total users
      return 0;
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const updatedUser = await apiService.updateUserRole(userId, newRole);
      setUsers(prev => prev.map(user =>
        user.id === userId ? updatedUser : user
      ));
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await apiService.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    users,
    loading,
    loadUsers,
    getAllUsers,
    getRecentUsers,
    getTotalUsers,
    updateUserRole,
    deleteUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
