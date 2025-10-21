import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, Shield, Crown, Sparkles, User } from "lucide-react";

export default function SignupCard() {
  const navigate = useNavigate();

  return (
    <aside id="signup" className="md:col-span-1">
      <div className="rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 shadow-xl border border-purple-200 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-200/40 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200/40 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="h-32 w-32 text-purple-100/50" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">💎 Become a Pro Trader</h3>
            <div className="flex items-center justify-center space-x-1 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-3 h-3 bg-yellow-400 rounded-full mx-0.5"></div>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">Trusted by 50K+</span>
            </div>
            <p className="text-sm text-gray-600">Master the markets with expert guidance</p>
          </div>

          <div className="space-y-3 mb-6">
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Claim Your Free Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
          </button>

          <div className="text-center mt-4 space-y-1">
            <p className="text-xs text-purple-700 font-medium">🎯 Limited time offer</p>
            <p className="text-xs text-gray-500">Premium signals included • No experience needed</p>
          </div>

          <div className="mt-6 border-t border-purple-200 pt-4 flex items-center space-x-4">
            <User className="h-10 w-10 text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Founder: Jane Doe</p>
              <p className="text-xs text-gray-500">Experienced trader & mentor</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
