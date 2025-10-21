import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await apiService.getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllReviews = async () => {
    try {
      const data = await apiService.getAllReviews();
      return data;
    } catch (error) {
      console.error('Error loading all reviews:', error);
      return [];
    }
  };

  const addReview = async (review) => {
    try {
      const newReview = await apiService.createReview(review);
      setReviews(prev => [...prev, newReview]);
      return newReview;
    } catch (error) {
      throw error;
    }
  };

  const approveReview = async (id) => {
    try {
      const approved = await apiService.approveReview(id);
      setReviews(prev => prev.map(review =>
        review._id === id ? approved : review
      ));
      return approved;
    } catch (error) {
      throw error;
    }
  };

  const deleteReview = async (id) => {
    try {
      await apiService.deleteReview(id);
      setReviews(prev => prev.filter(review => review._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    reviews,
    loading,
    loadReviews,
    loadAllReviews,
    addReview,
    approveReview,
    deleteReview
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};
