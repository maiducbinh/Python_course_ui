import React, { useState } from 'react';

export default function DifyIframeToggle() {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div>
      {/* Nút mở/ẩn chatbot */}
      <button
        onClick={() => setShowIframe(!showIframe)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '10px 16px',
          fontSize: 14,
          background: '#1C64F2',
          color: '#fff',
          border: 'none',
          borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {showIframe ? 'Đóng Chatbot' : 'Mở Chatbot'}
      </button>

      {/* Iframe chatbot hiện khi showIframe=true */}
      <div
        style={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          width: '600px',
          height: '800px',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 1001,
          display: showIframe ? 'block' : 'none', // Ẩn iframe khi showIframe là false
        }}
      >
        <iframe
          src="https://udify.app/chatbot/PNeGZmq8tB3h3DI1"
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="microphone"
          title="Dify Chatbot"
        />
      </div>
    </div>
  );
}
