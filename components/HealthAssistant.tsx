
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Language, ChatMessage } from '../types';

interface HealthAssistantProps {
  lang: Language;
}

const HealthAssistant: React.FC<HealthAssistantProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: lang === Language.TH 
        ? 'สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะจาก MEDdee POOM มีอะไรให้ผมช่วยดูแลวันนี้ไหมครับ?' 
        : 'Hello! I am your MEDdee Assistant. How can I help with your health today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await geminiService.getHealthAdvice(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response || 'Error' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-fade-in">
          {/* Header */}
          <div className="bg-teal-primary p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <div className="text-white">
                <h3 className="font-bold leading-none">MEDdee Assistant</h3>
                <p className="text-xs opacity-80">{lang === Language.TH ? 'ผู้ช่วยส่วนตัวของคุณ' : 'Your Personal AI'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm
                  ${msg.role === 'user' 
                    ? 'bg-teal-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex gap-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === Language.TH ? 'พิมพ์คำถามของคุณ...' : 'Ask a health question...'}
                className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-teal-primary text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by Gemini AI - Use for informational purposes only.
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-teal-primary hover:bg-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group"
        >
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">1</div>
        </button>
      )}
    </div>
  );
};

export default HealthAssistant;
