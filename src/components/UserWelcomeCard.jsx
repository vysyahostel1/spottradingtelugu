import React from "react";
import { useAuth } from "../context/AuthContext";
import { Trophy, BookOpen, Star, TrendingUp } from "lucide-react";

export default function UserWelcomeCard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const purchasedCourses = user?.purchasedCourses?.length || 0;

  return (
    <aside className="md:col-span-1">
      <div className="rounded-2xl border border-slate-200 p-6 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {getGreeting()}, {user?.name || "Trader"}!
          </h3>
          <p className="text-sm text-gray-600 mt-1">Welcome back to your learning journey</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Courses Enrolled</p>
                <p className="text-lg font-bold text-blue-600">{purchasedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Achievements</p>
                <p className="text-lg font-bold text-yellow-600">
                  {purchasedCourses > 0 ? "Active Learner" : "Getting Started"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Progress</p>
                <p className="text-lg font-bold text-green-600">
                  {purchasedCourses > 0 ? "On Track" : "Ready to Start"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Keep learning and trading smart!
          </p>
        </div>
      </div>
    </aside>
  );
}
