import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Mic, Send, X } from 'lucide-react';
import API from '../api/axios';

const Chatbot = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [conversation, setConversation] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const resumeSkills = JSON.parse(localStorage.getItem('resume_skills') || '[]');
  const targetRole = localStorage.getItem('target_role') || 'Full Stack Developer';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, loading]);

  const speakText = (text) => {
    window.speechSynthesis?.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis?.speak(speech);
  };

  const startInterview = async () => {
    if (sessionId) return;

    try {
      setLoading(true);
      const response = await API.post('/interview/start/', {
        email: user?.email,
        role: targetRole,
        skills: resumeSkills,
      });
      setSessionId(response.data.session_id);
      setConversation([{ role: 'assistant', content: response.data.question }]);
      speakText(response.data.question);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    if (!answer.trim() || !sessionId) return;

    const updatedConversation = [...conversation, { role: 'user', content: answer }];
    const currentAnswer = answer;
    setConversation(updatedConversation);
    setAnswer('');

    try {
      setLoading(true);
      const response = await API.post(`/interview/chat/${sessionId}/`, { answer: currentAnswer });
      setConversation([...updatedConversation, { role: 'assistant', content: response.data.reply }]);
      speakText(response.data.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Please use Chrome');

    const recognition = new SpeechRecognition();
    recognition.start();
    setIsListening(true);
    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
  };

  const toggleChat = () => {
    const openingChat = !isOpen;
    setIsOpen(openingChat);

    if (openingChat && window.speechSynthesis?.paused) {
      window.speechSynthesis.resume();
    }

    if (openingChat && conversation.length === 0) startInterview();
  };

  const closeChat = () => {
    if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.pause();
    }
    setIsOpen(false);
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-4 d-flex flex-column align-items-end gap-3" style={{ zIndex: 1050 }}>
      {isOpen && (
        <div className="chat-window shadow-lg border-0 animate-slide-up">
          <div className="chat-header d-flex align-items-center justify-content-between p-3 text-white">
            <div className="d-flex align-items-center gap-2">
              <span className="position-relative d-flex h-2 w-2">
                <span className="animate-ping position-absolute inline-flex h-100 w-100 rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="fw-semibold small">AI Coaching Assistant</span>
            </div>
            <button className="btn btn-sm text-white-50 p-0 hover-white border-0 shadow-none" onClick={closeChat} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chat-body p-3 overflow-y-auto flex-grow-1">
            {conversation.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`message-bubble shadow-sm ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="message-bubble ai-bubble py-2 px-3">
                  <div className="typing-indicator"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer p-2 border-top">
            <div className="chat-input-shell input-group align-items-center px-2 py-1">
              <input
                className="form-control border-0 bg-transparent shadow-none small py-1"
                placeholder="Type your reply..."
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && sendAnswer()}
              />
              <button className={`chat-icon-btn btn rounded-circle border-0 shadow-none d-flex align-items-center justify-content-center ${isListening ? 'is-listening text-white' : 'text-secondary'}`} onClick={startListening} aria-label="Use voice input">
                <Mic size={15} />
              </button>
              <button className="chat-send-btn btn rounded-3 px-3 ms-2 small d-flex align-items-center gap-1 fw-semibold text-white" onClick={sendAnswer} disabled={loading || !sessionId}>
                <span>Send</span> <Send size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="fab-btn shadow-lg btn" onClick={isOpen ? closeChat : toggleChat} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
};

export default Chatbot;
