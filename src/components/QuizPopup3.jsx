import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaHourglassHalf } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { FaVolumeUp } from 'react-icons/fa';
import explainData from '/home/iec/DMHUNG/lisa_ui_new/src/assets/explain.json';

// Dữ liệu câu hỏi được tích hợp trực tiếp
const quizData = {
  "_id": {
    "$oid": "682368892d452214ae375ff7"
  },
  "topic": "03_ctdl",
  "questions": [
    {
      "question": "Cấu trúc dữ liệu List trong Python có đặc điểm gì?",
      "answers": [
        {
          "answer": "A) Có thể thay đổi và có thứ tự",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "B) Không thể chứa các phần tử lặp lại",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Không thể thay đổi và không có thứ tự",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) Chỉ chứa số nguyên",
          "isCorrectAnswer": "false"
        }
      ]
    },
    {
      "question": "Set trong Python có đặc điểm nổi bật nào?",
      "answers": [
        {
          "answer": "A) Có thể chứa phần tử giống nhau",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Hỗ trợ truy cập bằng chỉ số",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Có thứ tự cố định",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) Không chứa phần tử trùng lặp",
          "isCorrectAnswer": "true"
        }
      ]
    },
    {
      "question": "Kiểu dữ liệu Dictionary dùng để:",
      "answers": [
        {
          "answer": "A) Tạo số ngẫu nhiên",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Lưu danh sách có thứ tự",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Lưu trữ cặp khóa - giá trị",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "D) Tạo vòng lặp",
          "isCorrectAnswer": "false"
        }
      ]
    },
    {
      "question": "Deque là gì trong Python?",
      "answers": [
        {
          "answer": "A) Một kiểu dữ liệu không thể thay đổi",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Một loại List chỉ đọc",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Một dạng Dictionary mở rộng",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) Hàng đợi hai đầu",
          "isCorrectAnswer": "true"
        }
      ]
    },
    {
      "question": "Tuple khác List ở điểm nào?",
      "answers": [
        {
          "answer": "A) Không thể thay đổi giá trị sau khi tạo",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "B) Có thể chứa phần tử trùng",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Có thể thay đổi",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) Hỗ trợ thêm và xoá phần tử",
          "isCorrectAnswer": "false"
        }
      ]
    },
    {
      "question": "Frozenset là:",
      "answers": [
        {
          "answer": "A) List đặc biệt",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Một Tuple đặc biệt",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Set không thể thay đổi",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "D) Set có thứ tự",
          "isCorrectAnswer": "false"
        }
      ]
    },
    {
      "question": "Chuỗi (String) trong Python là kiểu dữ liệu:",
      "answers": [
        {
          "answer": "A) Chỉ hỗ trợ tiếng Anh",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Có thể thay đổi",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Không thể thay đổi",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "D) Chứa số nguyên",
          "isCorrectAnswer": "false"
        }
      ]
    },
    {
      "question": "Phép toán nào được dùng để truy xuất phần tử trong List?",
      "answers": [
        {
          "answer": "A) Giá trị khóa",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) Tên phần tử",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) Vòng lặp",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) Chỉ số (index)",
          "isCorrectAnswer": "true"
        }
      ]
    },
    {
      "question": "Hàm nào dùng để thêm phần tử vào Set?",
      "answers": [
        {
          "answer": "A) extend()",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "B) append()",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) insert()",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) add()",
          "isCorrectAnswer": "true"
        }
      ]
    },
    {
      "question": "Hàm nào dùng để duyệt qua từng phần tử trong Dictionary?",
      "answers": [
        {
          "answer": "A) for key in dict",
          "isCorrectAnswer": "true"
        },
        {
          "answer": "B) while key in dict",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "C) switch dict",
          "isCorrectAnswer": "false"
        },
        {
          "answer": "D) if key in dict",
          "isCorrectAnswer": "false"
        }
      ]
    }
  ]
}

const ExplanationPanel = ({ visible, onClose, currentIndex, wrongIndexes, questions, setCurrentIndex }) => {
  if (!visible || wrongIndexes.length === 0) return null;
  const realIndex = wrongIndexes[currentIndex];
  const videoSrc = `/chat/video/ami_${String(realIndex + 1).padStart(2, '0')}_00001-audio.mp4`;
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
        <div className="w-[300px] h-[500px] bg-white shadow-lg border border-gray-300 rounded-md p-4 pointer-events-auto overflow-y-auto">
          {isGeneratingAI ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700">Đang kết nối với gia sư ...</p>
              <div className="text-center mb-2">{progress}%</div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
              {rawSubtitle}
            </p>
          )}
        </div>

        {/* Video Section */}
        <div className="w-[300px] bg-white shadow-lg border border-gray-300 rounded-md p-3 pointer-events-auto flex flex-col items-center justify-start">
          {isGeneratingAI ? (
            <div className="h-[420px] flex flex-col items-center justify-center w-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-700 mt-2">Đang kết nối với gia sư ...</p>
              <div className="text-center mb-2">{progress}%</div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-[380px] overflow-hidden flex items-center justify-center shadow-md"
              style={{ borderRadius: '50% / 60%' }}>
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
              className="bg-blue-600 text-white px-3 py-[6px] rounded hover:bg-blue-700 disabled:opacity-50"
            >◀ Trước</button>

            <div className="flex items-center gap-2 flex-1 justify-center">
              <FaVolumeUp className="text-gray-600" />
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
              className="bg-blue-600 text-white px-3 py-[6px] rounded hover:bg-blue-700 disabled:opacity-50"
            >Tiếp ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizPopup3 = ({ isOpen, onClose, apiUrl, onRequestExplanation }) => {
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
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg z-10 overflow-y-auto shadow-xl max-h-[90vh] max-w-[90vw] w-full md:w-[700px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">📝 Bài Trắc Nghiệm</h2>

        {isLoading ? (
          <p>Đang tải câu hỏi...</p>
        ) : (
          questions.map((q, idx) => {
            const correct = q.answers.find(a => a.isCorrectAnswer === "true");
            const userChoice = answers[idx];
            const correctLetter = correct?.answer.charAt(0);
            const isWrong = isSubmitted && answers[idx] !== correctLetter;

            return (
              <div key={idx} ref={el => quizRefs.current[idx] = el} className="mb-6 p-4 border rounded">
                <p className="font-medium mb-2">Câu {idx + 1}: {q.question}</p>
                {q.answers.map((ans, i) => {
                  const choice = ans.answer.charAt(0);
                  let colorClass = "border-gray-300";

                  if (isSubmitted) {
                    if (choice === correctLetter) colorClass = "bg-green-100 border-green-500 font-bold";
                    else if (choice === userChoice && choice !== correctLetter) colorClass = "bg-red-100 border-red-500";
                  }

                  return (
                    <label
                      key={i}
                      className={`block border p-2 rounded-lg cursor-pointer mb-2 transition-colors ${colorClass}`}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={choice}
                        disabled={isSubmitted}
                        checked={userChoice === choice}
                        onChange={() => handleOptionChange(idx, choice)}
                        className="mr-2"
                      />
                      {ans.answer}
                    </label>
                  );
                })}

                {isSubmitted && (
                  <div className="mt-2">
                    <p className={`text-sm ${userChoice === correctLetter ? 'text-green-600' : 'text-red-600'}`}>
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Nộp Bài
            </button>
          ) : (
            <>
              <p className="text-center font-bold">
                ✅ Đúng {getScore()} / {questions.length} câu
              </p>
              <button
                onClick={handleRetry}
                className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
              >
                Làm Lại
              </button>
              {hasWrongAnswers() && (
                <button
                  onClick={() => {
                    setShowVideoPanel(true);
                    setCurrentWrongIndex(0);
                  }}
                  className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
                >
                  📺 Xem Video Chữa Bài
                </button>
              )}
            </>
          )}
        </div>

        {isVideoLoading && (
          <div className="mt-8 flex justify-center items-center">
            <FaHourglassHalf className="text-4xl text-blue-500 animate-pulse" />
            <p className="ml-4 text-lg">Đang kết nối gia sư...</p>
          </div>
        )}

        {showVideo && !isVideoLoading && (
          <div className="mt-8" ref={bottomRef}>
            <h3 className="text-xl font-semibold mb-2">📺 Video Chữa Bài</h3>
            <video
              id="plyr-video"
              className="w-full h-[400px] rounded-lg shadow-lg"
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

export default QuizPopup3;