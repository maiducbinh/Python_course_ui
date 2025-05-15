import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaEye, FaClock, FaPlay, FaLock, FaCheck, FaUser, FaBook, FaStar, FaDownload, FaShare } from 'react-icons/fa';

const videos = [
  { id: 1, title: 'Bài giảng 1: Giới thiệu Python', description: 'Tổng quan về ngôn ngữ lập trình Python, cú pháp cơ bản và môi trường phát triển.', url: '/python/video/video/output.mp4', duration: '15:30', views: '1.2K' },
  { id: 2, title: 'Bài giảng 2: Biến và kiểu dữ liệu', description: 'Khái niệm biến, kiểu dữ liệu cơ bản và cách sử dụng trong Python.', url: '/python/video/video/output2.mp4', duration: '18:45', views: '950' },
  { id: 3, title: 'Bài giảng 3: Cấu trúc điều khiển', description: 'Tìm hiểu về các cấu trúc điều khiển trong Python như if-else, loops.', url: '/python/video/video/output3.mp4', duration: '20:15', views: '800', locked: true },
];

const courseInfo = {
  title: "Khóa học Python cơ bản đến nâng cao",
  instructor: "ThS. Phạm Đức Cường",
  rating: 4.8,
  totalStudents: 1250,
  lastUpdated: "15/03/2024",
  totalLectures: 24,
  totalDuration: "8 giờ 30 phút",
  level: "Cơ bản",
  category: "Lập trình",
  description: "Khóa học Python toàn diện từ cơ bản đến nâng cao, giúp bạn làm chủ ngôn ngữ lập trình Python và ứng dụng vào thực tế.",
  requirements: [
    "Máy tính có kết nối internet",
    "Không yêu cầu kiến thức lập trình trước đó",
    "Thời gian học tập: 2-3 giờ/tuần"
  ],
  whatYouWillLearn: [
    "Hiểu và sử dụng thành thạo Python",
    "Xây dựng ứng dụng thực tế",
    "Làm việc với cơ sở dữ liệu",
    "Phát triển web với Python"
  ]
};

const VideoPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseInfo.title}</h1>
              <p className="text-gray-600 mb-6">{courseInfo.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaUser className="mr-2" /> {courseInfo.instructor}
                </span>
                <span className="flex items-center">
                  <FaStar className="mr-2 text-yellow-400" /> {courseInfo.rating} ({courseInfo.totalStudents} học viên)
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2" /> Cập nhật: {courseInfo.lastUpdated}
                </span>
                <span className="flex items-center">
                  <FaBook className="mr-2" /> {courseInfo.totalLectures} bài giảng
                </span>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Thông tin khóa học</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Trình độ:</span>
                    <span className="font-medium">{courseInfo.level}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="font-medium">{courseInfo.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Tổng thời lượng:</span>
                    <span className="font-medium">{courseInfo.totalDuration}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="relative aspect-w-16 aspect-h-9">
                <video
                  src={videos[currentVideo].url}
                  controls
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{videos[currentVideo].title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaEye className="mr-1" /> {videos[currentVideo].views} lượt xem
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {videos[currentVideo].duration}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{videos[currentVideo].description}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FaDownload className="mr-2" /> Tải tài liệu
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaShare className="mr-2" /> Chia sẻ
                  </button>
                </div>
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tiến độ khóa học</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentVideo + 1) / videos.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Đã hoàn thành {currentVideo + 1}/{videos.length} bài học
              </p>
            </div>

            {/* Course Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Yêu cầu khóa học</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {courseInfo.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-4 bg-blue-600 text-white">
                <h2 className="text-xl font-semibold">Nội dung khóa học</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {videos.map((video, idx) => (
                  <div
                    key={video.id}
                    className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                      currentVideo === idx ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => !video.locked && setCurrentVideo(idx)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {video.locked ? (
                          <FaLock className="text-blue-600" />
                        ) : currentVideo === idx ? (
                          <FaPlay className="text-blue-600" />
                        ) : (
                          <FaCheck className="text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium ${
                          currentVideo === idx ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {video.title}
                        </h3>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span className="flex items-center mr-3">
                            <FaClock className="mr-1" /> {video.duration}
                          </span>
                          <span className="flex items-center">
                            <FaEye className="mr-1" /> {video.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bạn sẽ học được gì?</h2>
              <ul className="space-y-3">
                {courseInfo.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
