import React from "react";
import Hero from "../components/Hero";
import { useCourses } from "../context/CoursesContext";
import { useReviews } from "../context/ReviewsContext";
import { Star } from "lucide-react";

export default function Home() {
  const { courses } = useCourses();
  const { reviews } = useReviews();

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12 relative z-10">
      <Hero />
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center">Featured Courses</h2>
        <p className="mt-4 text-center text-slate-600">Explore our comprehensive trading courses.</p>
        <div className="mt-8 space-y-4">
          {courses.length === 0 ? (
            <p className="text-center text-slate-500">No courses available yet.</p>
          ) : (
            courses.slice(0, 3).map((course) => (
              <div key={course.id} className="border rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col md:flex-row md:items-center">
                  {course.image && (
                    <img src={course.image} alt={course.title} className="w-32 h-32 object-cover rounded mb-4 md:mb-0 md:mr-4" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-slate-600">{course.description}</p>
                    <p className="text-green-600 font-medium">${course.price || 0}</p>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Buy
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn about the visionary behind our trading platform and their journey in the financial markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Jane Doe</h3>
            <p className="text-slate-600 mb-4">
              With over 15 years of experience in financial markets, Jane has helped thousands of traders
              achieve their financial goals through innovative trading strategies and comprehensive education.
            </p>
            <p className="text-slate-600 mb-4">
              As a former Wall Street trader turned entrepreneur, Jane founded this platform with a mission
              to democratize trading education and make professional-grade tools accessible to everyone.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">15+ years in financial markets</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Former Wall Street trader</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Helped 10,000+ traders</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-slate-900 rounded-full mt-2"></div>
                <span className="text-slate-700">Expert-led courses with real market insights</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-slate-900 rounded-full mt-2"></div>
                <span className="text-slate-700">Step-by-step learning from basics to advanced</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-slate-900 rounded-full mt-2"></div>
                <span className="text-slate-700">Risk management and capital protection strategies</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-slate-900 rounded-full mt-2"></div>
                <span className="text-slate-700">Community support and mentorship</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center">What Our Students Say</h2>
        <p className="mt-4 text-center text-slate-600">Real reviews from traders who have transformed their careers.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-4 italic">"{review.review}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-600">{review.role}</p>
                <p className="text-xs text-blue-600 mt-1">{review.course}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
