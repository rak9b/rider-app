import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const SUGGESTED_PROMPTS = [
    "What's next on your roadmap?",
    "Tell me about the mobile app",
    "How does payment work?",
    "Safety features overview"
];

const KNOWLEDGE_BASE: Record<string, string> = {
    roadmap: "Our roadmap includes: 🚀 Mobile App (Q2 2026), 💳 Crypto Payments, 🌍 Multi-city Expansion, and 🤖 AI-based Dynamic Pricing!",
    mobile: "The Mobile App (iOS & Android) is in development and expected to launch in Q2 2026. It will have all web features plus offline mode!",
    payment: "Currently we support Credit/Debit Cards. Coming soon: Digital Wallets (Apple Pay, Google Pay) and Cryptocurrency payments!",
    safety: "Safety First! 🛡️ Features include: Real-time GPS tracking, SOS button, Emergency contacts, Voice-activated alerts, and 24/7 Support.",
    feature: "Key features: Role-based dashboards, Live tracking, Earnings analytics, Admin controls, and Premium glassmorphism UI!",
    help: "I can help you with: Platform roadmap, Upcoming features, Payment options, Safety measures, or Account settings. Just ask!"
};

export const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hi! I\'m an AI assistant here to help you learn about this platform. Ask me anything about skills, projects, or experience!',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (userMessage: string): string => {
        const lowerMsg = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
            if (lowerMsg.includes(key)) {
                return response;
            }
        }

        return "I'm here to help! Try asking about: 'roadmap', 'mobile app', 'payments', 'safety features', or 'help' to see all I can do! 🤖";
    };

    const handleSend = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getAIResponse(messageText),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const handlePromptClick = (prompt: string) => {
        handleSend(prompt);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] flex flex-col"
                    >
                        <GlassCard className="h-full flex flex-col overflow-hidden border-primary-500/30">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-600 to-violet-600 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Sparkles className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-white/90 text-xs">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full">Powered by Velox AI</span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-primary-500 to-violet-500 text-white'
                                                : 'bg-slate-800/80 text-white border border-slate-700/50'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <span className="text-[10px] opacity-60 mt-1 block">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-slate-800/80 rounded-2xl px-4 py-3 border border-slate-700/50">
                                            <div className="flex gap-1">
                                                <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="h-2 w-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggested Prompts */}
                            {messages.length <= 1 && (
                                <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/50">
                                    <div className="flex flex-wrap gap-2">
                                        {SUGGESTED_PROMPTS.map((prompt) => (
                                            <button
                                                key={prompt}
                                                onClick={() => handlePromptClick(prompt)}
                                                className="text-xs px-3 py-1.5 rounded-full bg-primary-500/20 text-primary-300 hover:bg-primary-500/30 border border-primary-500/30 transition-all hover:scale-105"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="p-3 bg-slate-900/80 border-t border-slate-800/50">
                                <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700/50">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        className="bg-gradient-to-r from-primary-500 to-violet-500 text-white p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
                                        disabled={!inputValue.trim()}
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all ${isOpen
                    ? 'bg-slate-800 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white'
                    }`}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
        </>
    );
};
