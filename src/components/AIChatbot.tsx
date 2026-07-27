import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiSettings, FiCheck, FiCpu, FiUser, FiInfo } from 'react-icons/fi';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('anthropic_api_key') || '';
  });
  const [inputKey, setInputKey] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am Anand's AI Assistant. Ask me anything about his technical stack (SAP BTP, Full Stack Web, SwiftUI), B.Tech degree at Parul University, project deployments, or recruitment availability!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    setInputKey(apiKey);
  }, [apiKey]);

  const saveApiKey = () => {
    localStorage.setItem('anthropic_api_key', inputKey.trim());
    setApiKey(inputKey.trim());
    setShowSettings(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('anthropic_api_key');
    setApiKey('');
    setInputKey('');
    setShowSettings(false);
  };

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('languages') || q.includes('expert')) {
      return `Anand Jadhav's core engineering proficiencies:
• SAP Ecosystem: ABAP Cloud, SAP BTP, SAPUI5 / Fiori Elements, OData Services (V2/V4).
• Full Stack Web: React, Next.js, Angular, Node.js, Express, TypeScript, Tailwind CSS.
• Native iOS & AI: Swift, SwiftUI, Combine, TensorFlow, Python, Flask APIs.
• Databases: PostgreSQL, MongoDB, SAP HANA Cloud, SQL.
• DevOps & Cloud: Git, Docker, Vercel, Netlify.`;
    }
    
    if (q.includes('sap') || q.includes('abap') || q.includes('btp') || q.includes('fiori')) {
      return `SAP Technical Profile:
• Certified: SAP Certified Associate - Back-End Developer (ABAP Cloud).
• Experienced in building OData service endpoints, CDS views, and SAP Business Technology Platform (BTP) integrations.
• Developed SAPUI5 enterprise applications consuming live backend data.`;
    }

    if (q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('work') || q.includes('contact') || q.includes('email')) {
      return `Recruitment Availability:
• Status: Available for Full Stack, SAP Developer, or iOS Software Engineering roles.
• Email: anandjadhav42004@gmail.com
• Phone: +91 8308008154
• Timezone: IST (UTC+5:30), Mumbai / Vadodara, India.`;
    }

    if (q.includes('project') || q.includes('built') || q.includes('elvora') || q.includes('ks')) {
      return `Featured Production Deployments:
1. Elvora Media: Digital agency platform built with React, TypeScript & Netlify.
2. KS Beauty: Web app with custom quote calculators built with React & Vercel.
3. Event Management (Utsav26): Campus management app with MongoDB & Express.
4. FunFlix: Media streaming discovery hub built with REST APIs.
5. ProFlow AI: Enterprise workflow automation with SAP BTP & Gemini AI.`;
    }

    if (q.includes('education') || q.includes('university') || q.includes('college')) {
      return `Education Details:
• Degree: B.Tech in Computer Science & Engineering (SAP IEP Track).
• University: Parul Institute of Technology / Parul University, Vadodara, India.
• Expected Graduation: 2027.`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hello! How can I assist your evaluation of Anand Jadhav's background? Feel free to ask about his SAP credentials, web projects, or availability.`;
    }

    return `Anand Jadhav is a B.Tech CSE student specializing in SAP BTP Cloud, Full-Stack Web, and iOS SwiftUI development.
Email: anandjadhav42004@gmail.com for direct recruiting inquiries.`;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const userQuery = message.trim();
    setMessage('');
    
    setMessages(prev => [...prev, { sender: 'user', text: userQuery, timestamp: new Date() }]);
    setIsTyping(true);

    if (apiKey) {
      try {
        const systemPrompt = `
You are the personal AI Assistant for Anand Jadhav, a B.Tech Computer Science student at Parul University specializing in SAP ABAP Cloud, Full-Stack Web (MEAN/MERN), and iOS Development.
Details:
- Email: anandjadhav42004@gmail.com
- Location: Mumbai / Vadodara, India
- Certifications: SAP Certified Associate - ABAP Cloud, Oracle Cloud AI Associate.
- Web Projects: Elvora Media, KS Beauty, Event Management, FunFlix, ProFlow SAP AI.
Rules: Concise, polite, bullet points, professional corporate tone.
`;

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'dangerously-allow-the-api-key-in-the-browser': 'true',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 800,
            system: systemPrompt,
            messages: [{ role: 'user', content: userQuery }],
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const reply = json.content?.[0]?.text || "No response received.";
          setMessages(prev => [...prev, { sender: 'bot', text: reply, timestamp: new Date() }]);
        } else {
          throw new Error('API request failed');
        }
      } catch (err: any) {
        const fallback = generateLocalResponse(userQuery);
        setMessages(prev => [...prev, { sender: 'bot', text: fallback, timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        const reply = generateLocalResponse(userQuery);
        setMessages(prev => [...prev, { sender: 'bot', text: reply, timestamp: new Date() }]);
        setIsTyping(false);
      }, 500);
    }
  };

  const selectQuickQuestion = (q: string) => {
    setMessage(q);
  };

  return (
    <div className="fixed z-[200] bottom-6 right-6 font-sans select-none">
      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer shadow-glow transition-all"
        aria-label="Open AI Assistant"
      >
        <FiCpu className="text-xl" />
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-void" />
      </motion.button>

      {/* Corporate Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[400px] h-[520px] bg-void-2 border border-white/10 rounded-2xl shadow-glass overflow-hidden flex flex-col z-[201] backdrop-blur-xl"
          >
            {/* Header bar */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-void-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FiCpu />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">AI Assistant</h3>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online & Ready
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 text-slate-400">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={`hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer ${showSettings ? 'text-indigo-400 bg-white/5' : ''}`}
                  title="Configure API Key"
                >
                  <FiSettings className="text-sm" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            </div>

            {/* Main pane body */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-void/50">
              
              {/* Settings Drawer */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-0 left-0 w-full bg-void-3 border-b border-white/10 p-4 z-20 overflow-hidden text-xs text-slate-300"
                  >
                    <div className="flex items-start gap-2 text-slate-300 mb-3 bg-white/5 p-2.5 rounded-lg border border-white/5 text-[11px]">
                      <FiInfo className="mt-0.5 flex-shrink-0 text-indigo-400" />
                      <span>Input an Anthropic API key to enable live Claude model inference. Stored locally in your browser.</span>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <input 
                        type="password"
                        placeholder="sk-ant-..."
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-void border border-white/10 text-white text-xs font-mono outline-none focus:border-indigo-500"
                      />
                      <button 
                        onClick={saveApiKey}
                        className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FiCheck /> Save
                      </button>
                    </div>

                    {apiKey && (
                      <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                        <span className="text-emerald-400 font-medium text-[11px]">✓ API Key Configured</span>
                        <button 
                          onClick={clearApiKey}
                          className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                        >
                          Clear Key
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[85%] flex items-start gap-2">
                      <div 
                        className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-void-2 text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-void-2 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Helper Questions */}
              <div className="px-3 py-2 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap select-none bg-void-3/50">
                {[
                  "SAP Certifications?",
                  "Web Projects?",
                  "Availability for hire?",
                  "Education details?"
                ].map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => selectQuickQuestion(q)}
                    className="text-[11px] text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-void-3 flex gap-2">
              <input 
                type="text"
                placeholder="Ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-void border border-white/10 text-white outline-none focus:border-indigo-500 text-xs font-sans"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none shrink-0"
              >
                <FiSend className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
