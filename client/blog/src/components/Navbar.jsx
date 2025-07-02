import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../authSlice/authReducer.js';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggin = useSelector((state) => state.auth.isLoggin);
  const [open, setOpen] = React.useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    dispatch(authActions.logout());
    setOpen(false);
    navigate("/login");
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="w-full z-50 sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide font-serif">
          <span className="text-yellow-300 bg-white px-2 py-1 rounded-l">byte</span>
          <span className="text-white bg-yellow-300 px-2 py-1 rounded-r">Words</span>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="sm:hidden flex items-center">
          {isLoggin && (
            <button
              onClick={handleOpen}
              className="text-white focus:outline-none border-2 p-2 rounded hover:bg-white/20 transition"
            >
              {open ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          {!isLoggin && (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded shadow hover:bg-indigo-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded shadow hover:bg-indigo-100 transition"
              >
                Signup
              </Link>
            </>
          )}

          {isLoggin && (
            <>
              <Link
                to="/myblogs"
                className="text-white hover:text-yellow-200 transition font-medium"
              >
                MyBlog
              </Link>
              <Link
                to="/allblogs"
                className="text-white hover:text-yellow-200 transition font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/createBlog"
                className="text-white hover:text-yellow-200 transition font-medium"
              >
                Create
              </Link>
              <button
                onClick={handleLogOut}
                className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {open && isLoggin && (
        <div className="sm:hidden bg-white text-indigo-700 flex flex-col shadow-md px-6 py-4 space-y-3">
          <button onClick={() => handleNavigate("/myblogs")} className="text-left font-semibold hover:text-indigo-900">
            MyBlog
          </button>
          <button onClick={() => handleNavigate("/allblogs")} className="text-left font-semibold hover:text-indigo-900">
            Blogs
          </button>
          <button onClick={() => handleNavigate("/createBlog")} className="text-left font-semibold hover:text-indigo-900">
            Create
          </button>
          <button onClick={handleLogOut} className="text-left font-semibold text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
