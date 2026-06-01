import React, { useState, useEffect, useRef } from 'react';
import { skills, experience, projects, portfolioData } from '../data/portfolio';

interface CommandHistoryItem {
  command: string;
  output: string[];
}

const Terminal = () => {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: '',
      output: [
        "Welcome to Anand Jadhav's Interactive Terminal v2.0.0",
        "Type 'anand --help' to discover available query commands.",
        ""
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom of terminal when history changes
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    
    if (!command) return;

    let output: string[] = [];

    if (command === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    switch (command) {
      case 'anand --help':
        output = [
          "Available Commands:",
          "  anand --help        -> Display this command guide list.",
          "  anand --skills      -> Print core technical skill matrices & proficiency bars.",
          "  anand --experience  -> Print chronological career history & timeline.",
          "  anand --projects    -> List featured applications and links.",
          "  anand --contact     -> Output email address and social handles.",
          "  clear               -> Clear terminal console history."
        ];
        break;
      case 'anand --skills':
        output = [
          "TECHNICAL SKILLS DIRECTORY:",
          "=========================",
          ...Object.entries(skills).flatMap(([category, skillList]) => {
            const formattedCategory = category.toUpperCase().replace('_', '/');
            const lines = skillList.map(s => {
              const barLength = Math.round(s.level / 10);
              const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
              return `  ${s.name.padEnd(20)} [${bar}] ${s.level}%`;
            });
            return [`\n[${formattedCategory}]`, ...lines];
          })
        ];
        break;
      case 'anand --experience':
        output = [
          "CAREER TIMELINE:",
          "=================",
          ...experience.flatMap(exp => [
            `\n• ${exp.title.toUpperCase()}`,
            `  Company:  ${exp.company}`,
            `  Duration: ${exp.duration}`,
            `  Details:  ${exp.description}`,
            `  Type:     ${exp.type.toUpperCase()}`
          ])
        ];
        break;
      case 'anand --projects':
        output = [
          "FEATURED PROJECTS:",
          "===================",
          ...projects.flatMap(p => [
            `\n[${p.id}] ${p.title.toUpperCase()}`,
            `  Desc: ${p.description}`,
            `  Tech: ${p.tags.join(', ')}`,
            `  Repo: ${p.github}`,
            `  Live: ${p.live}`
          ])
        ];
        break;
      case 'anand --contact':
        output = [
          "CONTACT DETAILS:",
          "=================",
          `  Email:    ${portfolioData.email}`,
          `  Phone:    ${portfolioData.phone}`,
          `  Location: ${portfolioData.location}`,
          `  GitHub:   https://github.com/${portfolioData.github}`,
          `  LinkedIn: https://www.linkedin.com/in/${portfolioData.linkedin}`
        ];
        break;
      default:
        output = [
          `terminal: command not found: '${inputValue}'`,
          "Type 'anand --help' to see list of valid queries."
        ];
    }

    setHistory(prev => [...prev, { command: inputValue, output }]);
    setInputValue('');
  };

  return (
    <div className="w-full">
      <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-blue mb-4 uppercase">・Interactive Terminal</h2>
      <p className="text-xs font-mono font-bold text-zinc-700 mb-8 max-w-xl">
        Explore my resume in real-time. Click anywhere inside the console to activate the terminal prompt and query details.
      </p>

      {/* Console Container */}
      <div 
        onClick={handleTerminalClick}
        className="w-full bg-black border-4 border-black brutalist-shadow-black cursor-text text-left font-mono rounded-none overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b-4 border-black select-none">
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 border-2 border-black bg-brutalist-red" />
            <span className="w-3.5 h-3.5 border-2 border-black bg-brutalist-yellow" />
            <span className="w-3.5 h-3.5 border-2 border-black bg-emerald-400" />
          </div>
          <div className="text-[10px] text-black font-extrabold uppercase tracking-widest">anand@portfolio-sh</div>
          <div className="w-10 h-3" />
        </div>

        {/* Console Area */}
        <div className="p-6 text-white text-xs md:text-sm leading-relaxed min-h-[350px] max-h-[500px] overflow-y-auto bg-black">
          {history.map((item, idx) => (
            <div key={idx} className="mb-4">
              {/* Print Command */}
              {item.command && (
                <div className="flex items-center gap-2 mb-1.5 text-white">
                  <span className="text-brutalist-yellow font-black select-none">visitor@anand-portfolio:~$</span>
                  <span className="font-bold">{item.command}</span>
                </div>
              )}
              {/* Print Output lines */}
              {item.output.map((line, lIdx) => (
                <div 
                  key={lIdx} 
                  className={`whitespace-pre-wrap ${
                    line.startsWith('[') ? 'text-brutalist-yellow font-black' : 
                    line.startsWith('•') || line.startsWith('CONTACT') || line.startsWith('CAREER') || line.startsWith('FEATURED') || line.startsWith('TECHNICAL') ? 'text-white font-extrabold' : 
                    line.includes('not found') ? 'text-brutalist-red font-bold' : 'text-zinc-300 font-medium'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* Input Line Form */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-4 text-white">
            <span className="text-brutalist-yellow font-black select-none">visitor@anand-portfolio:~$</span>
            <div className="flex-1 flex items-center relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text focus:outline-none"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {/* Custom visible input block to support custom blinking cursor */}
              <span className="text-white whitespace-pre-wrap break-all pr-1 font-bold">
                {inputValue}
              </span>
              <span className="w-2 h-4 bg-brutalist-yellow animate-blink block" />
            </div>
          </form>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
export default Terminal;
