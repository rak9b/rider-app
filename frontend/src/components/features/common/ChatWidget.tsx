import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  read: boolean;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I am your Velox AI Assistant. How can I help you today?', sender: 'other', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: true },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roadmapResponses: Record<string, string> = {
    upcoming: "Our upcoming roadmap includes a Mobile App (iOS/Android), Crypto Payments, and Multi-city expansion!",
    future: "In the future, we plan to implement AI-based dynamic pricing and self-driving fleet integration.",
    mobile: "The mobile app is currently in development and is expected to launch in Q2 2026.",
    payment: "We currently support Credit Cards. Digital wallets and Crypto payments are coming soon!",
    safety: "Your safety is our priority. We are adding 'Voice-activated SOS' and 'Real-time Video Monitoring' next month.",
    help: "I can tell you about our roadmap, upcoming features, or help you with your account settings!"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const userText = message.toLowerCase();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI Processing
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, read: true } : m));

      let replyText = "I'm not sure about that, but I've noted it for our developers! Try asking about 'upcoming features' or 'mobile app'.";

      for (const [key, value] of Object.entries(roadmapResponses)) {
        if (userText.includes(key)) {
          replyText = value;
          break;
        }
      }

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Telegram Header */}
            <div className="bg-white dark:bg-slate-900 p-3 flex items-center justify-between border-b border-gray-100 dark:border-black/20 z-10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Velox Support</h3>
                  <p className="text-xs text-primary-500 font-medium">Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area with Pattern */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#8e98a8]/10 dark:bg-[#0f0f0f] relative">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-telegram-pattern"></div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-1.5 shadow-sm relative text-[15px] leading-snug",
                      msg.sender === 'me'
                        ? "bg-[#eeffde] dark:bg-dark-messageOut text-black dark:text-white rounded-tr-sm"
                        : "bg-white dark:bg-dark-messageIn text-black dark:text-white rounded-tl-sm"
                    )}
                  >
                    <p className="mr-8 pb-1">{msg.text}</p>
                    <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                      <span className={cn(
                        "text-[11px]",
                        msg.sender === 'me' ? "text-[#4fae4e] dark:text-blue-300/70" : "text-gray-400"
                      )}>
                        {msg.time}
                      </span>
                      {msg.sender === 'me' && (
                        msg.read ? <CheckCheck size={14} className="text-[#4fae4e] dark:text-blue-400" /> : <Check size={14} className="text-[#4fae4e] dark:text-blue-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-2 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-black/20 flex items-end gap-2">
              <button type="button" className="text-gray-400 hover:text-primary-500 transition-colors p-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                <Paperclip size={22} />
              </button>
              <div className="flex-1 bg-gray-100 dark:bg-dark-input rounded-2xl flex items-center min-h-[44px]">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full bg-transparent border-none focus:ring-0 text-[15px] text-gray-900 dark:text-white placeholder-gray-500 px-4 py-2"
                />
                <button type="button" className="text-gray-400 hover:text-primary-500 transition-colors p-2 mr-1">
                  <Smile size={22} />
                </button>
              </div>
              <button
                type="submit"
                className={cn(
                  "p-3 rounded-full transition-all duration-200 flex items-center justify-center",
                  message.trim()
                    ? "bg-primary-500 text-white hover:bg-primary-600 transform scale-100"
                    : "text-primary-500 bg-transparent hover:bg-primary-50 dark:hover:bg-white/5"
                )}
              >
                <Send size={22} className={message.trim() ? "ml-0.5" : ""} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen
            ? "bg-gray-200 text-gray-600 dark:bg-slate-900 dark:text-white"
            : "bg-primary-500 text-white hover:bg-primary-600"
        )}
        aria-label="Chat with Support"
      >
        <MessageCircle size={28} className={isOpen ? "fill-current" : ""} />
      </button>
    </>
  );
};
