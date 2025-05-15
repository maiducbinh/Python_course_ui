import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaHourglassHalf } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { FaVolumeUp } from 'react-icons/fa';
import explainData from '/home/iec/DMHUNG/test_mba/lisa_ui_new/src/data/video1.json';

// Dữ liệu câu hỏi được tích hợp trực tiếp
const quizData = {
  "_id": {
    "$oid": "682365642d452214ae375ff1"
  },
  "topic": "01_gt",
  "questions": [
    {
      "question": "Python được phát triển bởi ai?",
      "answers": [
        { "answer": "A) James Gosling", "isCorrectAnswer": "false" },
        { "answer": "B) Guido van Rossum", "isCorrectAnswer": "true" },
        { "answer": "C) Dennis Ritchie", "isCorrectAnswer": "false" },
        { "answer": "D) Bjarne Stroustrup", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Python ra đời vào năm nào?",
      "answers": [
        { "answer": "A) 1991", "isCorrectAnswer": "true" },
        { "answer": "B) 1985", "isCorrectAnswer": "false" },
        { "answer": "C) 2000", "isCorrectAnswer": "false" },
        { "answer": "D) 1995", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Ưu điểm nổi bật của Python là gì?",
      "answers": [
        { "answer": "A) Hiệu suất xử lý cao nhất", "isCorrectAnswer": "false" },
        { "answer": "B) Khả năng làm game tốt nhất", "isCorrectAnswer": "false" },
        { "answer": "C) Cú pháp đơn giản, dễ đọc", "isCorrectAnswer": "true" },
        { "answer": "D) Bắt buộc phải khai báo biến", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Để bắt đầu lập trình Python, người dùng cần:",
      "answers": [
        { "answer": "A) Mua license từ Python Foundation", "isCorrectAnswer": "false" },
        { "answer": "B) Cài đặt Visual Basic", "isCorrectAnswer": "false" },
        { "answer": "C) Cài trình thông dịch Python", "isCorrectAnswer": "true" },
        { "answer": "D) Kết nối với Internet liên tục", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Python thuộc loại ngôn ngữ nào?",
      "answers": [
        { "answer": "A) Hướng đối tượng", "isCorrectAnswer": "true" },
        { "answer": "B) Máy tính thấp", "isCorrectAnswer": "false" },
        { "answer": "C) Hợp ngữ", "isCorrectAnswer": "false" },
        { "answer": "D) Dịch trực tiếp ra mã máy", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Đâu là một công cụ thường dùng để viết mã Python?",
      "answers": [
        { "answer": "A) Microsoft Word", "isCorrectAnswer": "false" },
        { "answer": "B) Notepad++", "isCorrectAnswer": "false" },
        { "answer": "C) Jupyter Notebook", "isCorrectAnswer": "true" },
        { "answer": "D) Excel", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Python có thể ứng dụng trong lĩnh vực nào dưới đây?",
      "answers": [
        { "answer": "A) Phân tích dữ liệu", "isCorrectAnswer": "false" },
        { "answer": "B) Trí tuệ nhân tạo", "isCorrectAnswer": "false" },
        { "answer": "C) Phát triển web", "isCorrectAnswer": "false" },
        { "answer": "D) Tất cả các đáp án trên", "isCorrectAnswer": "true" }
      ]
    },
    {
      "question": "Trình thông dịch Python có thể tải từ đâu?",
      "answers": [
        { "answer": "A) python.org", "isCorrectAnswer": "true" },
        { "answer": "B) github.com", "isCorrectAnswer": "false" },
        { "answer": "C) java.com", "isCorrectAnswer": "false" },
        { "answer": "D) stackoverflow.com", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Tại sao Python phổ biến trong AI?",
      "answers": [
        { "answer": "A) Vì nó là ngôn ngữ biên dịch", "isCorrectAnswer": "false" },
        { "answer": "B) Vì nó có nhiều thư viện hỗ trợ", "isCorrectAnswer": "true" },
        { "answer": "C) Vì nó chạy rất chậm", "isCorrectAnswer": "false" },
        { "answer": "D) Vì nó không cần viết code", "isCorrectAnswer": "false" }
      ]
    },
    {
      "question": "Khi nói \"Python là ngôn ngữ thông dịch\", điều đó có nghĩa là gì?",
      "answers": [
        { "answer": "A) Python chạy trực tiếp mã máy", "isCorrectAnswer": "false" },
        { "answer": "B) Python dịch sang Java rồi mới chạy", "isCorrectAnswer": "false" },
        { "answer": "C) Python được biên dịch sang C++", "isCorrectAnswer": "false" },
        { "answer": "D) Python chạy từng dòng mã qua trình thông dịch", "isCorrectAnswer": "true" }
      ]
    }
  ]
};

const ExplanationPanel = ({ visible, onClose, currentIndex, wrongIndexes, questions, setCurrentIndex }) => {
  if (!visible || wrongIndexes.length === 0) return null;
  const realIndex = wrongIndexes[currentIndex];
  const videoSrc = `/python/video/video1/ami_${String(realIndex + 1).padStart(2, '0')}.mp4`;
  const rawSubtitle = explainData[`slide${realIndex + 1}`] || "Chưa có giải thích.";
  const [isGeneratingAI, setIsGeneratingAI] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsGeneratingAI(true);
    const timer = setTimeout(() => setIsGeneratingAI(false), 2000);
    return () => clearTimeout(timer);
  }, [realIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, [realIndex]);

  const [volume, setVolume] = useState(1); // 0 → 1

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume, realIndex]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, wrongIndexes.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <div className="w-full max-w-[1400px] flex items-start justify-between px-4">
        {/* Subtitle Section */}
        <div className="w-[300px] h-[500px] bg-white/90 backdrop-blur-sm shadow-lg border border-blue-200 rounded-xl p-4 pointer-events-auto overflow-y-auto">
          {isGeneratingAI ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600">Đang kết nối với gia sư ...</p>
              <div className="text-center mb-2 text-blue-600">{progress}%</div>
              <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-700 h-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">
              {rawSubtitle}
            </p>
          )}
        </div>

        {/* Video Section */}
        <div className="w-[300px] bg-white/90 backdrop-blur-sm shadow-lg border border-blue-200 rounded-xl p-3 pointer-events-auto flex flex-col items-center justify-start">
          {isGeneratingAI ? (
            <div className="h-[420px] flex flex-col items-center justify-center w-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-blue-600 mt-2">Đang kết nối với gia sư ...</p>
              <div className="text-center mb-2 text-blue-600">{progress}%</div>
              <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-700 h-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-[380px] overflow-hidden flex items-center justify-center shadow-md rounded-xl">
              <video
                ref={videoRef}
                key={realIndex}
                autoPlay
                muted={volume === 0}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noplaybackrate"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-3 w-full flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50"
            >◀ Trước</button>

            <div className="flex items-center gap-2 flex-1 justify-center">
              <FaVolumeUp className="text-blue-600" />
              <input
                type="range"
                min="0" max="1" step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === wrongIndexes.length - 1}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50"
            >Tiếp ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizPopup1 = ({ isOpen, onClose, apiUrl, onRequestExplanation }) => {
  if (!isOpen) return null;

  const [questions, setQuestions] = useState(quizData.questions);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Không cần tải dữ liệu từ API
  const [wrongIndexes, setWrongIndexes] = useState([]);
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);
  const [showVideoPanel, setShowVideoPanel] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const quizRefs = useRef([]);
  const bottomRef = useRef(null);

  const videoPath = 'public/video/quiz_clean.mp4';

  useEffect(() => {
    if (showVideoPanel && wrongIndexes.length > 0) {
      const scrollTo = quizRefs.current[wrongIndexes[currentWrongIndex]];
      scrollTo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentWrongIndex, showVideoPanel]);

  useEffect(() => {
    if (showVideo) {
      const videoEl = document.getElementById('plyr-video');
      if (videoEl) {
        videoEl.play().catch(err => console.error("Auto-play thất bại:", err));
      }
    }
  }, [showVideo]);

  useEffect(() => {
    if (showVideo) {
      new Plyr('#plyr-video', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      });
    }
  }, [showVideo]);

  const handleOptionChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const getScore = () => {
    return questions.reduce((score, q, index) => {
      const correct = q.answers.find(a => a.isCorrectAnswer === "true");
      return answers[index] === correct.answer.charAt(0) ? score + 1 : score;
    }, 0);
  };

  const hasWrongAnswers = () => {
    return questions.some((q, index) => {
      const correct = q.answers.find(a => a.isCorrectAnswer === "true");
      return answers[index] !== correct?.answer.charAt(0);
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast.success('✅ Bài đã được nộp!');

    const wrongs = questions.reduce((arr, q, i) => {
      const correct = q.answers.find(a => a.isCorrectAnswer === "true");
      if (answers[i] !== correct?.answer.charAt(0)) arr.push(i);
      return arr;
    }, []);

    setWrongIndexes(wrongs);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleRetry = () => {
    setAnswers({});
    setIsSubmitted(false);
    setWrongIndexes([]);
    setCurrentWrongIndex(0);
    setShowVideoPanel(false);
    setShowVideo(false);
    setIsVideoLoading(false);
  };

  const handleViewExplanation = (index) => {
    const q = questions[index];
    const correct = q.answers.find(a => a.isCorrectAnswer === "true");
    const user = answers[index]
      ? q.answers.find(a => a.answer.charAt(0) === answers[index])?.answer
      : 'Không trả lời';

    const explanation = {
      totalQuestions: 1,
      correctAnswers: user === correct?.answer ? 1 : 0,
      timestamp: new Date().toISOString(),
      explanations: [
        {
          question: q.question,
          userAnswer: user,
          correctAnswer: correct?.answer || '',
          remainingAnswers: q.answers.filter(a => ![user, correct?.answer].includes(a.answer)).map(a => a.answer),
          isCorrect: user === correct?.answer,
        },
      ],
    };

    onClose();
    onRequestExplanation(explanation);
  };

  const handleShowVideo = () => {
    setIsVideoLoading(true);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setTimeout(() => {
      setIsVideoLoading(false);
      setShowVideo(true);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl z-10 overflow-y-auto shadow-xl max-h-[90vh] max-w-[90vw] w-full md:w-[700px] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-blue-600 hover:text-blue-700 transition-colors duration-300">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">📝 Bài Trắc Nghiệm</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-blue-600">Đang tải câu hỏi...</p>
          </div>
        ) : (
          questions.map((q, idx) => {
            const correct = q.answers.find(a => a.isCorrectAnswer === "true");
            const userChoice = answers[idx];
            const correctLetter = correct?.answer.charAt(0);
            const isWrong = isSubmitted && answers[idx] !== correctLetter;

            return (
              <div key={idx} ref={el => quizRefs.current[idx] = el} className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="font-medium mb-4 text-blue-800">Câu {idx + 1}: {q.question}</p>
                {q.answers.map((ans, i) => {
                  const choice = ans.answer.charAt(0);
                  let colorClass = "border-blue-200 hover:bg-blue-50";

                  if (isSubmitted) {
                    if (choice === correctLetter) colorClass = "bg-green-50 border-green-500 font-bold text-green-700";
                    else if (choice === userChoice && choice !== correctLetter) colorClass = "bg-red-50 border-red-500 text-red-700";
                  }

                  return (
                    <label
                      key={i}
                      className={`block border p-3 rounded-lg cursor-pointer mb-2 transition-all duration-300 ${colorClass}`}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={choice}
                        disabled={isSubmitted}
                        checked={userChoice === choice}
                        onChange={() => handleOptionChange(idx, choice)}
                        className="mr-2 accent-blue-600"
                      />
                      {ans.answer}
                    </label>
                  );
                })}

                {isSubmitted && (
                  <div className="mt-3">
                    <p className={`text-sm font-medium ${userChoice === correctLetter ? 'text-green-600' : 'text-red-600'}`}>
                      {userChoice === correctLetter
                        ? '✅ Đáp án đúng!'
                        : `❌ Sai rồi! Đáp án đúng là: ${correct?.answer}`}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Nộp Bài
            </button>
          ) : (
            <>
              <p className="text-center font-bold text-blue-800">
                ✅ Đúng {getScore()} / {questions.length} câu
              </p>
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                Làm Lại
              </button>
              {hasWrongAnswers() && (
                <button
                  onClick={() => {
                    setShowVideoPanel(true);
                    setCurrentWrongIndex(0);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  📺 Xem Video Chữa Bài
                </button>
              )}
            </>
          )}
        </div>

        {isVideoLoading && (
          <div className="mt-8 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-lg text-blue-600">Đang kết nối gia sư...</p>
          </div>
        )}

        {showVideo && !isVideoLoading && (
          <div className="mt-8" ref={bottomRef}>
            <h3 className="text-xl font-semibold mb-4 text-blue-800">📺 Video Chữa Bài</h3>
            <video
              id="plyr-video"
              className="w-full h-[400px] rounded-xl shadow-lg"
              controls
            >
              <source src={videoPath} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <ExplanationPanel
        visible={showVideoPanel}
        onClose={() => setShowVideoPanel(false)}
        currentIndex={currentWrongIndex}
        wrongIndexes={wrongIndexes}
        questions={questions}
        setCurrentIndex={setCurrentWrongIndex}
      />
    </div>
  );
};

export default QuizPopup1;