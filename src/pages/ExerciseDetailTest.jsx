import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import exercises from '../data/exercises';
import Navbar from './Navbar';
import DifyIframeToggle from './DifyWidget';
import CodeEditor from '@uiw/react-textarea-code-editor';
import rehypePrism from 'rehype-prism-plus';
import ReactMarkdown from 'react-markdown';
import { FaClock, FaBook } from 'react-icons/fa';
import Footer from './Footer';

// const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API = 'https://0545-113-190-37-142.ngrok-free.app';
const JUDGE0_HEADERS = {
  'X-RapidAPI-Key': '0d12f29982msh3fdffa467c3c059p153cdbjsn39d2532ff1f5', // 🔁 Thay bằng key từ RapidAPI
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'Content-Type': 'application/json'
};

export default function ExerciseDetailTest() {
  const { id } = useParams();
  const ex = exercises.find(e => e.id === id);

  const [code, setCode] = useState('');
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY);
  const [gptVisible, setGptVisible] = useState(false);
  const [gptFeedback, setGptFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null); // IR | WA | AC
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verdict, setVerdict] = useState(null); // { status, message, passed, total, log }

  const language_id = 71; // Python 3

  const runJudgeSubmission = async (code, input, expected_output) => {
    const res = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: JUDGE0_HEADERS,
      body: JSON.stringify({
        language_id,
        source_code: code,
        stdin: input,
        expected_output
      })
    });
    return res.json();
  };

  const analyzeCodeWithGPT = async () => {
    if (!code.trim()) return;

    const testcases = ex.testcases || [];
    let passed = 0;
    let log = '';
    let hasError = false;

    setIsSubmitting(true);
    setVerdict(null);

    for (let i = 0; i < testcases.length; i++) {
      const { input, expected_output } = testcases[i];
      try {
        const result = await runJudgeSubmission(code, input, expected_output);
        const statusId = result.status.id;
        const description = result.status.description;

        const compileError = result.compile_output;
        const runtimeError = result.stderr;

        if (statusId === 3) {
          passed++;
          log += `✅ Test ${i + 1}: Passed\n`;
        } else if (statusId === 5) {
          hasError = true;
          log += `⏱️ Test ${i + 1}: Time Limit Exceeded\n`;
        } else if (statusId === 6) {
          hasError = true;
          log += `💥 Test ${i + 1}: Compilation Error\n    ${compileError?.trim() || ''}\n`;
        } else if (statusId === 7) {
          hasError = true;
          log += `💥 Test ${i + 1}: Runtime Error\n    ${runtimeError?.trim() || ''}\n`;
        } else {
          hasError = true;
          const msg = compileError || runtimeError || '';
          log += `❌ Test ${i + 1}: ${description}\n    ${msg.trim()}\n`;
        }
      } catch (e) {
        hasError = true;
        log += `⚠️ Test ${i + 1}: Không thể kết nối tới Judge0\n`;
      }
    }

    const total = testcases.length;
    let status = 'AC';
    if (hasError) {
      status = passed === 0 ? 'IR' : 'WA';
    } else if (passed < total) {
      status = 'WA';
    }

    const message =
      status === 'AC'
        ? '🎉 Accepted: Tất cả test case đều đúng!'
        : status === 'WA'
        ? `⚠️ Wrong Answer: ${passed}/${total} test case đúng`
        : '💥 Internal Error: Có lỗi biên dịch, runtime hoặc vượt thời gian, hoặc không đúng test nào.';

    setVerdict({ status, passed, total, message, log });
    setIsSubmitting(false);
    if (!apiKey) {
      alert('Vui lòng cung cấp API key GPT.');
      return;
    }

    setLoading(true);
    setGptVisible(true);
    setTestResult(null);

    try {
      // 1. GPT Nhận xét
      const resFeedback = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [
            { role: 'system', content: 'Bạn là một trợ lý lập trình Python. Hãy nhận xét và gợi ý cải thiện cho đoạn code sau.' },
            { role: 'user', content: code }
          ],
          temperature: 0.5
        })
      });
      const feedbackData = await resFeedback.json();
      setGptFeedback(feedbackData?.choices?.[0]?.message?.content || 'Không có phản hồi.');

      // 2. GPT kiểm thử test case
      const resTest = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Bạn là hệ thống kiểm thử Python. Dưới đây là đề bài:\n"""\n${ex.content}\n""" và ví dụ:\n"""\n${ex.example}\n"""\n. \nHãy chạy thử trên máy tính code sau bằng cách kiểm thử 10 test case và ví dụ:\n"""\n${ex.example}\n"""\n .\nPhân loại kết quả như sau:\n- Nếu lỗi cú pháp: IR (kèm lỗi)\n- Nếu sai 1 phần: WA (x/10)\n- Nếu đúng hết: AC\nChỉ trả lời duy nhất kết quả như ví dụ:\nAC\nWA (7/10)\nIR (lỗi: ...)`
            },
            {
              role: 'user',
              content: code
            }
          ],
          temperature: 0
        })
      });

      const testData = await resTest.json();
      const result = testData?.choices?.[0]?.message?.content?.trim() || 'Không rõ kết quả.';

      if (result.startsWith('AC')) setTestResult({ status: 'AC', message: result });
      else if (result.startsWith('WA')) setTestResult({ status: 'WA', message: result });
      else if (result.startsWith('IR')) setTestResult({ status: 'IR', message: result });
      else setTestResult({ status: 'IR', message: 'Không thể xác định kết quả kiểm thử.' });

    } catch (err) {
      setGptFeedback('Lỗi khi kết nối GPT: ' + err.message);
      setTestResult({ status: 'IR', message: 'Lỗi khi kết nối GPT.' });
    }

    setLoading(false);
  };

  if (!ex) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
        <p>Bài tập <strong>{id}</strong> không tồn tại.</p>
        <Link to="/exercises">← Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">{ex.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <FaClock className="mr-1" /> {ex.duration} phút
              </span>
              <span className="flex items-center">
                <FaBook className="mr-1" /> {ex.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{ex.description}</p>
            
            <div className="space-y-6">
              {ex.questions.map((question, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Câu {index + 1}: {question.text}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedAnswers[index] === optionIndex
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            : "bg-white hover:bg-blue-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={selectedAnswers[index] === optionIndex}
                          onChange={() => handleAnswerSelect(index, optionIndex)}
                          className="mr-3"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-300"
              >
                Nộp bài
              </button>
              <div className="text-sm text-gray-500">
                Đã trả lời: {selectedAnswers.filter(answer => answer !== null).length}/{ex.questions.length} câu
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
