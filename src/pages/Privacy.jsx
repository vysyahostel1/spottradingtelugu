import React from "react";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        <p className="text-center text-slate-600 mb-12">Your privacy is important to us. Learn how we protect your data.</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-slate-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, enroll in courses,
              or contact us for support. This includes:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Payment information (processed securely by third-party providers)</li>
              <li>Course enrollment and progress data</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-slate-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="text-slate-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
              except as described in this policy:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-slate-700">
              We implement appropriate security measures to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption of sensitive data and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <p className="text-slate-700">
              All privacy data collected by our website is stored securely in one central location to ensure consistency, security, and efficient management.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-slate-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="text-slate-700">
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-slate-700">
              If you have questions about this Privacy Policy, please contact us at privacy@spottrading.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <div className="text-center text-sm text-slate-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
