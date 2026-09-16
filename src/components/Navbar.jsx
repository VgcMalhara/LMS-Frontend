import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    BookOpen,
    Brain,
    GraduationCap,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu,
    Plus,
    User,
    UserPlus,
    X,
    ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Dropdown click close reference
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Outside click detect dropdown close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks =
    user?.role === "student"
      ? [
          {
            to: "/",
            label: "Home",
            icon: GraduationCap,
            end: true,
          },
          {
            to: "/courses",
            label: "Courses",
            icon: BookOpen,
          },
          {
            to: "/my-enrollments",
            label: "My Learning",
            icon: LayoutDashboard,
          },
          {
            to: "/ai-advisor",
            label: "AI Advisor",
            icon: Brain,
            featured: true,
          },
        ]
      : user?.role === "instructor"
      ? [
          {
            to: "/",
            label: "Home",
            icon: GraduationCap,
            end: true,
          },
          {
            to: "/dashboard",
            label: "My Courses",
            icon: BookOpen,
          },
          {
            to: "/create-course",
            label: "Create Course",
            icon: Plus,
          },
        ]
      : [];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-600/30">
              <GraduationCap className="h-6 w-6" strokeWidth={2} />
            </div>

            <div className="hidden sm:block">
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Learn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hub</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-0.5">
                Learn without limits
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && navLinks.length > 0 && (
            <div className="hidden items-center rounded-2xl border border-slate-200/60 bg-slate-50/50 p-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/70"
                          : "text-slate-500 hover:bg-slate-200/30 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isActive
                              ? "text-blue-600"
                              : link.featured
                              ? "text-violet-500"
                              : "text-slate-400 group-hover:scale-110 group-hover:text-slate-600"
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />

                        <span>{link.label}</span>

                        {link.featured && (
                          <span className="ml-1 rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-violet-700">
                            AI
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          )}

          {/* Desktop Auth & Profile */}
          <div className="hidden items-center md:flex">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <UserPlus className="h-4 w-4" />
                  Get Started
                </Link>
              </div>
            ) : (
              <div 
                className="relative" 
                ref={dropdownRef} // Dropdown wrapper ref
              >
                {/* Profile Trigger */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 rounded-2xl border p-1.5 pr-3 transition-all duration-300 ${
                    isProfileOpen 
                      ? "border-blue-200 bg-blue-50/50 ring-4 ring-blue-50" 
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-inner">
                    {user.username?.charAt(0)?.toUpperCase() || <User className="h-4 w-4" />}
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="max-w-[100px] truncate text-sm font-bold text-slate-800 leading-none mb-1">
                      {user.username}
                    </p>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 leading-none">
                      {user.role}
                    </p>
                  </div>

                  <ChevronDown 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180 text-blue-600" : ""
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] w-60 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 z-50">
                    {/* User Info Header */}
                    <div className="mb-2 rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-500">Signed in as</p>
                      <p className="truncate text-sm font-bold text-slate-900 mt-0.5">
                        {user.email || user.username}
                      </p>
                    </div>

                    <div className="h-px bg-slate-100 my-2 mx-1" />

                    {/* Dropdown Actions */}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 hover:pl-4"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white shadow-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-br from-blue-500 to-indigo-500 text-lg font-bold text-white shadow-inner">
                  {user.username?.charAt(0)?.toUpperCase() || <User className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-base font-bold text-slate-800">{user.username}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{user.role}</p>
                </div>
              </div>
            )}

            {user && navLinks.length > 0 && (
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.end}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                      {link.featured && (
                        <span className="ml-auto rounded-md bg-violet-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-violet-700">
                          AI
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}

            <div className="my-4 border-t border-slate-100" />

            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogIn className="h-4 w-4" /> Log in
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { logout(); closeMenu(); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;