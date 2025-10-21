import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCourses } from "../context/CoursesContext";
import { useSettings } from "../context/SettingsContext";
import { useContact } from "../context/ContactContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import { useReviews } from "../context/ReviewsContext";
import { BarChart3, BookOpen, Settings, Mail, Bell, User, CreditCard, Users, Star, Wrench, Cog } from "lucide-react";
import Statistics from "../components/Statistics";
import UserManagement from "./UserManagement";


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

export default function Admin() {
  const navigate = useNavigate();
  const { addCourse, editCourse, deleteCourse, courses } = useCourses();
  const { settings, updateSettings } = useSettings();
  const { messages, markAsRead, deleteMessage } = useContact();
  const { enrollments, getRecentEnrollments } = useEnrollment();
  const { user, isAdmin, logout } = useAuth();
  const { reviews, addReview, updateReview, deleteReview } = useReviews();

  const [recentEnrollments, setRecentEnrollments] = useState([]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const loadRecentEnrollments = async () => {
      try {
        const data = await getRecentEnrollments(5);
        setRecentEnrollments(data);
      } catch (error) {
        // Error loading recent enrollments
        setRecentEnrollments([]);
      }
    };
    loadRecentEnrollments();
  }, [getRecentEnrollments]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [activeTab, setActiveTab] = useState("dashboard");



  // Technical Management states
  const [maintenanceMode, setMaintenanceMode] = useState(() => {
    const stored = localStorage.getItem('maintenanceMode');
    return stored ? JSON.parse(stored) : false;
  });
  const [pages, setPages] = useState(() => {
    const stored = localStorage.getItem('pages');
    return stored ? JSON.parse(stored) : [
      { id: 'home', name: 'Home', path: '/', enabled: true, type: 'built-in' },
      { id: 'about', name: 'About', path: '/about', enabled: true, type: 'built-in' },
      { id: 'courses', name: 'Courses', path: '/courses', enabled: true, type: 'built-in' },
      { id: 'contact', name: 'Contact', path: '/contact', enabled: true, type: 'built-in' },
      { id: 'news', name: 'News', path: '/news', enabled: true, type: 'built-in' },
      { id: 'privacy', name: 'Privacy Policy', path: '/privacy', enabled: true, type: 'built-in' },
      { id: 'spot-trading', name: 'Spot Trading', path: '/spot-trading', enabled: true, type: 'built-in' },
    ];
  });
  const [customPages, setCustomPages] = useState(() => {
    const stored = localStorage.getItem('customPages');
    return stored ? JSON.parse(stored) : [];
  });
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageContent, setNewPageContent] = useState("");
  const [editingPage, setEditingPage] = useState(null);

  // Website Technical Settings states
  const [seoSettings, setSeoSettings] = useState(() => {
    const stored = localStorage.getItem('seoSettings');
    return stored ? JSON.parse(stored) : {
      siteTitle: 'Trading Academy',
      siteDescription: 'Learn trading with professional courses and expert guidance',
      metaKeywords: 'trading, courses, finance, investment, stock market',
      googleAnalyticsId: '',
      facebookPixelId: '',
      robotsTxt: 'User-agent: *\nAllow: /',
      sitemapUrl: ''
    };
  });

  const [socialMediaSettings, setSocialMediaSettings] = useState(() => {
    const stored = localStorage.getItem('socialMediaSettings');
    return stored ? JSON.parse(stored) : {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      whatsapp: '',
      telegram: ''
    };
  });

  const [emailSettings, setEmailSettings] = useState(() => {
    const stored = localStorage.getItem('emailSettings');
    return stored ? JSON.parse(stored) : {
      smtpHost: '',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: '',
      enableTLS: true,
      enableSSL: false
    };
  });

  const [performanceSettings, setPerformanceSettings] = useState(() => {
    const stored = localStorage.getItem('performanceSettings');
    return stored ? JSON.parse(stored) : {
      enableCaching: true,
      cacheExpiryHours: 24,
      enableCompression: true,
      enableLazyLoading: true,
      imageOptimization: true,
      minifyAssets: false
    };
  });

  const [securitySettings, setSecuritySettings] = useState(() => {
    const stored = localStorage.getItem('securitySettings');
    return stored ? JSON.parse(stored) : {
      enableHttps: false,
      enableCSP: false,
      enableHSTS: false,
      rateLimiting: true,
      maxRequestsPerMinute: 100,
      enableFirewall: false,
      blockSuspiciousIPs: true
    };
  });

  const [apiSettings, setApiSettings] = useState(() => {
    const stored = localStorage.getItem('apiSettings');
    return stored ? JSON.parse(stored) : {
      enableAPI: true,
      apiRateLimit: 1000,
      enableCORS: true,
      allowedOrigins: '*',
      enableLogging: true,
      jwtSecret: '',
      apiVersion: 'v1'
    };
  });

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const stored = localStorage.getItem('notificationSettings');
    return stored ? JSON.parse(stored) : {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      adminEmail: '',
      notificationTypes: {
        newUser: true,
        newEnrollment: true,
        newMessage: true,
        paymentReceived: true,
        systemErrors: true
      }
    };
  });

  // Course messages
  const [selectedCourse, setSelectedCourse] = useState("");
  const [messageText, setMessageText] = useState("");
  const [courseMessages, setCourseMessages] = useState(() => {
    const stored = localStorage.getItem('courseMessages');
    return stored ? JSON.parse(stored) : [];
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState(() => {
    const stored = localStorage.getItem('paymentSettings');
    return stored ? JSON.parse(stored) : {
      // Payment Gateway Settings
      stripeEnabled: false,
      stripePublishableKey: "",
      stripeSecretKey: "",
      razorpayEnabled: false,
      razorpayKeyId: "",
      razorpayKeySecret: "",
      paypalEnabled: false,
      paypalClientId: "",
      paypalClientSecret: "",
      // UPI Settings (for Indian market)
      upiEnabled: true,
      googlePay: "merchant@okhdfcbank",
      phonePe: "merchant@okaxis",
      paytm: "merchant@paytm",
      amazonPay: "merchant@amazon",
      bhimUpi: "merchant@upi",
      // Bank Transfer
      bankTransferEnabled: false,
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolder: "",
      // Currency Settings
      currency: "INR",
      currencySymbol: "₹"
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      if (editingCourse) {
        editCourse(editingCourse.id, { title, description, price: parseFloat(price) || 0, image });
        alert("Course updated successfully!");
        setEditingCourse(null);
      } else {
        addCourse({ title, description, price: parseFloat(price) || 0, image });
        alert("Course added successfully!");
      }
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
    }
  };

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, adminOnly: false },
    { id: "statistics", label: "Statistics", icon: BarChart3, adminOnly: false },
    { id: "courses", label: "Manage Courses", icon: BookOpen, adminOnly: true },
    { id: "users", label: "User Management", icon: Users, adminOnly: true },
    { id: "reviews", label: "Reviews Management", icon: Star, adminOnly: true },
    { id: "messages", label: "Contact Messages", icon: Mail, adminOnly: true },
    { id: "branding", label: "Branding", icon: Settings, adminOnly: true },
    { id: "payments", label: "Payment Settings", icon: CreditCard, adminOnly: true },
    { id: "technical", label: "Technical Management", icon: Wrench, adminOnly: true },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => !item.adminOnly || isAdmin());

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  // Calculate total revenue from enrollments
  const calculateTotalRevenue = () => {
    return enrollments.reduce((total, enrollment) => {
      const course = courses.find(c => c.id === enrollment.courseId);
      return total + (course ? course.price || 0 : 0);
    }, 0);
  };

  const totalRevenue = calculateTotalRevenue();



  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Link
              to="#messages"
              onClick={() => setActiveTab("messages")}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            {/* Profile Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg mt-16">
        <div className="p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h2>
          <nav className="flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                  activeTab === item.id ? "bg-gray-200 border-r-4 border-blue-500" : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
                <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                <p className="text-3xl font-bold text-green-600">1</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">₹{totalRevenue.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Enrolled At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnrollments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                          No enrollments yet. Data will be gathered after users sign up and enroll in courses.
                        </td>
                      </tr>
                    ) : (
                      recentEnrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                          <td className="border border-gray-300 px-4 py-2">{enrollment.userName}</td>
                          <td className="border border-gray-300 px-4 py-2">{enrollment.userEmail}</td>
                          <td className="border border-gray-300 px-4 py-2">{enrollment.userPhone || 'N/A'}</td>
                          <td className="border border-gray-300 px-4 py-2">{enrollment.courseTitle}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(enrollment.enrollmentDate).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Courses</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{editingCourse ? "Edit Course" : "Add New Course"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h2 className="text-xl font-semibold mb-4">Existing Courses</h2>
              {courses.length === 0 ? (
                <p className="text-gray-600">No courses added yet.</p>
              ) : (
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div key={course.id} className="border p-4 rounded flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-gray-600">{course.description}</p>
                        <p className="text-green-600 font-medium">${course.price || 0}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setTitle(course.title);
                            setDescription(course.description);
                            setPrice(course.price.toString());
                            setImage(course.image || "");
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this course?')) {
                              deleteCourse(course.id);
                              alert('Course deleted successfully!');
                            }
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Messages</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Received Messages</h2>
              {messages.length === 0 ? (
                <p className="text-gray-600">No messages received yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map(({ id, name, email, mobile, message, timestamp, status }) => (
                    <div key={id} className="border p-4 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1"><strong>Email:</strong> {email}</p>
                      <p className="text-gray-600 mb-2"><strong>Mobile:</strong> {mobile || 'N/A'}</p>
                      <p className="text-gray-700 mb-2">{message}</p>
                      <p className="text-xs text-gray-500 mb-3">Received: {new Date(timestamp).toLocaleString()}</p>
                      <div className="flex gap-2">
                        {status === 'unread' && (
                          <button
                            onClick={() => {
                              markAsRead(id);
                              alert('Message marked as read!');
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this message?')) {
                              deleteMessage(id);
                              alert('Message deleted successfully!');
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "branding" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Branding</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Logo and Company Name</h2>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateSettings({ companyName, logoUrl });
                  alert("Branding updated successfully!");
                } catch (error) {
                  alert("Failed to update branding: " + error.message);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogoUrl(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upload a logo image file (PNG, JPG, etc.) or enter a URL above</p>
        </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Branding
                </button>
              </form>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <div className="flex items-center gap-3 p-4 border rounded">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Preview" className="h-[250px] w-[150px] rounded-2xl object-contain" />
                  ) : (
                    <div className="h-[250px] w-[150px] rounded-2xl bg-slate-900" />
                  )}
                  <span className="text-lg font-semibold">{companyName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Configure Payment Gateways and Methods</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem('paymentSettings', JSON.stringify(paymentSettings));
                alert("Payment settings updated successfully!");
              }} className="space-y-6">

                {/* Currency Settings */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Currency Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        value={paymentSettings.currency}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
                      <input
                        type="text"
                        value={paymentSettings.currencySymbol}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, currencySymbol: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="₹"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Gateway Settings */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Gateways</h3>

                  {/* Stripe */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="stripeEnabled"
                        checked={paymentSettings.stripeEnabled}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeEnabled: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="stripeEnabled" className="text-sm font-medium text-gray-700">Enable Stripe</label>
                    </div>
                    {paymentSettings.stripeEnabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
                          <input
                            type="text"
                            value={paymentSettings.stripePublishableKey}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublishableKey: e.target.value })}
                            placeholder="pk_test_..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                          <input
                            type="password"
                            value={paymentSettings.stripeSecretKey}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                            placeholder="sk_test_..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Razorpay */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="razorpayEnabled"
                        checked={paymentSettings.razorpayEnabled}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayEnabled: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="razorpayEnabled" className="text-sm font-medium text-gray-700">Enable Razorpay</label>
                    </div>
                    {paymentSettings.razorpayEnabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Key ID</label>
                          <input
                            type="text"
                            value={paymentSettings.razorpayKeyId}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                            placeholder="rzp_test_..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Key Secret</label>
                          <input
                            type="password"
                            value={paymentSettings.razorpayKeySecret}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                            placeholder="..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="paypalEnabled"
                        checked={paymentSettings.paypalEnabled}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalEnabled: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="paypalEnabled" className="text-sm font-medium text-gray-700">Enable PayPal</label>
                    </div>
                    {paymentSettings.paypalEnabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                          <input
                            type="text"
                            value={paymentSettings.paypalClientId}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                            placeholder="..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                          <input
                            type="password"
                            value={paymentSettings.paypalClientSecret}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientSecret: e.target.value })}
                            placeholder="..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* UPI Settings */}
                <div className="border-b pb-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="upiEnabled"
                      checked={paymentSettings.upiEnabled}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, upiEnabled: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="upiEnabled" className="text-lg font-medium text-gray-900">UPI Payment Methods (India)</label>
                  </div>

                  {paymentSettings.upiEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Pay UPI ID</label>
                        <input
                          type="text"
                          value={paymentSettings.googlePay}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, googlePay: e.target.value })}
                          placeholder="e.g., merchant@okhdfcbank"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PhonePe UPI ID</label>
                        <input
                          type="text"
                          value={paymentSettings.phonePe}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, phonePe: e.target.value })}
                          placeholder="e.g., merchant@okaxis"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Paytm UPI ID</label>
                        <input
                          type="text"
                          value={paymentSettings.paytm}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, paytm: e.target.value })}
                          placeholder="e.g., merchant@paytm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amazon Pay UPI ID</label>
                        <input
                          type="text"
                          value={paymentSettings.amazonPay}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, amazonPay: e.target.value })}
                          placeholder="e.g., merchant@amazon"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">BHIM UPI ID</label>
                        <input
                          type="text"
                          value={paymentSettings.bhimUpi}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, bhimUpi: e.target.value })}
                          placeholder="e.g., merchant@upi"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                <div className="border-b pb-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="bankTransferEnabled"
                      checked={paymentSettings.bankTransferEnabled}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankTransferEnabled: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="bankTransferEnabled" className="text-lg font-medium text-gray-900">Bank Transfer</label>
                  </div>

                  {paymentSettings.bankTransferEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={paymentSettings.bankName}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                          placeholder="e.g., HDFC Bank"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                          type="text"
                          value={paymentSettings.accountNumber}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, accountNumber: e.target.value })}
                          placeholder="..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                        <input
                          type="text"
                          value={paymentSettings.ifscCode}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, ifscCode: e.target.value })}
                          placeholder="e.g., HDFC0001234"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                        <input
                          type="text"
                          value={paymentSettings.accountHolder}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, accountHolder: e.target.value })}
                          placeholder="..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Payment Settings
                </button>
              </form>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Current Settings Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Currency</h4>
                      <p className="text-sm text-gray-600">{paymentSettings.currency} ({paymentSettings.currencySymbol})</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Enabled Gateways</h4>
                      <div className="text-sm text-gray-600">
                        {paymentSettings.stripeEnabled && <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 mb-1">Stripe</span>}
                        {paymentSettings.razorpayEnabled && <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-1 mb-1">Razorpay</span>}
                        {paymentSettings.paypalEnabled && <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-1 mb-1">PayPal</span>}
                        {paymentSettings.upiEnabled && <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1 mb-1">UPI</span>}
                        {paymentSettings.bankTransferEnabled && <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded mr-1 mb-1">Bank Transfer</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "statistics" && (
          <Statistics courses={courses} />
        )}

        {activeTab === "users" && (
          <UserManagement />
        )}



        {activeTab === "reviews" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reviews Management</h1>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Review</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const newReview = {
                  name: document.getElementById('reviewName').value,
                  role: document.getElementById('reviewRole').value,
                  rating: parseInt(document.getElementById('reviewRating').value),
                  review: document.getElementById('reviewText').value,
                  course: document.getElementById('reviewCourse').value
                };
                if (newReview.name.trim() && newReview.review.trim() && newReview.course.trim()) {
                  addReview(newReview);
                  document.getElementById('reviewName').value = '';
                  document.getElementById('reviewRole').value = '';
                  document.getElementById('reviewRating').value = '5';
                  document.getElementById('reviewText').value = '';
                  document.getElementById('reviewCourse').value = '';
                  alert("Review added successfully!");
                }
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="reviewName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    id="reviewRole"
                    type="text"
                    placeholder="e.g., Professional Trader"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <select
                    id="reviewRating"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="5"
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    id="reviewCourse"
                    type="text"
                    placeholder="e.g., Advanced Technical Analysis"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                  <textarea
                    id="reviewText"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Review
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Homepage Reviews</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Review</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                          No reviews available.
                        </td>
                      </tr>
                    ) : (
                      reviews.map((review) => (
                        <tr key={review.id}>
                          <td className="border border-gray-300 px-4 py-2 font-semibold">{review.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{review.role}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{review.course}</td>
                          <td className="border border-gray-300 px-4 py-2 max-w-xs">
                            <div className="truncate" title={review.review}>
                              {review.review}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const newReview = prompt("Edit review:", review.review);
                                  if (newReview !== null && newReview.trim()) {
                                    updateReview(review.id, { review: newReview.trim() });
                                    alert("Review updated successfully!");
                                  }
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this review?')) {
                                    deleteReview(review.id);
                                    alert('Review deleted successfully!');
                                  }
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "technical" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Technical Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">System Information</h2>
                <div className="space-y-2">
                  <p><strong>Platform:</strong> React Application</p>
                  <p><strong>Version:</strong> 1.0.0</p>
                  <p><strong>Environment:</strong> Development</p>
                  <p><strong>Database:</strong> Local Storage</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Maintenance Mode</h2>
                <div className="flex items-center justify-between">
                  <span>Enable Maintenance Mode</span>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => {
                      setMaintenanceMode(e.target.checked);
                      localStorage.setItem('maintenanceMode', JSON.stringify(e.target.checked));
                      alert(`Maintenance mode ${e.target.checked ? 'enabled' : 'disabled'} successfully!`);
                    }}
                    className="toggle"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">When enabled, users will see a maintenance page.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Page Management</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Built-in Pages</h3>
                  <div className="space-y-2">
                    {pages.filter(page => page.type === 'built-in').map((page) => (
                      <div key={page.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <span className="font-medium">{page.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({page.path})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm px-2 py-1 rounded ${page.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {page.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => {
                              const updatedPages = pages.map(p =>
                                p.id === page.id ? { ...p, enabled: !p.enabled } : p
                              );
                              setPages(updatedPages);
                              localStorage.setItem('pages', JSON.stringify(updatedPages));
                              alert(`Page ${page.name} ${!page.enabled ? 'enabled' : 'disabled'} successfully!`);
                            }}
                            className={`px-3 py-1 rounded text-sm ${page.enabled ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                          >
                            {page.enabled ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Custom Pages</h3>
                  <div className="space-y-2">
                    {customPages.length === 0 ? (
                      <p className="text-gray-600">No custom pages created yet.</p>
                    ) : (
                      customPages.map((page) => (
                        <div key={page.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium">{page.title}</span>
                            <span className="text-sm text-gray-500 ml-2">({page.path})</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingPage(page);
                                setNewPageTitle(page.title);
                                setNewPageContent(page.content);
                              }}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this custom page?')) {
                                  const updatedCustomPages = customPages.filter(p => p.id !== page.id);
                                  setCustomPages(updatedCustomPages);
                                  localStorage.setItem('customPages', JSON.stringify(updatedCustomPages));
                                  alert('Custom page deleted successfully!');
                                }
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">{editingPage ? 'Edit Custom Page' : 'Create New Custom Page'}</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (newPageTitle.trim() && newPageContent.trim()) {
                      if (editingPage) {
                        const updatedCustomPages = customPages.map(page =>
                          page.id === editingPage.id
                            ? { ...page, title: newPageTitle.trim(), content: newPageContent.trim() }
                            : page
                        );
                        setCustomPages(updatedCustomPages);
                        localStorage.setItem('customPages', JSON.stringify(updatedCustomPages));
                        alert('Custom page updated successfully!');
                        setEditingPage(null);
                      } else {
                        const newPage = {
                          id: Date.now().toString(),
                          title: newPageTitle.trim(),
                          content: newPageContent.trim(),
                          path: `/${newPageTitle.trim().toLowerCase().replace(/\s+/g, '-')}`
                        };
                        const updatedCustomPages = [...customPages, newPage];
                        setCustomPages(updatedCustomPages);
                        localStorage.setItem('customPages', JSON.stringify(updatedCustomPages));
                        alert('Custom page created successfully!');
                      }
                      setNewPageTitle("");
                      setNewPageContent("");
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                      <input
                        type="text"
                        value={newPageTitle}
                        onChange={(e) => setNewPageTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Page Content (HTML)</label>
                      <textarea
                        value={newPageContent}
                        onChange={(e) => setNewPageContent(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="<h1>Welcome to our new page!</h1><p>This is the content of the page.</p>"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {editingPage ? 'Update Page' : 'Create Page'}
                      </button>
                      {editingPage && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPage(null);
                            setNewPageTitle("");
                            setNewPageContent("");
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Error Logs</h2>
                <div className="bg-gray-100 p-4 rounded max-h-64 overflow-y-auto">
                  <p className="text-gray-600">No recent errors logged.</p>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Clear Logs
                </button>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
