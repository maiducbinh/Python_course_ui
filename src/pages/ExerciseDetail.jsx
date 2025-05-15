import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import exercises from '../data/exercises';
import Navbar from './Navbar';

// Add Google Fonts
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
`;
document.head.appendChild(fontStyle);

export default function ExerciseDetail() {
  const { id } = useParams();
  const ex = exercises.find(e => e.id === id);

  if (!ex) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
        <p>Bài tập <strong>{id}</strong> không tồn tại.</p>
        <Link to="/exercises">← Quay lại danh sách</Link>
      </div>
    );
  }

  const [code, setCode] = useState('');

  // 1) Hàm highlight: escape HTML, sau đó replace regex
  const highlight = (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

      // chuỗi (string)
      .replace(/(".*?"|'.*?')/g, '<span style="color:#A31515;">$1</span>')

      // từ khóa JS
      .replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|new|class|extends|import|from|export)\b/g,
               '<span style="color:#0000FF;">$1</span>')

      // số
      .replace(/\b(\d+)\b/g, '<span style="color:#098658;">$1</span>');
  };

  // 2) Memo hóa để chỉ rebuild HTML khi code thay đổi
  const highlightedCode = useMemo(() => highlight(code), [code]);

  return (
    <div className="min-h-screen" style={{ paddingTop: '100px', fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div style={{ padding: 20, fontFamily: 'Roboto, sans-serif' }}>
        {/* Nội dung & ví dụ */}
    <section style={{
        background: '#f9f9f9', padding: 16, borderRadius: 4,
        border: '1px solid #eee', marginBottom: 20
    }}>
        <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Nội dung</h2>
        <pre style={{
        margin: 0, fontFamily: 'Roboto Mono, Fira Mono, Consolas, monospace', whiteSpace: 'pre-wrap'
        }}>{ex.content}</pre>

        <h2 style={{ fontSize: 18, margin: '16px 0 8px' }}>Ví dụ</h2>
        <pre style={{
        margin: 0, fontFamily: 'Roboto Mono, Fira Mono, Consolas, monospace', whiteSpace: 'pre-wrap',
        background: '#fff', padding: 12, borderRadius: 4, border: '1px solid #ddd'
        }}>{ex.example}</pre>
    </section>



        {/* Code editor có syntax highlight */}
        <section>
          <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Viết mã của bạn</h2>

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 300,
              fontFamily: 'Roboto Mono, monospace',
              fontSize: 14,
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
              overflow: 'auto'
            }}
          >
            {/* 2a) Pre để show màu */}
            <pre
              aria-hidden="true"
              style={{
                margin: 0,
                padding: 12,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                pointerEvents: 'none'
              }}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />

            {/* 2b) Textarea trong suốt để input */}
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Tab') {
                    e.preventDefault();
                    const textarea = e.target;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    // Chèn một ký tự Tab (\t) tại vị trí con trỏ
                    const newCode = code.substring(0, start) + '\t' + code.substring(end);
                    setCode(newCode);

                    // Đặt lại vị trí con trỏ sau khi cập nhật state
                    // setTimeout để đảm bảo React đã render xong
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = start + 1;
                    }, 0);
                    }
                }}
                placeholder="// viết code ở đây..."
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 12,
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    color: 'transparent',
                    background: 'transparent',
                    caretColor: '#000',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    overflow: 'auto',
                    boxSizing: 'border-box'
                }}
                />

          </div>

          <div style={{ marginTop: 12 }}>
            <button
              style={{
                padding: '8px 16px',
                fontSize: 14,
                borderRadius: 4,
                border: 'none',
                background: '#28a745',
                color: '#fff',
                cursor: 'pointer'
              }}
              onClick={() => alert('Chưa implement chạy code')}
            >
              Nộp bài
            </button>
            <Link to="/exercises" style={{ marginLeft: 12, color: '#0066cc' }}>
              ← Quay lại
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
