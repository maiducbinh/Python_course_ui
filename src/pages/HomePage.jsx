import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaTimes } from "react-icons/fa";

const HomePage = () => {
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const token = sessionStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    const params = new URLSearchParams(window.location.search);
    if (params.get("message") === "login_required") {
      setShowLoginWarning(true);
      params.delete("message");
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + (params.toString() ? `?${params.toString()}` : "")
      );
      const timer = setTimeout(() => setShowLoginWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWarning = () => setShowLoginWarning(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-16 flex flex-col md:flex-row items-center justify-between relative">
        {/* Warning toast */}
        <div
          className={`fixed top-20 right-0 transform transition-all duration-500 ease-in-out ${
            showLoginWarning ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div
            className="bg-white text-blue-600 p-4 shadow-xl rounded-xl border-l-4 border-blue-500 flex items-start backdrop-blur-sm"
            role="alert"
          >
            <div className="flex-1">
              <p className="font-bold text-lg mb-1">Cảnh báo!</p>
              <p className="text-blue-600/90">Bạn cần đăng nhập để sử dụng tính năng này.</p>
            </div>
            <button
              onClick={handleCloseWarning}
              className="ml-4 text-blue-600/90 hover:text-blue-600 transition-colors duration-200"
              aria-label="Close warning"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Xin chào, tôi là PTIT Chatbot
          </h1>
          <p className="text-xl text-blue-600 mb-8">
            Đồng hành cùng bạn trong học tập
          </p>
          {isLoggedIn ? (
            <a
              href="/python/chat"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Bắt đầu trò chuyện
            </a>
          ) : (
            <a
              href="/python/login"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Đăng nhập
            </a>
          )}
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png"
            alt="Friendly Chatbot"
            className="w-full max-w-md rounded-xl shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
