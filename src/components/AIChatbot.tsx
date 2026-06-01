import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiSettings, FiCheck, FiCpu, FiUser, FiInfo } from 'react-icons/fi';
import { portfolioData, skills, projects, experience } from '../data/portfolio';

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
      text: "Yo! ⚡ I'm Anand's AI Assistant. Ask me anything about his technical stack, B.Tech qualifications, projects, certifications, or availability! (Click ⚙️ to configure live Anthropic Claude responses; otherwise, I query my local knowledge base!)",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
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

  // Pre-programmed smart knowledge base for mock answers
  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Skills
    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('languages') || q.includes('expert')) {
      return `Anand Jadhav's technical expertise spans across:
• **SAP System Stack:** ABAP Cloud, SAP BTP, SAPUI5 / Fiori, OData Services.
• **Full Stack Web:** React, Next.js, Angular, Node.js, Express, Tailwind CSS, TypeScript.
• **Mobile & AI:** Swift, SwiftUI, iOS SDK, TensorFlow, Python, Flask APIs.
• **Databases:** SQL, MongoDB, PostgreSQL, Firebase.
• **DevOps / Cloud:** Git, Docker, Vercel, SAP Business Application Studio (BAS).`;
    }
    
    // SAP Specific
    if (q.includes('sap') || q.includes('abap') || q.includes('btp') || q.includes('fiori')) {
      return `Anand is a certified SAP Developer! Details:
• **SAP Certified Associate – ABAP Cloud** (2024).
• Deployed **Inventory Pro** — a responsive warehousing app using SAPUI5 on SAP BTP using custom ABAP backend service endpoints.
• Experienced in writing OData services, CDS views, and building custom Business application suites.`;
    }

    // Availability / Hiring / Salary / Job / Contact
    if (q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('work') || q.includes('contact') || q.includes('email')) {
      return `Anand is actively looking for Full Stack, SAP cloud dev, or iOS Developer roles! 🟢
• **Email:** [anandjadhav42004@gmail.com](mailto:anandjadhav42004@gmail.com)
• **Phone:** +91 8308008154
• **Timezone:** IST (UTC+5:30) Mumbai
• **Location:** Mumbai / Vadodara, India
He is available to start immediately and ready to join high-performance agile engineering teams.`;
    }

    // Projects
    if (q.includes('project') || q.includes('built') || q.includes('proflow') || q.includes('deepfake')) {
      return `Anand's core projects include:
1. **ProFlow AI (MEAN Stack):** Workflow automation tool utilizing Google Gemini AI to auto-route enterprise tasks.
2. **Inventory Pro (SAP BTP):** Warehouse & inventory manager in SAPUI5 consuming OData.
3. **Deepfake Detection AI:** Flask service powered by deep CNN TensorFlow models to detect facial manipulation.
4. **iOS Weather & Tasks:** Swift/SwiftUI native application streaming REST weather API updates with offline CoreData caches.`;
    }

    // Education
    if (q.includes('education') || q.includes('university') || q.includes('gpa') || q.includes('cgpa') || q.includes('college')) {
      return `Anand Jadav is currently completing his:
• **B.Tech in Computer Science & Engineering (SAP IEP Track)**
• **Parul University / Parul Institute of Technology**, Vadodara, India
• **Graduating class of 2023 - 2027**
His training includes deep foundations in algorithms, enterprise architecture, and object-oriented systems design.`;
    }

    // Experience / History / Background
    if (q.includes('experience') || q.includes('work') || q.includes('intern') || q.includes('freelance')) {
      return `Anand's professional history:
• **Enterprise Software Intern (2024):** Developed business logic UI panels in SAP Fiori & SAPUI5. Worked on OData connectors in the SAP BTP environment.
• **Freelance Full-Stack Developer (2022 - Present):** Deployed 4+ React and Angular web utilities, and Swift native app prototypes.`;
    }

    // General Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('yo')) {
      return `Greetings recruiter! I am Anand's virtual representative. Ask me anything, like:
• *Where did Anand study?*
• *Does he know ABAP Cloud?*
• *What projects did he build?*
• *Is he available for immediate hiring?*`;
    }

    // Certifications
    if (q.includes('certif') || q.includes('credential') || q.includes('license') || q.includes('oracle')) {
      return `Anand holds these professional credentials:
1. **SAP Certified Associate – ABAP Cloud** (2024)
2. **Oracle Cloud Infrastructure AI Foundations Associate** (2024)
3. **HackerRank React & SQL Certificates**
4. **EA (Electronic Arts) Software Engineering Job Simulation**`;
    }

    return `Anand Jadhav is a B.Tech CSE student at Parul University. Specializing in SAP BTP, MEAN stack web, and SwiftUI iOS apps.
    
To consult Claude Sonnet directly for this question ("${query}"), please input an Anthropic API Key via the settings gear icon ⚙️. Or query about his skills, experience, projects, or certifications!`;
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
You are the personal AI Recruiter Assistant for Anand Jadhav, a B.Tech Computer Science student at Parul University (Vadodara) specializing in SAP ABAP, Full Stack (MEAN/MERN), and iOS Development.
Anand's real details:
- B.Tech CSE (SAP IEP Track) at Parul Institute of Technology (2023 - 2027)
- Email: anandjadhav42004@gmail.com
- Phone: +91 8308008154
- Timezone: IST (UTC+5:30), Mumbai.
- Stack: SAP ABAP Cloud, SAP BTP, SAPUI5 / Fiori, OData Services, React, Next.js, Angular, Node.js, Express, TypeScript, Swift, SwiftUI, Python, Flask, TensorFlow, SQL, MongoDB, Git.
- Certifications: SAP Certified Associate - ABAP Cloud (2024), Oracle Cloud AI Foundations Associate (2024), HackerRank React & SQL, EA Job Simulation.
- Projects: ProFlow (MEAN + Gemini AI), Inventory Pro (SAP BTP + SAPUI5), Deepfake Detection AI (Python + TensorFlow), iOS Weather & Tasks (SwiftUI).
- Experience: Enterprise Software Intern (SAPUI5/BTP, 2024), Freelance Web & iOS Developer (2022 - Present).

Rules:
- Speak as Anand's representative assistant.
- Be extremely bold, clear, and professional. 
- Keep answers concise and readable with bullet points.
- Provide email: anandjadhav42004@gmail.com when asked about contact/hiring.
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
            messages: [
              { role: 'user', content: userQuery }
            ],
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const reply = json.content?.[0]?.text || "No response received.";
          setMessages(prev => [...prev, { sender: 'bot', text: reply, timestamp: new Date() }]);
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || 'API rejected request');
        }
      } catch (err: any) {
        console.warn('Claude query failed. Fallback to local response:', err.message);
        const fallback = generateLocalResponse(userQuery);
        const warningSuffix = `\n\n*(Claude API failed: [${err.message}]. Displaying local cache).*`;
        setMessages(prev => [...prev, { sender: 'bot', text: fallback + warningSuffix, timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        const reply = generateLocalResponse(userQuery);
        setMessages(prev => [...prev, { sender: 'bot', text: reply, timestamp: new Date() }]);
        setIsTyping(false);
      }, 700);
    }
  };

  const selectQuickQuestion = (q: string) => {
    setMessage(q);
  };

  return (
    <div className="fixed z-[200] bottom-6 right-6 font-mono select-none">
      {/* Floating Chat Bubble - Black Square */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black border-4 border-black hover:bg-zinc-950 text-white flex items-center justify-center cursor-pointer shadow-[4px_4px_0px_#FFE500]"
        aria-label="Open AI Recruiter Chat"
      >
        <span className="font-sans font-black text-lg tracking-wider">AI</span>
        <span className="absolute top-0 right-0 w-3 h-3 rounded-none bg-brutalist-yellow border-2 border-black" />
      </motion.button>

      {/* Brutalist Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-18 right-0 w-[90vw] sm:w-[420px] h-[550px] border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col z-[201]"
          >
            {/* Header bar */}
            <div className="px-4 py-3 border-b-4 border-black flex items-center justify-between bg-brutalist-yellow text-black">
              <div className="flex items-center gap-2.5">
                <FiCpu className="text-black text-lg" />
                <div>
                  <h3 className="text-xs font-black tracking-wider uppercase">CLAUDE RECRUITER</h3>
                  <span className="text-[9px] font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-black" />
                    Online & Ready
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 text-black">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={`hover:bg-black/10 transition-colors p-1 border border-transparent hover:border-black cursor-pointer ${showSettings ? 'bg-black/20 border-black' : ''}`}
                  title="Configure API Key"
                >
                  <FiSettings className="text-sm font-bold" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-black/10 transition-colors p-1 border border-transparent hover:border-black cursor-pointer"
                >
                  <FiX className="text-sm font-bold" />
                </button>
              </div>
            </div>

            {/* Main pane body */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-white">
              
              {/* API Configuration Drawer overlay */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-0 left-0 w-full bg-white border-b-4 border-black p-4 z-20 overflow-hidden text-[10px] text-black font-semibold"
                  >
                    <div className="flex items-start gap-2 text-black mb-3 bg-brutalist-bg p-2.5 border-2 border-black">
                      <FiInfo className="mt-0.5 flex-shrink-0 text-brutalist-blue" />
                      <span>Note: Input your Anthropic API Key to activate live Claude responses. Stored in client local storage. If left empty, chatbot runs offline simulation mode.</span>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <input 
                        type="password"
                        placeholder="sk-ant-..."
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-black bg-white text-black outline-none focus:bg-brutalist-bg text-xs font-mono"
                      />
                      <button 
                        onClick={saveApiKey}
                        className="px-3 py-2 bg-brutalist-yellow hover:bg-yellow-400 border-2 border-black text-black font-black flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <FiCheck /> Save
                      </button>
                    </div>

                    {apiKey && (
                      <div className="flex justify-between items-center bg-green-100 border-2 border-black p-2 mb-1">
                        <span className="text-emerald-800 font-extrabold uppercase text-[9px]">✓ API Key Active</span>
                        <button 
                          onClick={clearApiKey}
                          className="text-[9px] text-black font-bold hover:underline cursor-pointer"
                        >
                          Delete Key
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Log Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-brutalist-bg">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[85%] flex items-start gap-2">
                      {msg.sender === 'bot' && (
                        <div className="w-6 h-6 border-2 border-black bg-brutalist-yellow flex items-center justify-center flex-shrink-0 text-black text-[10px]">
                          🤖
                        </div>
                      )}
                      <div 
                        className={`border-2 border-black p-2.5 shadow-[2px_2px_0px_#000] leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? 'bg-brutalist-blue text-white rounded-none'
                            : 'bg-white text-black rounded-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-6 h-6 border-2 border-black bg-black text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                          👤
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing status */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="w-6 h-6 border-2 border-black bg-brutalist-yellow flex items-center justify-center flex-shrink-0 text-black text-[10px]">
                        🤖
                      </div>
                      <div className="bg-white border-2 border-black px-3 py-2 flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                        <span className="w-1.5 h-1.5 bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Helper Questions */}
              <div className="px-3 py-2 border-t-2 border-black flex gap-2 overflow-x-auto whitespace-nowrap select-none bg-white">
                {[
                  "Where did Anand study?",
                  "Show his SAP certifications",
                  "List his AI/Fullstack projects",
                  "Is he available for hire?"
                ].map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => selectQuickQuestion(q)}
                    className="text-[9px] text-black font-extrabold hover:bg-brutalist-yellow bg-white border-2 border-black rounded-none px-2.5 py-1 cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t-4 border-black bg-white flex gap-2">
              <input 
                type="text"
                placeholder="Ask about Anand..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 border-2 border-black bg-white text-black outline-none focus:bg-brutalist-bg text-xs font-mono font-bold"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 bg-brutalist-yellow hover:bg-yellow-400 border-2 border-black text-black flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
              >
                <FiSend className="font-bold text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
