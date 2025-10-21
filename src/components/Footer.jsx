import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-slate-200 py-10 text-sm text-slate-600">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="h-6 w-6 rounded-xl" />
            ) : (
              <div className="h-6 w-6 rounded-xl bg-slate-900" />
            )}
            <span className="font-semibold">{settings.companyName}</span>
          </div>
          <p className="mt-3 max-w-sm">Clear, step-by-step trading education for beginners and aspiring traders.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:justify-items-center">
          <Link to="/about" className="hover:text-slate-800">About</Link>
          <Link to="/courses" className="hover:text-slate-800">Courses</Link>
          <Link to="/contact" className="hover:text-slate-800">Contact</Link>
          <Link to="/privacy" className="hover:text-slate-800">Privacy</Link>
        </div>
        <div className="md:text-right">
          <p>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
