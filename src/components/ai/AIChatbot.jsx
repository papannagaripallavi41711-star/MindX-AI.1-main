import { useState, useRef, useEffect } from 'react';
import { FiSend, FiCpu } from 'react-icons/fi';
import { initialChatMessages } from '../../data/mockData';

const aiResponses = [
  "That's a great question! Based on your learning pattern, I'd recommend focusing on practice problems first. Try solving 2-3 problems daily on the topic.",
  "I've analyzed your recent quiz results. Your accuracy on tree-related questions is 92%, but graph problems need more attention. Want me to create a practice set?",
  "Here's a quick tip: When studying for DSA, always start with understanding the time complexity before implementing the solution. It helps in choosing the right approach.",
  "Based on your progress, you're ahead of 78% of students in your batch. Keep it up! I suggest focusing on Dynamic Programming this week.",
  "I'd recommend watching the 3Blue1Brown video on neural networks — it explains backpropagation intuitively. Combined with your ML course notes, it should clarify the concept.",
];

export default function AIChatbot({ compact = false }) {
  const [messages, setMessages] = useState(initialChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat-container" style={compact ? { height: '400px' } : {}}>
      <div className="ai-chat-header">
        <div className="ai-chat-avatar">
          <FiCpu />
        </div>
        <div>
          <div className="ai-chat-title">MindX AI Assistant</div>
          <div className="ai-chat-status">Online</div>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.type}`}>
            <div className="chat-msg-avatar">
              {msg.type === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="chat-bubble">
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < msg.text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message bot">
            <div className="chat-msg-avatar">🤖</div>
            <div className="chat-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input">
        <input
          type="text"
          placeholder="Ask anything about your studies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend} disabled={!input.trim()}>
          <FiSend />
        </button>
      </div>
    </div>
  );
}
