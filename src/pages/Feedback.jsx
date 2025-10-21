import React, { useState, useEffect } from "react";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default function Feedback() {
  const { courses } = useCourses();
  const { user } = useAuth();

  // Filter courses to only those purchased by the user
  const purchasedCourses = courses.filter(course => user?.purchasedCourses?.includes(course.id));
  const [feedbacks, setFeedbacks] = useState({});
  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load existing feedbacks from localStorage
    const storedFeedbacks = localStorage.getItem("courseFeedbacks");
    const storedRatings = localStorage.getItem("courseRatings");

    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  const handleFeedbackChange = (courseId, value) => {
    setFeedbacks((prev) => ({
      ...prev,
      [courseId]: value,
    }));
    // Clear error for this course
    setErrors((prev) => ({
      ...prev,
      [courseId]: "",
    }));
  };

  const handleRatingChange = (courseId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [courseId]: rating,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    purchasedCourses.forEach((course) => {
      if (!ratings[course.id]) {
        newErrors[course.id] = "Please provide a rating";
      }
      if (!feedbacks[course.id]?.trim()) {
        newErrors[course.id] = newErrors[course.id]
          ? "Please provide both rating and feedback"
          : "Please provide feedback";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save feedbacks and ratings to localStorage
    localStorage.setItem("courseFeedbacks", JSON.stringify(feedbacks));
    localStorage.setItem("courseRatings", JSON.stringify(ratings));

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to submit feedback</h2>
          <p className="text-gray-600">You need to be logged in to provide course reviews.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Reviews</h1>
        <p className="text-gray-600">Share your experience and help others by reviewing the courses you've taken.</p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Thank you for your feedback!</p>
              <p className="text-sm text-green-700">Your reviews help improve our courses.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses available to review at the moment.</p>
          </div>
        ) : purchasedCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You have not purchased any courses to review.</p>
          </div>
        ) : (
          purchasedCourses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description || "Comprehensive trading course"}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overall Rating *
                      </label>
                      <StarRating
                        rating={ratings[course.id] || 0}
                        onRatingChange={(rating) => handleRatingChange(course.id, rating)}
                      />
                      {errors[course.id] && !ratings[course.id] && (
                        <p className="mt-1 text-sm text-red-600">{errors[course.id]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        placeholder="Share your experience with this course. What did you like? What could be improved?"
                        value={feedbacks[course.id] || ""}
                        onChange={(e) => handleFeedbackChange(course.id, e.target.value)}
                        className={`w-full p-3 border rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[course.id] && !feedbacks[course.id]?.trim()
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        rows={4}
                      />
                      {errors[course.id] && !feedbacks[course.id]?.trim() && (
                        <p className="mt-1 text-sm text-red-600">{errors[course.id]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {purchasedCourses.length > 0 && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
            >
              Submit All Reviews
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
