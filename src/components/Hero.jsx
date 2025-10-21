import React from "react";
import { motion } from "framer-motion";
import { LineChart, BarChart3, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";
import SignupCard from "./SignupCard";
import UserWelcomeCard from "./UserWelcomeCard";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:py-16">
      <div className="md:col-span-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          Learn. Trade. Succeed.
        </motion.h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Simplifying trading education for beginners and aspiring traders.
        </p>

        {/* Feature cards */}
        <div id="courses" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<LineChart className="h-6 w-6" />}
            title="Beginner Trading"
            desc="Start from the basics. Learn to trade stocks, forex, and more."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Technical Analysis"
            desc="Read charts and identify opportunities with clarity."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Risk Management"
            desc="Manage risk and protect your capital."
          />
        </div>

        <div className="mt-6">
          <a href="#all-courses" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow hover:bg-slate-800">
            View All Courses
          </a>
        </div>
      </div>
      {!isAuthenticated() && <SignupCard />}
      {isAuthenticated() && <UserWelcomeCard />}
    </section>
  );
}
