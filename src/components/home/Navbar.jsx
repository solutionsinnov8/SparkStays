import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext'; // path adjust kar lo agar different ho
import { useContext } from 'react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
 
  
  const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
  const dropdownRef = useRef();

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogoutModal(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <span className="font-extrabold text-2xl">
              Spark<span className="text-yellow-400">Stays</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 text-[16px] font-medium">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/booking" className="hover:text-yellow-300">Book Now</Link>
            {user && user.role ? (
              <Link
                to={
                  user.role === 'admin'
                    ? '/admin/dashboard'
                    : user.role === 'event_planner'
                      ? '/event-planner/dashboard'
                      : '/'
                }
                className="hover:text-yellow-300"
              >
                Dashboard
              </Link>
            ) : null}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 hover:bg-white/10 px-3 py-2 rounded-xl transition"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <BsPersonCircle size={28} />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-sm font-semibold capitalize">{user?.fullName}</div>
                    <div className="text-xs text-gray-200 capitalize">{`(${user?.role || 'User'})`}</div>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border rounded-xl shadow-lg z-50">
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl "
                    >
                      Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <Link to="/login" className="hover:text-yellow-300">Login</Link>
            )}

          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white text-gray-800 px-4 pb-4 space-y-2 border-t shadow-sm text-[16px] font-medium">
            <Link to="/" onClick={toggleMobileMenu} className="block hover:text-indigo-600">Home</Link>
            <Link to="/booking" onClick={toggleMobileMenu} className="block hover:text-indigo-600">Book Now</Link>

            {user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <BsPersonCircle size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-medium capitalize">{user?.fullName}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={toggleMobileMenu} className="block hover:text-indigo-600">Login</Link>
            )}
          </div>
        )}
      </header>


      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
