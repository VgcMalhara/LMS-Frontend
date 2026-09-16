import { useState, useEffect, useRef } from 'react';
import { Brain, Send, Bot, User, Loader2, Zap, ExternalLink } from 'lucide-react';
import api from '../../api/axios';

const AIAdvisor = () => {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm your LearnHub AI Advisor. Tell me what career path you're aiming for or what skills you want to learn, and I'll guide you with the best course recommendations!"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [requestsRemaining, setRequestsRemaining] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    useEffect(() => {
        const fetchUsageLimit = async () => {
            try {
                const response = await api.get('/ai/usage');
                if (response.data.requestsRemaining !== undefined) {
                    setRequestsRemaining(response.data.requestsRemaining);
                }
            } catch (err) {
                console.error("Failed to fetch API usage limit", err);
            }
        };

        fetchUsageLimit();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage = prompt.trim();
        setPrompt('');
        
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await api.post('/ai/recommendations', { prompt: userMessage });
            const aiReply = response.data.recommendation || response.data.message || "Here is your recommended path based on your request.";

            if (response.data.requestsRemaining !== undefined) {
                setRequestsRemaining(response.data.requestsRemaining);
            }

            setChatHistory(prev => [...prev, { role: 'assistant', content: aiReply }]);
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Sorry, I couldn't process your request right now. Please try again later.";
            setChatHistory(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    // AI message (ID: xxxxx) Clickable Link
    const renderFormattedContent = (content) => {
        if (!content) return null;

        const idRegex = /\(ID:\s*([a-fA-F0-9]{24})\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = idRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push(content.substring(lastIndex, match.index));
            }

            const courseId = match[1];
            
            parts.push(
                <a
                    key={match.index}
                    href={`/courses/${courseId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-xl border border-blue-200 transition mx-1 align-middle text-xs shadow-sm"
                >
                    <span>View Course</span>
                    <ExternalLink size={12} className="shrink-0" />
                </a>
            );

            lastIndex = idRegex.lastIndex;
        }

        if (lastIndex < content.length) {
            parts.push(content.substring(lastIndex));
        }

        return <p className="whitespace-pre-line">{parts}</p>;
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 flex flex-col h-[calc(100vh-80px)]">
            
            {/* Top Header & Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shrink-0">
                <div className="text-center sm:text-left flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 shadow-inner border border-blue-100/50">
                        <Brain size={22} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">LearnHub AI Advisor</h1>
                        <p className="text-xs font-medium text-slate-500">Get personalized career paths and course suggestions instantly.</p>
                    </div>
                </div>

                {requestsRemaining !== null && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm text-blue-700 text-xs font-bold shrink-0">
                        <Zap size={14} className="text-blue-600 fill-blue-600" />
                        <span>API Requests Left: <strong className="text-blue-900">{requestsRemaining} / 250</strong></span>
                    </div>
                )}
            </div>

            {/* Chat Box Container */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex-1 flex flex-col overflow-hidden">
                
                {/* Messages Scroll Area with proper bottom padding */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
                    {chatHistory.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex items-start gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${
                                msg.role === 'user' 
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
                                : 'bg-gradient-to-br from-indigo-600 to-blue-700'
                            }`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                                msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-600/10'
                                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                            }`}>
                                {msg.role === 'user' ? (
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                ) : (
                                    renderFormattedContent(msg.content)
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-start gap-3.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-md">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <Loader2 size={15} className="animate-spin text-blue-600" />
                                <span>AI is thinking about your career path...</span>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Area at the bottom inside flex flow (No overlapping) */}
                <form 
                    onSubmit={handleSubmit} 
                    className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-3 shadow-md shrink-0"
                >
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask for course recommendations (e.g., 'I want to become a MERN stack developer')..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 placeholder:text-slate-400 text-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
                    >
                        <span>Send</span>
                        <Send size={15} />
                    </button>
                </form>

            </div>

        </div>
    );
};

export default AIAdvisor;