import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { CheckCircle, X, Smartphone, CreditCard, Copy, QrCode } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const { enrollInCourse } = useEnrollment();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, success, failed
  const [transactionId, setTransactionId] = useState("");

  // Get course data from location state
  const course = location.state?.course;

  if (!course) {
    navigate("/courses");
    return null;
  }

  const paymentSettings = JSON.parse(localStorage.getItem('paymentSettings')) || {
    googlePay: "merchant@okhdfcbank",
    phonePe: "merchant@okaxis",
    paytm: "merchant@paytm",
    amazonPay: "merchant@amazon",
    bhimUpi: "merchant@upi"
  };

  const upiApps = [
    { name: "Google Pay", icon: "💰", upiId: paymentSettings.googlePay, deepLink: "tez://upi/pay?pa={upiId}&pn=Trading Course&am={amount}&cu=INR&tn=Course Purchase" },
    { name: "PhonePe", icon: "📱", upiId: paymentSettings.phonePe, deepLink: "tez://upi/pay?pa={upiId}&pn=Trading Course&am={amount}&cu=INR&tn=Course Purchase" },
    { name: "Paytm", icon: "💳", upiId: paymentSettings.paytm, deepLink: "paytmmp://pay?pa={upiId}&pn=Trading Course&am={amount}&cu=INR&tn=Course Purchase" },
    { name: "Amazon Pay", icon: "📦", upiId: paymentSettings.amazonPay, deepLink: "amazonpay://pay?pa={upiId}&pn=Trading Course&am={amount}&cu=INR&tn=Course Purchase" },
    { name: "BHIM UPI", icon: "🏦", upiId: paymentSettings.bhimUpi, deepLink: "bhim://pay?pa={upiId}&pn=Trading Course&am={amount}&cu=INR&tn=Course Purchase" },
  ];



  // Check if payment was in progress on component mount
  useEffect(() => {
    const paymentInProgress = localStorage.getItem('paymentInProgress');
    if (paymentInProgress === 'true') {
      localStorage.removeItem('paymentInProgress');
      // Simulate success on return
      setPaymentStatus("success");
      setTransactionId(`TXN${Date.now()}`);

      // Update user purchased courses and persist in AuthContext and localStorage
      const updatedUserData = {
        purchasedCourses: [...(user.purchasedCourses || []), course.id]
      };
      updateUser(updatedUserData);

      // Add enrollment record
      if (user && user.name && user.email) {
        enrollInCourse(course.id, {
          name: user.name,
          email: user.email,
          phone: user.phone,
          courseTitle: course.title
        });
      }

      setTimeout(() => {
        navigate("/courses", {
          state: { paymentSuccess: true, courseTitle: course.title }
        });
      }, 2000);
    }
  }, []);



  const generateQRCode = () => {
    // Generate UPI QR code URL
    const upiUrl = `upi://pay?pa=${upiId || "merchant@okhdfcbank"}&pn=Trading Course&am=${course.price}&cu=INR&tn=Course Purchase`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
  };

  const handleUPIPayment = (app) => {
    setUpiId(app.upiId);
    setShowQR(true);
    setPaymentStatus("processing");

    // Set flag for payment in progress
    localStorage.setItem('paymentInProgress', 'true');

    // Redirect to UPI app
    const deepLink = app.deepLink ? app.deepLink.replace('{upiId}', app.upiId).replace('{amount}', course.price) : `upi://pay?pa=${app.upiId}&pn=Trading Course&am=${course.price}&cu=INR&tn=Course Purchase`;
    window.location.href = deepLink;

    // Note: Since redirect happens, the rest won't execute. Success is handled on return via useEffect.
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId || "merchant@okhdfcbank");
    alert("UPI ID copied to clipboard!");
  };

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            You have successfully purchased <strong>{course.title}</strong>
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-mono text-sm">{transactionId}</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to courses...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">Your payment could not be processed. Please try again.</p>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentStatus("pending")}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">₹{course.price}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Choose Payment Method</h2>

          {/* Payment Method Tabs */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setPaymentMethod("upi")}
              className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                paymentMethod === "upi"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              UPI
            </button>
            <button
              onClick={() => setPaymentMethod("qr")}
              className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                paymentMethod === "qr"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </button>
          </div>

          {/* UPI Payment */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Pay using UPI Apps</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {upiApps.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => handleUPIPayment(app)}
                    disabled={paymentStatus === "processing"}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-2xl mb-2">{app.icon}</span>
                    <span className="text-sm font-medium">{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Manual UPI ID */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Or enter UPI ID manually</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., user@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={copyUPIId}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleUPIPayment({ upiId })}
                  disabled={!upiId || paymentStatus === "processing"}
                  className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Pay with UPI ID
                </button>
              </div>
            </div>
          )}

          {/* QR Code Payment */}
          {paymentMethod === "qr" && (
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-4">Scan QR Code to Pay</h3>
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                <img
                  src={generateQRCode()}
                  alt="Payment QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Scan this QR code with any UPI app to complete your payment
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Amount:</strong> ₹{course.price}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>UPI ID:</strong> {upiId || "merchant@okhdfcbank"}
                </p>
              </div>
              <button
                onClick={() => handleUPIPayment({ upiId: upiId || "merchant@okhdfcbank" })}
                disabled={paymentStatus === "processing"}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {paymentStatus === "processing" ? "Processing Payment..." : "I've Completed the Payment"}
              </button>
            </div>
          )}

          {/* Processing Status */}
          {paymentStatus === "processing" && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Processing your payment...</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/courses")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
