import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-indigo-100 hover:text-white transition";

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Job<span className="text-indigo-200">Finder</span>
          </Link>

          {/* Right Side Links */}
          <div className="flex items-center space-x-8">
            <NavLink to="/" className={linkClass}>
              Find Jobs
            </NavLink>

            <NavLink to="/post-job" className={linkClass}>
              Post a Job
            </NavLink>

            <Link
          to="/login"
            className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-100 transition"
>
  Sign In
</Link>

          </div>

        </div>
      </div>
    </nav>
  );
}
