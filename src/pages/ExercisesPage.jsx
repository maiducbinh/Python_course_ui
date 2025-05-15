// src/pages/ExercisesPage.js
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';   // ← thêm import Link
import Navbar from './Navbar';
import Footer from './Footer';

const ExercisesPage = () => {
  // trạng thái mẫu
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const [course, setCourse] = useState('python');
  const [search, setSearch] = useState('');
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  // dữ liệu tạm (nếu bạn đã có data/exercises.js thì vẫn dùng mảng này cho list,
  // và dùng file data chỉ để detail)
  const [exercises] = useState([
    { id: 1, code: 'PY001', title: 'Hello World',       group: 'Cơ bản',    subtopic: 'Nhập xuất', difficulty: 'Dễ' },
    { id: 2, code: 'PY002', title: 'Tính tổng dãy số',  group: 'Giải thuật', subtopic: 'Vòng lặp', difficulty: 'Trung bình' },
    { id: 3, code: 'PY003', title: 'Kiểm tra số chính phương', group: 'Toán học', subtopic: 'Số học', difficulty: 'Khó' },
    { id: 4, code: 'PY004', title: 'Tính giai thừa', group: 'Toán học', subtopic: 'Số học', difficulty: 'Khó' }
  ]);

  // danh sách khóa học
  const courses = [
    { value: 'python', label: 'Python cơ bản' }
  ];

  // danh sách chủ đề con duy nhất
  const subtopics = useMemo(
    () => [...new Set(exercises.map(ex => ex.subtopic))],
    [exercises]
  );

  // lọc bài tập theo tìm kiếm và chủ đề con
  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch =
        ex.code.toLowerCase().includes(search.toLowerCase()) ||
        ex.title.toLowerCase().includes(search.toLowerCase());
      const matchesSubtopic =
        selectedSubtopics.length === 0 ||
        selectedSubtopics.includes(ex.subtopic);
      return matchesSearch && matchesSubtopic;
    });
  }, [exercises, search, selectedSubtopics]);

  // Function to generate learning feedback using OpenAI
  const generateFeedback = async () => {
    setIsLoadingFeedback(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-nano",
          messages: [{
            role: "user",
            content: `Bạn là một người cố vấn học tập thân thiện và nhiệt tình. Hãy đưa ra một lời nhắn ngắn gọn, tích cực và khích lệ cho người học dựa trên:
              - Khóa học hiện tại: ${course}
              - Các chủ đề đang học: ${selectedSubtopics.join(', ')}
              - Số bài tập đã làm: ${filteredExercises.length}
              
              Yêu cầu:
              1. Sử dụng ngôn ngữ thân thiện, gần gũi
              2. Tập trung vào sự tiến bộ và tiềm năng
              3. Đưa ra 1-2 gợi ý nhỏ để tiếp tục phát triển
              4. Kết thúc bằng một câu khích lệ
              5. Giới hạn trong 3-4 câu ngắn gọn
              6. Sử dụng emoji phù hợp để tạo cảm giác vui vẻ`
          }]
        })
      });

      const data = await response.json();
      setFeedback(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating feedback:', error);
      setFeedback('Không thể tạo phản hồi lúc này. Vui lòng thử lại sau.');
    }
    setIsLoadingFeedback(false);
  };

  // Generate feedback when exercises or selections change
  useEffect(() => {
    if (filteredExercises.length > 0) {
      generateFeedback();
    }
  }, [filteredExercises, selectedSubtopics, course]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <main className="max-w-[95%] mx-auto px-4 py-8 mt-16">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-blue-800 mb-8 pb-4 border-b border-blue-200">
          Danh sách bài tập
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* --------- Left panel --------- */}
          <div className="flex-1 min-w-[320px] bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            {/* Môn học */}
            <div className="mb-6">
              <label className="block text-blue-600 font-semibold mb-2">Môn học:</label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/90"
              >
                <option value="">Chọn khóa học</option>
                {courses.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Tìm kiếm */}
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo mã hoặc tiêu đề..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/90"
              />
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {['Mã','Tiêu đề','Nhóm','Chủ đề con','Độ khó'].map(col => (
                      <th key={col} className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-left rounded-t-lg">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredExercises.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-500">
                        <div className="text-4xl mb-2">🗃️</div>
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredExercises.map(ex => (
                      <tr key={ex.id} className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-4 py-3 border-b border-blue-100">
                          <Link to={`/exercises/${ex.code}`} className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                            {ex.code}
                          </Link>
                        </td>
                        <td className="px-4 py-3 border-b border-blue-100">
                          <Link to={`/exercises/${ex.code}`} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
                            {ex.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 border-b border-blue-100">{ex.group}</td>
                        <td className="px-4 py-3 border-b border-blue-100">{ex.subtopic}</td>
                        <td className="px-4 py-3 border-b border-blue-100">{ex.difficulty}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --------- Right sidebar --------- */}
          <div className="w-full lg:w-96 space-y-6">
            {/* Bộ lọc Độ khó & Chủ đề con */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <details open className="mb-6">
                <summary className="text-blue-600 font-semibold cursor-pointer mb-4">
                  Độ khó
                </summary>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  Chọn tất cả
                </button>
              </details>
              <hr className="border-blue-100 my-4" />
              <details open>
                <summary className="text-blue-600 font-semibold cursor-pointer mb-4">
                  Chủ đề con
                </summary>
                <div className="space-y-2">
                  {subtopics.map(topic => (
                    <label key={topic} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                      <input
                        type="checkbox"
                        checked={selectedSubtopics.includes(topic)}
                        onChange={() => {
                          setSelectedSubtopics(prev =>
                            prev.includes(topic)
                              ? prev.filter(t => t !== topic)
                              : [...prev, topic]
                          );
                        }}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                  {subtopics.length > 0 && (
                    <button 
                      onClick={() => setSelectedSubtopics(subtopics)}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Chọn tất cả
                    </button>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* --------- Learning Progress Feedback Section --------- */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-white">
                💪
              </div>
              <h2 className="text-2xl font-bold text-blue-600">
                Lời nhắn từ người cố vấn
              </h2>
            </div>
            
            {isLoadingFeedback ? (
              <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100">
                <div className="text-4xl mb-4 animate-pulse">✨</div>
                <div className="text-gray-600 font-medium">
                  Đang chuẩn bị lời nhắn đặc biệt cho bạn...
                </div>
              </div>
            ) : feedback ? (
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-blue-100 text-gray-700 leading-relaxed">
                {feedback}
              </div>
            ) : (
              <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-lg border border-dashed border-blue-200">
                <div className="text-4xl mb-3">🌟</div>
                <p className="text-gray-600">
                  Hãy bắt đầu học tập để nhận lời nhắn từ người cố vấn của bạn
                </p>
              </div>
            )}
            <div className="text-center mt-6">
              <button
                onClick={generateFeedback}
                disabled={isLoadingFeedback}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <span>🔄</span>
                {isLoadingFeedback ? 'Đang cập nhật...' : 'Nhận lời nhắn mới'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExercisesPage;
