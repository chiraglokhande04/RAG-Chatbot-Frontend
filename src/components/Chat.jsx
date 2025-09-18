import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import "../styles/Chat.scss";

const API_URL = import.meta.env.VITE_API_URL;

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("Thinking...");
    const chatEndRef = useRef(null);

    const loadingTexts = [
        "🤔 Thinking...",
        "⏳ Getting answer ready...",
        "📡 Searching in sources...",
        "🧠 Processing your question...",
        "💡 Almost there...",
    ];

    // Rotate loading messages
    useEffect(() => {
        if (!loading) return;
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % loadingTexts.length;
            setLoadingMsg(loadingTexts[i]);
        }, 1500); // change every 1.5s
        return () => clearInterval(interval);
    }, [loading]);

    // Create session on mount
    useEffect(() => {
        async function initSession() {
            let existingId = localStorage.getItem("sessionId");

            if (!existingId) {
                const res = await axios.post(`${API_URL}/api/session`);
                existingId = res.data.sessionId;
                localStorage.setItem("sessionId", existingId);
            }

            setSessionId(existingId);
            await fetchHistory(existingId);
        }
        initSession();
    }, []);


    // Scroll to bottom on new messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loadingMsg]);

    // Helper: fetch chat history
    const fetchHistory = async (id) => {
        try {
            const res = await axios.get(`${API_URL}/api/session/${id}/history`);
            const history = (res.data.history || []).map((msg) => ({
                role: msg.role || "user",
                text: msg.text || "",
                sources: msg.sources || [],
            }));
            setMessages(history);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        }
    };


    // Send a new message
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);

        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/api/chat`, {
                sessionId,
                message: input,
            });

            setLoading(false);

            const botMsg = {
                role: "assistant",
                text: res.data.answer,
                sources: res.data.sources || []
            };
            setMessages((prev) => [...prev, botMsg]);

        } catch (err) {
            console.error("Chat error:", err);
            setLoading(false);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "⚠️ Error contacting server." },
            ]);
        }
    };

    // Reset session
    const resetSession = async () => {
        if (!sessionId) return;
        await axios.post(`${API_URL}/api/session/${sessionId}/clear`);
        setMessages([]);
        const res = await axios.post(`${API_URL}/session`);
        const newSessionId = res.data.sessionId;
        setSessionId(newSessionId);
        await fetchHistory(newSessionId);
    };

    return (
        
        <div className="chat-container">
            <div className="chat-header">
                <h2>📰 News Chatbot</h2>
                <button onClick={resetSession}>Reset</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <Message key={idx} role={msg.role} text={msg.text} />
                ))}

                {/* show rotating loading messages while waiting */}
                {loading && <Message role="assistant" text={loadingMsg} />}

                <div ref={chatEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Ask me something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} disabled={loading}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
