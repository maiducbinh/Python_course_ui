import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // If you want to navigate after signup

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu không khớp! Vui lòng kiểm tra lại.');
      setSuccessMessage('');
      return;
    }

    // Optional: Additional validations (e.g., email format)

    setErrorMessage('');
    setIsLoading(true);

    try {
      // Define the payload according to your backend's expected schema
      const payload = {
        full_name: name, // Include if your backend expects it
        username,
        email,
        password
      };

      // Replace with your actual backend URL
      const response = await axios.post('https://mba.ptit.edu.vn/auth_api/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      setIsLoading(false);
      setSuccessMessage('Banh đã đăng ký thành công! Vui lòng đăng nhập.');
      // Optionally, redirect to login page after a delay
      setTimeout(() => {
        navigate('/login'); // Ensure you have a route for login
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Có lỗi xảy ra trong quá trình đăng ký! Vui lòng thử lại.');
      }
      setSuccessMessage('');
    }
  };

  // Define common colors
  const colors = {
    primary: '#2563eb',    // Blue 600
    secondary: '#1d4ed8',  // Blue 700
    background: '#dbeafe'  // Blue 100
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100" style={{ paddingTop: '100px' }}>
      <Navbar />

      <div className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="card shadow-lg"
          style={{
            width: '800px',
            border: 'none',
            borderRadius: '15px',
            overflow: 'hidden',
            backgroundColor: '#ffffff'
          }}>
          <div className="row g-0">
            <div className="col-md-6 text-white d-flex align-items-center justify-content-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                padding: '40px'
              }}>
              <div className="text-center px-4">
                <h1 className="mb-4"><strong>Chào mừng trở lại!</strong></h1>
                <p className="mb-4">
                Bạn đã có tài khoản? Hãy đăng nhập để kết nối với chúng tớ
                </p>
                <a href="/python/login" style={{ textDecoration: 'none' }}>
                  <button
                    className="btn"
                    style={{
                      color: 'white',
                      border: '2px solid white',
                      borderRadius: '25px',
                      padding: '12px 45px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = colors.primary;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'white';
                    }}
                  >
                    ĐĂNG NHẬP NGAY 
                  </button>
                </a>
              </div>
            </div>

            <div className="col-md-6 p-4">
              <div className="px-4 py-3">
                <h2 className="mb-4" style={{ fontSize: '24px', fontWeight: '500', color: colors.primary }}>
                Tạo tài khoản
                </h2>
                <form onSubmit={handleSubmit}>
                  {errorMessage && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>}
                  {successMessage && <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}` }}>
                        <FontAwesomeIcon icon={faUser} style={{ color: colors.primary }} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.primary}`,
                          padding: '12px 15px',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}` }}>
                        <FontAwesomeIcon icon={faUser} style={{ color: colors.primary }} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tên người dùng"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.primary}`,
                          padding: '12px 15px',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}` }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: colors.primary }} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.primary}`,
                          padding: '12px 15px',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}` }}>
                        <FontAwesomeIcon icon={faLock} style={{ color: colors.primary }} />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.primary}`,
                          padding: '12px 15px',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}` }}>
                        <FontAwesomeIcon icon={faLock} style={{ color: colors.primary }} />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                          backgroundColor: '#ffffff',
                          border: `1px solid ${colors.primary}`,
                          padding: '12px 15px',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      color: 'white',
                      padding: '12px',
                      borderRadius: '25px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;