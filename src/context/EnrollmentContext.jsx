import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const EnrollmentContext = createContext();

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};

export const EnrollmentProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId, userData) => {
    try {
      const enrollmentData = {
        courseId,
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone,
        courseTitle: userData.courseTitle,
      };
      const newEnrollment = await apiService.enrollInCourse(enrollmentData);
      setEnrollments(prev => [newEnrollment, ...prev]);
      return newEnrollment;
    } catch (error) {
      throw error;
    }
  };

  const getRecentEnrollments = async (limit = 5) => {
    try {
      const data = await apiService.getRecentEnrollments(limit);
      return data;
    } catch (error) {
      console.error('Error loading recent enrollments:', error);
      return [];
    }
  };

  const getEnrollmentsByCourse = (courseId) => {
    return enrollments.filter(enrollment => enrollment.courseId === courseId);
  };

  const getTotalEnrollments = async () => {
    try {
      const data = await apiService.getTotalEnrollments();
      return data.total;
    } catch (error) {
      console.error('Error loading total enrollments:', error);
      return 0;
    }
  };

  const updateEnrollmentStatus = async (id, status) => {
    try {
      const updated = await apiService.updateEnrollmentStatus(id, status);
      setEnrollments(prev => prev.map(enrollment =>
        enrollment._id === id ? updated : enrollment
      ));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    enrollments,
    loading,
    loadEnrollments,
    enrollInCourse,
    getRecentEnrollments,
    getEnrollmentsByCourse,
    getTotalEnrollments,
    updateEnrollmentStatus,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};
