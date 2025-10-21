import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await apiService.getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (message) => {
    try {
      const newMessage = await apiService.sendContactMessage(message);
      setMessages(prev => [newMessage, ...prev]);
      return newMessage;
    } catch (error) {
      throw error;
    }
  };

  const markAsRead = async (id) => {
    try {
      const updated = await apiService.markMessageAsRead(id);
      setMessages(prev => prev.map(msg =>
        msg._id === id ? updated : msg
      ));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const markAsReplied = async (id) => {
    try {
      const updated = await apiService.markMessageAsReplied(id);
      setMessages(prev => prev.map(msg =>
        msg._id === id ? updated : msg
      ));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const deleteMessage = async (id) => {
    try {
      await apiService.deleteContactMessage(id);
      setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <ContactContext.Provider value={{
      messages,
      loading,
      loadMessages,
      addMessage,
      markAsRead,
      markAsReplied,
      deleteMessage
    }}>
      {children}
    </ContactContext.Provider>
  );
};
