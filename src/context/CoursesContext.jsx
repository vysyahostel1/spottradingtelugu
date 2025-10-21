import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCourses();
      setCourses(data);
    } catch (error) {
      // Error loading courses
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      const newCourse = await apiService.createCourse(course);
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (error) {
      throw error;
    }
  };

  const editCourse = async (id, updatedCourse) => {
    try {
      const updated = await apiService.updateCourse(id, updatedCourse);
      setCourses(prev => prev.map(course =>
        course._id === id ? updated : course
      ));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const deleteCourse = async (id) => {
    try {
      await apiService.deleteCourse(id);
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <CoursesContext.Provider value={{
      courses,
      loading,
      loadCourses,
      addCourse,
      editCourse,
      deleteCourse
    }}>
      {children}
    </CoursesContext.Provider>
  );
};
