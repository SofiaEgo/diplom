import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });
      const botMessage = { sender: "bot", text: response.data.text };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#343541] rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg shadow-md ${
                msg.sender === "user"
                  ? "bg-[#3e3f4b] text-white"
                  : "bg-[#444654] text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow p-3 bg-[#40414f] text-white rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#565869] transition duration-300"
          placeholder="Enter your message..."
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-[#40414f] text-white rounded-r-lg hover:bg-[#565869] transition duration-300"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
