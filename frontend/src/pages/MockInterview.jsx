import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/axios'

import {
    Mic,
    Send,
    Pause,
    Play,
    Bot,
    User,
    Volume2,
    VolumeX
} from 'lucide-react'

function MockInterview() {

    const [sessionId, setSessionId] = useState('')
    const [conversation, setConversation] = useState([])
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)

    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const chatEndRef = useRef(null)

    // Speech refs
    const speechRef = useRef(null)
    const isPausedRef = useRef(false)

    const user = JSON.parse(localStorage.getItem('user'))

    const resumeSkills =
        JSON.parse(localStorage.getItem('resume_skills')) || []

    const targetRole =
        localStorage.getItem('target_role') ||
        'Full Stack Developer'

    // Auto Scroll
    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })

    }, [conversation])

    useEffect(() => {

        startInterview()

        return () => {
            window.speechSynthesis.cancel()
        }

    }, [])

    // AI Voice
    const speakText = (text) => {

        // DON'T cancel if paused
        if (!isPausedRef.current) {
            window.speechSynthesis.cancel()
        }

        const speech =
            new SpeechSynthesisUtterance(text)

        speechRef.current = speech

        speech.lang = 'en-US'

        speech.rate = 1
        speech.pitch = 1.2

        const voices =
            window.speechSynthesis.getVoices()

        const femaleVoice =
            voices.find(
                (voice) =>
                    voice.name
                        .toLowerCase()
                        .includes('female')
            ) ||
            voices.find(
                (voice) =>
                    voice.name
                        .toLowerCase()
                        .includes('zira')
            ) ||
            voices.find(
                (voice) =>
                    voice.name
                        .toLowerCase()
                        .includes('samantha')
            ) ||
            voices[0]

        if (femaleVoice) {
            speech.voice = femaleVoice
        }

        speech.onstart = () => {

            setIsSpeaking(true)
            setIsPaused(false)

            isPausedRef.current = false
        }

        speech.onpause = () => {

            setIsPaused(true)
            setIsSpeaking(false)

            isPausedRef.current = true
        }

        speech.onresume = () => {

            setIsPaused(false)
            setIsSpeaking(true)

            isPausedRef.current = false
        }

        speech.onend = () => {

            setIsSpeaking(false)
            setIsPaused(false)

            isPausedRef.current = false
        }

        window.speechSynthesis.speak(speech)
    }

    // Pause / Resume Speech
    const toggleSpeech = () => {

        // Resume
        if (isPausedRef.current) {

            window.speechSynthesis.resume()

            setIsPaused(false)
            setIsSpeaking(true)

            isPausedRef.current = false

            return
        }

        // Pause
        if (window.speechSynthesis.speaking) {

            window.speechSynthesis.pause()

            setIsPaused(true)
            setIsSpeaking(false)

            isPausedRef.current = true
        }
    }

    // Voice Recognition
    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition

        if (!SpeechRecognition) {

            return alert(
                'Please use Google Chrome for voice features.'
            )
        }

        const recognition =
            new SpeechRecognition()

        recognition.lang = 'en-US'

        recognition.onstart = () => {
            setIsListening(true)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript

            setAnswer(transcript)
        }

        recognition.start()
    }

    // Start Interview
    const startInterview = async () => {

        try {

            setLoading(true)

            const response =
                await API.post(
                    '/interview/start/',
                    {
                        email: user?.email,
                        role: targetRole,
                        skills: resumeSkills
                    }
                )

            setSessionId(response.data.session_id)

            setConversation([
                {
                    role: 'assistant',
                    content: response.data.question
                }
            ])

            speakText(response.data.question)

        } catch (error) {

            alert('Failed to start interview')

        } finally {

            setLoading(false)
        }
    }

    // Send Answer
    const sendAnswer = async () => {

        if (!answer.trim() || loading) return

        const userMsg = {
            role: 'user',
            content: answer
        }

        const updatedConversation = [
            ...conversation,
            userMsg
        ]

        setConversation(updatedConversation)

        const currentAnswer = answer

        setAnswer('')

        try {

            setLoading(true)

            const response =
                await API.post(
                    `/interview/chat/${sessionId}/`,
                    {
                        answer: currentAnswer
                    }
                )

            const aiMsg = {
                role: 'assistant',
                content: response.data.reply
            }

            setConversation([
                ...updatedConversation,
                aiMsg
            ])

            speakText(response.data.reply)

        } catch (error) {

            alert(
                'Connection lost. Please try again.'
            )

        } finally {

            setLoading(false)
        }
    }

    return (

        <div
            className="app-page"
            style={{ minHeight: '100vh' }}
        >

            <Navbar />

            <div className="workspace-wrap py-4">

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        {/* Header */}
                        <div className="hero-panel p-4 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">

                            <div>

                                <span
                                    className="badge rounded-pill px-3 py-2 mb-3 fw-semibold"
                                    style={{
                                        background:
                                            'rgba(255,255,255,.16)',
                                        color: '#fff',
                                        border:
                                            '1px solid rgba(255,255,255,.22)'
                                    }}
                                >
                                    Session Active:
                                    {' '}
                                    {targetRole}
                                </span>

                                <h3
                                    className="fw-bold m-0 position-relative"
                                    style={{ zIndex: 1 }}
                                >
                                    Live Mock Interview
                                </h3>

                            </div>

                            <div
                                className="text-end small position-relative"
                                style={{
                                    color:
                                        'rgba(255,255,255,.72)',
                                    zIndex: 1
                                }}
                            >

                                <span className="d-inline-flex align-items-center gap-2">
                                    {isPaused ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                    WebSpeech AI Engine
                                </span>

                                {isSpeaking && (

                                    <div className="ai-speaking mt-2">

                                        AI Interviewer Speaking

                                    </div>

                                )}

                                {isPaused && (

                                    <div className="ai-paused mt-2">

                                        AI Voice Paused

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* Chat */}
                        <div className="chat-shell">

                            <div className="card-body p-0">

                                <div
                                    className="p-4"
                                    style={{
                                        height: '550px',
                                        overflowY: 'auto',
                                        background: 'linear-gradient(180deg, #ffffff, #f7faff)'
                                    }}
                                >

                                    {conversation.map((msg, index) => (

                                        <div
                                            key={index}
                                            className={`d-flex mb-4 ${
                                                msg.role === 'user'
                                                    ? 'justify-content-end'
                                                    : 'justify-content-start'
                                            }`}
                                        >

                                            <div className={`message-bubble-pro ${msg.role === 'user' ? 'is-user' : 'is-ai'}`}>

                                                <div className="small opacity-75 mb-1 fw-bold d-flex align-items-center gap-2">

                                                    {msg.role === 'assistant' ? (
                                                        <>
                                                            <div
                                                                className={`avatar-dot ai-avatar ${
                                                                    isSpeaking
                                                                        ? 'speaking'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <Bot size={16} />
                                                            </div>

                                                            Interviewer
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="avatar-dot bg-dark">
                                                                <User size={16} />
                                                            </span>
                                                            You
                                                        </>
                                                    )}

                                                </div>

                                                {msg.content}

                                            </div>

                                        </div>

                                    ))}

                                    {loading && (

                                        <div className="d-flex mb-4">

                                            <div className="bg-light p-3 rounded-pill shadow-sm">

                                                <div className="typing-indicator">

                                                    <span></span>
                                                    <span></span>
                                                    <span></span>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                    <div ref={chatEndRef} />

                                </div>

                                {/* Controls */}
                                <div className="p-4 bg-white border-top">

                                    <div className="input-group input-group-lg field-shell overflow-hidden">

                                        <input
                                            type="text"
                                            className="form-control border-0 px-4 bg-transparent"
                                            placeholder="Your answer..."
                                            value={answer}
                                            onChange={(e) =>
                                                setAnswer(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                sendAnswer()
                                            }
                                        />

                                        <button
                                            className={`btn px-4 ${
                                                isListening
                                                    ? 'btn-danger'
                                                    : 'btn-outline-secondary'
                                            }`}
                                            onClick={startListening}
                                            type="button"
                                        >

                                            {isListening ? (
                                                <div className="pulse-mic"></div>
                                            ) : (
                                                <Mic size={18} />
                                            )}

                                        </button>

                                        <button
                                            className="btn btn-dark px-4"
                                            onClick={sendAnswer}
                                            disabled={
                                                loading ||
                                                !answer.trim()
                                            }
                                        >

                                            <span className="d-inline-flex align-items-center gap-2">

                                                Send

                                                <Send size={16} />

                                            </span>

                                        </button>

                                    </div>

                                    {/* Pause / Resume Button */}
                                    <div className="d-flex justify-content-center mt-3">

                                        <button
                                            className="btn btn-outline-dark px-4 d-flex align-items-center gap-2"
                                            onClick={toggleSpeech}
                                        >

                                            {isPaused ? (
                                                <>
                                                    <Play size={16} />
                                                    Resume AI Voice
                                                </>
                                            ) : (
                                                <>
                                                    <Pause size={16} />
                                                    Pause AI Voice
                                                </>
                                            )}

                                        </button>

                                    </div>

                                    <p className="text-center text-muted mt-3 small">

                                        Tip: Speak clearly or press
                                        Enter to submit your answer.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <style>{`

                .typing-indicator span {
                    height: 8px;
                    width: 8px;
                    background: #999;
                    display: inline-block;
                    border-radius: 50%;
                    margin-right: 5px;
                    animation: bounce 1.3s infinite;
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.15s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.3s;
                }

                @keyframes bounce {

                    0%, 60%, 100% {
                        transform: translateY(0);
                    }

                    30% {
                        transform: translateY(-4px);
                    }
                }

                .pulse-mic {
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 0 0 rgba(255,255,255, 0.4);
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {

                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(255,255,255,0.7);
                    }

                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(255,255,255,0);
                    }

                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(255,255,255,0);
                    }
                }

                .ai-speaking {
                    color: #fff;
                    font-weight: 600;
                    animation: glow 1.5s infinite;
                }

                .ai-paused {
                    color: #ffe082;
                    font-weight: 600;
                }

                @keyframes glow {

                    0% {
                        opacity: 0.5;
                    }

                    50% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0.5;
                    }
                }

                .ai-avatar {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: #111827;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .ai-avatar.speaking {
                    animation: aiFloat 1.2s infinite ease-in-out;
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #7c3aed
                    );
                    transform: scale(1.08);
                }

                @keyframes aiFloat {

                    0% {
                        transform: translateY(0px) scale(1.05);
                        box-shadow: 0 0 0 0 rgba(124,58,237,.4);
                    }

                    50% {
                        transform: translateY(-6px) scale(1.1);
                        box-shadow: 0 0 0 14px rgba(124,58,237,0);
                    }

                    100% {
                        transform: translateY(0px) scale(1.05);
                        box-shadow: 0 0 0 0 rgba(124,58,237,0);
                    }
                }

            `}</style>

        </div>
    )
}

export default MockInterview
