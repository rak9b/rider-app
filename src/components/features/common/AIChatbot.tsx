import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "How do I book a ride?",
  "What are the payment options?",
  "How does safety work?",
  "Cancel my last subscription",
  "Contact human support"
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Velox AI. How can I help you move today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("book") || lowerInput.includes("ride")) return "To book a ride, simply enter your pickup and destination on the dashboard and select your preferred vehicle type.";
    if (lowerInput.includes("pay") || lowerInput.includes("card") || lowerInput.includes("cash")) return "We accept Credit Cards, Digital Wallets, and Cash. You can manage your payment methods in Settings.";
    if (lowerInput.includes("safe") || lowerInput.includes("sos")) return "Safety is our priority. You can use the red SOS button during any active trip to contact emergency services immediately.";
    if (lowerInput.includes("human") || lowerInput.includes("support")) return "I've flagged this for a human agent. Someone will contact you shortly via email.";
    if (lowerInput.includes("cancel")) return "You can cancel a ride within 2 minutes of booking without any fee. After that, a small cancellation fee may apply.";
    return "I'm still learning! Could you rephrase that? You can ask me about booking, payments, or safety.";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Velox Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-xs text-indigo-100">AI Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-violet-600 text-white rounded-br-none" 
                      : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-slate-700"
                  )}>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1.5 mb-1 text-xs text-violet-500 font-bold">
                        <Sparkles size={10} /> AI Response
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start w-full">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 dark:border-slate-700 flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (Chips) */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-slate-950/50 flex gap-2 overflow-x-auto scrollbar-hide">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  className="flex-shrink-0 text-xs bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="rounded-xl w-10 h-10 p-0 bg-violet-600 hover:bg-violet-700"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white dark:border-slate-800",
          isOpen 
            ? "bg-gray-800 text-white rotate-90" 
            : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
    </>
  );
};
