// Footer.jsx
import React, { useState, useEffect } from "react";
import {
  FaRobot,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("footer_message")) {
      setShowMessage(true);
      params.delete("footer_message");
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + (params.toString() ? `?${params.toString()}` : "")
      );
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <footer className="bg-gradient-to-b from-blue-600 to-blue-800 text-white pt-12 pb-6 relative">
      <div className="container mx-auto px-6">
        {/* Toast notification */}
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            showMessage ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
          }`}
        >
          <div className="bg-white text-blue-600 px-6 py-4 rounded-xl shadow-xl flex items-center space-x-4 max-w-md backdrop-blur-sm">
            <span className="font-semibold flex-1">Thông báo!</span>
            <button onClick={() => setShowMessage(false)} className="hover:text-blue-400 transition-colors">
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <a href="/python/" className="flex items-center text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://ai.ptit.edu.vn/wp-content/uploads/sites/33/2025/02/AI_Logo-removebg-preview.png" 
                  alt="PTIT Chatbot Logo" 
                  className="h-10 w-auto mr-2 drop-shadow-lg" 
                />
                PTIT Chatbot
              </a>
            </div>
            <p className="leading-relaxed text-gray-100">
              PTIT Chatbot là trợ lý ảo thông minh hỗ trợ sinh viên và học viên của Học viện
              Công nghệ Bưu chính Viễn thông.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-6">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <FaMapMarkerAlt className="mr-3 text-blue-300" />
                <span className="text-gray-100">Km10, Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <FaPhone className="mr-3 text-blue-300" />
                <span className="text-gray-100">024 3756 2186</span>
              </li>
              <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <FaEnvelope className="mr-3 text-blue-300" />
                <span className="text-gray-100">ctsv@ptit.edu.vn</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-6">Mạng xã hội</h3>
            <a
              href="https://www.facebook.com/HocvienPTIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-gray-100 hover:text-white transition-colors hover:translate-x-2 transition-transform duration-300"
            >
              <FaFacebook className="text-blue-300" />
              <span>Facebook Fanpage</span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-white text-center mb-6">Vị trí của chúng tôi</h3>
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3035174201984!2d105.78656301500352!3d20.98065598602711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad4b7b3e7d5f%3A0x7e6b8e8eb9b7e5f0!2sPosts%20and%20Telecommunications%20Institute%20of%20Technology!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="PTIT Location"
            ></iframe>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center">
          <p className="text-gray-100">© 2025 PTIT Chatbot. Bảo lưu mọi quyền.</p>
          <p className="text-gray-100">Một sản phẩm của AI PTIT.</p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <a
        href="https://wa.me/8402437562186"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-white text-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp size={24} />
      </a>
    </footer>
  );
};

export default Footer;
