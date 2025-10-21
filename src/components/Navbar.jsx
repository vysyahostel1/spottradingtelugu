import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Menu, User, ChevronDown, Bell } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { useContact } from "../context/ContactContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { settings, updateSettings } = useSettings();
  const { messages } = useContact();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="h-12 w-12 rounded-2xl" />
          ) : (
            <div className="h-12 w-12 rounded-2xl bg-slate-900" />
          )}
          <span className="text-lg font-semibold tracking-wide">{settings.companyName}</span>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <Menu className="h-6 w-6" />
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          <li><Link to="/" className="text-sm hover:text-slate-600">Home</Link></li>
          <li><Link to="/courses" className="text-sm hover:text-slate-600">Courses</Link></li>
          <li><Link to="/news" className="text-sm hover:text-slate-600">News</Link></li>
          <li><Link to="/about" className="text-sm hover:text-slate-600">About</Link></li>
          <li><Link to="/contact" className="text-sm hover:text-slate-600">Contact</Link></li>
          {isAuthenticated() && (
            <li><Link to="/feedback" className="text-sm hover:text-slate-600">Course Review</Link></li>
          )}
          {isAuthenticated() ? (
            <>
              {isAdmin() && (
                <>
                  <li>
                    <Link to="/admin" className="text-sm hover:text-slate-600">Admin Panel</Link>
                  </li>
                  <li className="relative">
                    <Link to="/admin#messages" className="text-sm hover:text-slate-600 flex items-center relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}

              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-50">
                      Your Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            {[
              ["Home", "/"],
              ["Courses", "/courses"],
              ["News", "/news"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-slate-50">{label}</Link>
              </li>
            ))}
            {isAuthenticated() && (
              <li>
                <Link to="/feedback" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-slate-50">Course Review</Link>
              </li>
            )}
            {isAuthenticated() ? (
              <>
                {isAdmin() && (
                  <li>
                    <Link to="/admin" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-slate-50">Admin Panel</Link>
                  </li>
                )}

                <li>
                  <Link to="/profile" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-slate-50">Your Profile</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-xl px-3 py-2 hover:bg-slate-50 text-left"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="flex gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-center hover:bg-slate-50">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-white hover:bg-slate-800">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
