import React, { useState, useEffect } from "react";
import { FaBars, FaChevronLeft, FaHome, FaComment } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import Chatbot1 from "./Chatbot1";
import Chatbot2 from "./Chatbot2";
import Chatbot3 from "./Chatbot3";
import Chatbot4 from "./Chatbot4";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Navbar from "../pages/Navbar";

const ChatUI = () => {
  const [chatbots, setChatbots] = useState([
    { id: 1, name: "Giới thiệu về Python", avatar: "https://cdn-icons-png.flaticon.com/512/1698/1698535.png", lastMessage: "" },
    { id: 2, name: "Python cơ bản", avatar: "https://cdn-icons-png.flaticon.com/128/8943/8943377.png", lastMessage: "" },
    { id: 3, name: "Cấu trúc dữ liệu trong Python", avatar: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png", lastMessage: "" },
    { id: 4, name: "Hướng đối tượng trong Python", avatar: "https://cdn-icons-png.flaticon.com/128/17807/17807965.png", lastMessage: "" },
  ]);
  const [currentChat, setCurrentChat] = useState(chatbots[0]);
  const [chatHistories, setChatHistories] = useState({
    1: [
      { id: 1, text: "Rất vui được gặp bạn, mình là LISA, trợ lí cho chương giới thiệu về Python. Mình có thể giúp gì cho bạn không?", sender: "bot", timestamp: new Date().toLocaleTimeString(), sources: [] },
    ],
    2: [
      { id: 1, text: "Xin chào! Mình là LISA, trợ lí cho chương Python cơ bản. Mình có thể giúp gì cho bạn không?", sender: "bot", timestamp: new Date().toLocaleTimeString(), sources: [] },
    ],
    3: [
      { id: 1, text: "Chào bạn! Mình là LISA, trợ lí cho chương Cấu trúc dữ liệu trong Python. Mình có thể giúp gì cho bạn không?", sender: "bot", timestamp: new Date().toLocaleTimeString(), sources: [] },
    ],
    4: [
      { id: 1, text: "Chào bạn! Mình là LISA, trợ lí cho chương Hướng đối tượng trong Python. Mình có thể giúp gì cho bạn không?", sender: "bot", timestamp: new Date().toLocaleTimeString(), sources: [] },
    ],
  });
  const [isSpeakerActive, setIsSpeakerActive] = useState(false);
  const [isSourcePopupOpen, setIsSourcePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSources, setSelectedSources] = useState([]);
  const [currentView, setCurrentView] = useState("chat");

  const speechSynthesis = window.speechSynthesis;

  const toggleSpeaker = () => {
    if (isSpeakerActive) {
      speechSynthesis.cancel();
    }
    setIsSpeakerActive(!isSpeakerActive);
  };

  const speakText = async (text) => {
    const url = 'https://api.fpt.ai/hmi/tts/v5';
    const payload = text;
    const headers = {
      'api-key': 'BZGsVoIYFBjbh24kYrIHHBR9oJDId87Y',
      'speed': '',
      'voice': 'linhsan'
    };

    try {
      // Step 1: Send request to get MP3 URL
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: payload
      });

      const result = await response.json();
      const mp3Url = result.async;

      // Step 2: Wait for the MP3 URL to be ready and fetch the audio file
      let audioReady = false;
      let audio = null;

      while (!audioReady) {
        try {
          audio = new Audio(mp3Url);
          await audio.play();
          audioReady = true;
        } catch (error) {
          console.log("Waiting for audio to be ready...");
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        }
      }
    } catch (error) {
      console.error("Error speaking text:", error);
    }
  };

  const toggleSourcePopup = (sources) => {
    setSelectedSources(sources || []);
    setIsSourcePopupOpen(!isSourcePopupOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderIntroduction = () => {
    // return (
    //   <div className="p-6">
    //     <h1 className="text-3xl font-bold mb-4">Welcome to Our Chatbot</h1>
    //     <p className="mb-4">Our chatbot is designed to assist you with various tasks and answer your questions. Here are some key features:</p>
    //     <ul className="list-disc list-inside mb-4">
    //       <li>24/7 availability</li>
    //       <li>Quick responses to common queries</li>
    //       <li>Ability to handle multiple topics</li>
    //       <li>Easy navigation and user-friendly interface</li>
    //       <li>Speech-to-text input for hands-free interaction</li>
    //       <li>Text-to-speech output for auditory feedback</li>
    //     </ul>
    //     <p>To get started, simply click on the chat button and select a chatbot to begin your conversation!</p>
    //   </div>
    // );
    window.location.href = "https://mba.ptit.edu.vn/python/";
  };
  const handleSendMessage = (chatbotId, newMessage) => {
    setChatHistories((prevHistories) => ({
      ...prevHistories,
      [chatbotId]: [...prevHistories[chatbotId], newMessage],
    }));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-full md:w-1/4 lg:w-1/5' : 'w-0'} bg-white/80 backdrop-blur-sm border-r border-blue-200 overflow-y-auto transition-all duration-300 ease-in-out absolute md:relative z-10 h-full`}>
        <div className="flex justify-between items-center p-4 border-b border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800">Chatbots</h2>
          <button onClick={toggleSidebar} className="text-blue-600 hover:text-blue-700 focus:outline-none">
            <FaChevronLeft className="w-5 h-5" />
          </button>
        </div>
        {chatbots.map((chatbot) => (
          <div
            key={chatbot.id}
            className={`flex items-center p-4 hover:bg-blue-50 cursor-pointer transition-all duration-300 ${
              currentChat.id === chatbot.id ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : ""
            }`}
            onClick={() => {
              setCurrentChat(chatbot);
              if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <img
              src={chatbot.avatar}
              alt={chatbot.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{chatbot.name}</h3>
              <p className={`text-sm ${currentChat.id === chatbot.id ? "text-blue-100" : "text-gray-500"} truncate`}>{chatbot.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="mr-4 text-blue-600 hover:text-blue-700 focus:outline-none">
                <FaBars className="w-5 h-5" />
              </button>
            )}
            <img
              src={currentChat.avatar}
              alt={currentChat.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="font-semibold text-blue-800">{currentChat.name}</h2>
              <div className="flex items-center text-sm text-green-500">
                <BsCircleFill className="w-2 h-2 mr-1" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView("home")}
              className={`p-3 rounded-full text-lg transition-all duration-300 ${
                currentView === "home" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md" 
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              title="Home"
            >
              <FaHome className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentView("chat")}
              className={`p-3 rounded-full text-lg transition-all duration-300 ${
                currentView === "chat" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md" 
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              title="Chat"
            >
              <FaComment className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {currentView === "home" ? (
          renderIntroduction()
        ) : (
          <>
            {currentChat.id === 1 && (
              <Chatbot1
                isSpeakerActive={isSpeakerActive}
                toggleSpeaker={toggleSpeaker}
                speakText={speakText}
                toggleSourcePopup={toggleSourcePopup}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                messages={chatHistories[currentChat.id]}
                onSendMessage={(newMessage) => handleSendMessage(currentChat.id, newMessage)}
              />
            )}
            {currentChat.id === 2 && (
              <Chatbot2
                isSpeakerActive={isSpeakerActive}
                toggleSpeaker={toggleSpeaker}
                speakText={speakText}
                toggleSourcePopup={toggleSourcePopup}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                messages={chatHistories[currentChat.id]}
                onSendMessage={(newMessage) => handleSendMessage(currentChat.id, newMessage)}
              />
            )}
            {currentChat.id === 3 && (
              <Chatbot3
                isSpeakerActive={isSpeakerActive}
                toggleSpeaker={toggleSpeaker}
                speakText={speakText}
                toggleSourcePopup={toggleSourcePopup}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                messages={chatHistories[currentChat.id]}
                onSendMessage={(newMessage) => handleSendMessage(currentChat.id, newMessage)}
              />
            )}
            {currentChat.id === 4 && (
              <Chatbot4
                isSpeakerActive={isSpeakerActive}
                toggleSpeaker={toggleSpeaker}
                speakText={speakText}
                toggleSourcePopup={toggleSourcePopup}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                messages={chatHistories[currentChat.id]}
                onSendMessage={(newMessage) => handleSendMessage(currentChat.id, newMessage)}
              />
            )}
          </>
        )}
      </div>

      {/* Source Popup */}
      {isSourcePopupOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <ResizableBox
            width={700}
            height={500}
            minConstraints={[300, 200]}
            maxConstraints={[900, 600]}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header của Popup */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">Sources</h3>
                <button
                  onClick={() => toggleSourcePopup([])}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-300"
                >
                  Close
                </button>
              </div>

              {/* Nội dung Sources */}
              <div className="flex-1 space-y-2 overflow-y-auto">
                {selectedSources.map((source, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-300">
                    <p className="font-medium text-blue-800">{source}</p>
                  </div>
                ))}
              </div>
            </div>
          </ResizableBox>
        </div>
      )}
    </div>
  );
};

export default ChatUI;