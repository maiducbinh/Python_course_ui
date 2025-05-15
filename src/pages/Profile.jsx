import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faIdCard } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('access_token');
                const response = await axios.get('https://mba.ptit.edu.vn/auth_api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setUserData(response.data);
            } catch (err) {
                setError('Không thể tải thông tin người dùng');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/login');
    };

    if (!userData) {
        return <div className="text-center">Đang tải...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-blue-800 mb-6">
                                    Thông tin cá nhân
                                </h2>
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                        </div>
                                        <input
                                            type="text"
                                            value={userData.username}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                                        </div>
                                        <input
                                            type="email"
                                            value={userData.email}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        />
                                    </div>

                                    {userData.full_name && (
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon icon={faIdCard} className="text-blue-600" />
                                            </div>
                                            <input
                                                type="text"
                                                value={userData.full_name}
                                                readOnly
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white flex flex-col justify-center">
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold mb-4">Chào Mừng Trở Lại!</h1>
                                    <p className="text-blue-100 mb-6">
                                        Tại đây bạn có thể xem và quản lý thông tin cá nhân của mình
                                    </p>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Profile;