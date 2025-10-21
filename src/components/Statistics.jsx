import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = ({ courses }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistics</h1>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Overview</h2>
        <div className="h-64">
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Revenue ($)',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly Revenue',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Course Enrollment Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Enrollments</h2>
        <div className="h-64">
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Enrollments',
                data: [12, 19, 30, 50, 20, 30],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly Course Enrollments',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Course Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Enrollment Distribution</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-64 w-full md:w-1/2">
            <Pie
              data={{
                labels: courses.length > 0 ? courses.map(course => course.title) : ['Trading Basics', 'Advanced Trading', 'Risk Management'],
                datasets: [{
                  data: courses.length > 0 ? courses.map(() => Math.floor(Math.random() * 50) + 10) : [30, 25, 20],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                  ],
                  borderWidth: 1,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Enrollment Summary</h3>
            <div className="space-y-2">
              {courses.length > 0 ? courses.map((course, index) => (
                <div key={course.id} className="flex justify-between items-center">
                  <span className="text-gray-600">{course.title}</span>
                  <span className="font-semibold text-gray-800">{Math.floor(Math.random() * 50) + 10} students</span>
                </div>
              )) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trading Basics</span>
                    <span className="font-semibold text-gray-800">30 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Advanced Trading</span>
                    <span className="font-semibold text-gray-800">25 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Risk Management</span>
                    <span className="font-semibold text-gray-800">20 students</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
