// Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaRobot, FaBars, FaTimes, FaHome, FaComments, FaPen, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaHistory, FaVideo } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const navLinks = [
  { name: "TRANG CHỦ", href: "/python/", icon: <FaHome /> },
  { name: "BÀI GIẢNG", href: "/python/video", icon: <FaVideo /> },
  { name: "THỰC HÀNH", href: "/python/exercises", icon: <FaPen /> },
  { name: "CHATBOT", href: "/python/chat", icon: <FaComments />, onClickKey: "chat" },
  { name: "LỊCH SỬ", href: "/python/quiz-history", icon: <FaHistory />, auth: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname, search } = useLocation();

  // Check login
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    window.addEventListener("storage", () => {
      setIsLoggedIn(!!sessionStorage.getItem("access_token"));
    });
    return () => window.removeEventListener("storage", () => {});
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChatClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) window.location.href = "/python/chat";
    else window.location.href = "/python/?message=login_required";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = "/python/";
  };

  const linkClass = (href) =>
    `flex items-center space-x-2 px-3 py-2 transition-colors ${
      pathname === href ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-400"
    }`;

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg" 
          : "bg-gradient-to-r from-blue-500 to-blue-700"
      }`}>
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/python/" className="flex items-center text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
            <img 
              src="https://ai.ptit.edu.vn/wp-content/uploads/sites/33/2025/02/AI_Logo-removebg-preview.png" 
              alt="PTIT Chatbot Logo" 
              className="h-10 w-auto mr-2 drop-shadow-lg" 
            />
            PTIT Chatbot
          </a>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.auth && !isLoggedIn) return null;
              if (link.onClickKey === "chat") {
                return (
                  <li key={link.name}>
                    <a href={link.href} onClick={handleChatClick} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      pathname === link.href 
                        ? "bg-white text-blue-600 shadow-md" 
                        : "text-white hover:bg-white/20 hover:shadow-md"
                    }`}>
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <a href={link.href} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    pathname === link.href 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-white hover:bg-white/20 hover:shadow-md"
                  }`}>
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <a href="/python/login" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
                  <FaSignInAlt /> <span>Đăng nhập</span>
                </a>
                <a href="/python/signup" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-md">
                  <FaUserPlus /> <span>Đăng ký</span>
                </a>
              </>
            ) : (
              <>
                <a href="/python/account" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
                  <FaUser /> <span>Tài khoản</span>
                </a>
                <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
                  <FaSignOutAlt /> <span>Đăng xuất</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white focus:outline-none hover:bg-white/20 p-2 rounded-lg transition-all duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-b from-blue-600 to-blue-800 bg-opacity-95 flex flex-col items-center justify-center space-y-8 md:hidden backdrop-blur-sm">
          {navLinks.map((link) => {
            if (link.auth && !isLoggedIn) return null;
            if (link.onClickKey === "chat") {
              return (
                <a key={link.name} href={link.href} onClick={handleChatClick} className="text-xl text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300">
                  {link.name}
                </a>
              );
            }
            return (
              <a key={link.name} href={link.href} className="text-xl text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300">
                {link.name}
              </a>
            );
          })}

          {!isLoggedIn ? (
            <>
              <a href="/python/login" className="text-xl text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300">Đăng nhập</a>
              <a href="/python/signup" className="text-xl bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-all duration-300 shadow-md">Đăng ký</a>
            </>
          ) : (
            <>
              <a href="/python/account" className="text-xl text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300">Tài khoản</a>
              <button onClick={handleLogout} className="text-xl text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300">Đăng xuất</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
