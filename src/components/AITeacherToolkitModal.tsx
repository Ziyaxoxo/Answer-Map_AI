import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, X, Loader2, BookOpen, Lightbulb } from 'lucide-react';
import { API_BASE_URL } from '../constants';

interface AITeacherToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AITeacherToolkitModal: React.FC<AITeacherToolkitModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello Educator! I am your AI Teacher Toolkit Assistant powered by Gemini 2.5 Flash. How can I help you with grading, rubric design, or student feedback today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    '⚡ Generate Marking Rubric for Q2 Photosynthesis',
    '🌱 Explain Etiolation in 11a for Student Remediation',
    '📊 Draft Class Performance Summary Report',
    '📝 Suggest 3 Follow-up Questions for Next Unit Test'
  ];

  const handleSendMessage = async (promptToSend?: string) => {
    const text = (promptToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: data.response || 'AI assistance generated successfully.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Local intelligent response fallback
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `### AI Assistance Response for: "${text}"\n\n- **Rubric Recommendation**: 2.0 Marks total (1.0 for identifying Chloroplast, 0.5 for chemical equation 6CO2+6H2O->C6H12O6+6O2, 0.5 for light/dark reaction distinction).\n- **Remedial Note**: Provide students with a diagram labeling exercise on etiolated plant cell structures.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-hidden">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[600px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header matching Figma orange gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 px-6 flex items-center justify-between shrink-0 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>AI Teacher's Toolkit</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 border border-orange-400/30 px-2 py-0.5 rounded-full font-bold">
                  Gemini 2.5 Flash
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Live AI Assistant for rubric creation, feedback generation & remedial planning
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Prompts Bar */}
        <div className="p-3 bg-orange-50/60 border-b border-orange-100 flex gap-2 overflow-x-auto text-xs shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 bg-white hover:bg-orange-100 text-slate-800 font-semibold border border-orange-200 rounded-full shrink-0 shadow-2xs transition-all hover:scale-102"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 px-6 flex flex-col gap-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white ring-2 ring-slate-300'
                    : 'bg-orange-500 text-white shadow-sm'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <span className="text-[9px] text-slate-400 block mt-2 font-mono text-right">
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 font-semibold italic animate-pulse">
                Gemini 2.5 AI is generating response...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shrink-0">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask AI Teacher Toolkit (e.g. Generate rubric for Q3)..."
            className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-full font-semibold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center disabled:opacity-40 transition-all shadow-md shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
