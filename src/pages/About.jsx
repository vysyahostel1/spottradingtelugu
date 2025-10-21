import React from "react";
import { useSettings } from "../context/SettingsContext";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const { settings } = useSettings();

  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About {settings.companyName}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Empowering traders worldwide with comprehensive education, cutting-edge tools, and expert insights to navigate the financial markets with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                Founded with a vision to democratize trading education, {settings.companyName} was born from the belief that anyone with dedication and the right guidance can succeed in the financial markets.
              </p>
              <p className="text-slate-600 mb-4">
                What started as a small team of passionate traders has grown into a comprehensive platform serving thousands of students worldwide. We combine traditional trading wisdom with modern technology to deliver unparalleled learning experiences.
              </p>
              <p className="text-slate-600">
                Our commitment to excellence drives everything we do, from developing innovative courses to providing personalized support that helps our students achieve their financial goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-slate-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-slate-600">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-slate-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-slate-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600">
                To empower individuals worldwide with the knowledge, skills, and confidence needed to navigate financial markets successfully. We believe that financial literacy is the foundation of economic freedom.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600">
                To become the world's leading platform for trading education, where every student has access to world-class instruction and the tools necessary to achieve financial independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose {settings.companyName}?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We combine expertise, innovation, and dedication to deliver exceptional trading education that transforms lives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Instructors</h3>
              <p className="text-slate-600">
                Learn from seasoned traders with decades of market experience and proven track records of success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Proven Results</h3>
              <p className="text-slate-600">
                Our students consistently achieve remarkable results, with many going from beginners to profitable traders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Modern Approach</h3>
              <p className="text-slate-600">
                We blend traditional trading wisdom with cutting-edge technology and data-driven strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who have transformed their financial futures with our comprehensive education platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Courses
            </a>
            <a
              href="/contact"
              className="border border-slate-300 hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
