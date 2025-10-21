import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'SPOT TRADING',
    logoUrl: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      // Keep default settings if API fails
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updated = await apiService.updateSettings(newSettings);
      setSettings(updated);
      // Reload settings to ensure navbar and other components get fresh data
      await loadSettings();
      return updated;
    } catch (error) {
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      loading,
      loadSettings,
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
