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
        "Interactive Terminal Shell v2.5.0",
        "Type 'anand --help' to query technical data.",
        ""
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
          "  anand --help        -> Display available terminal query options.",
          "  anand --skills      -> Output technical skills & competency percentages.",
          "  anand --experience  -> Print career timeline & enterprise internships.",
          "  anand --projects    -> Print featured project deployments & URLs.",
          "  anand --contact     -> Output contact details & social channels.",
          "  clear               -> Reset terminal history."
        ];
        break;
      case 'anand --skills':
        output = [
          "TECHNICAL COMPETENCIES:",
          "=========================",
          ...Object.entries(skills).flatMap(([category, skillList]) => {
            const formattedCategory = category.toUpperCase().replace('_', '/');
            const lines = skillList.map(s => {
              const barLength = Math.round(s.level / 10);
              const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
              return `  ${s.name.padEnd(25)} [${bar}] ${s.level}%`;
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
            `  Details:  ${exp.description}`
          ])
        ];
        break;
      case 'anand --projects':
        output = [
          "FEATURED DEPLOYMENTS:",
          "======================",
          ...projects.flatMap(p => [
            `\n[${p.id}] ${p.title.toUpperCase()}`,
            `  Desc: ${p.description}`,
            `  Tech: ${p.tags.join(', ')}`,
            `  Live: ${p.live}`
          ])
        ];
        break;
      case 'anand --contact':
        output = [
          "DIRECT CONTACT:",
          "================",
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
          "Type 'anand --help' for available queries."
        ];
    }

    setHistory(prev => [...prev, { command: inputValue, output }]);
    setInputValue('');
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan dark:text-indigo-400 uppercase">
          // Interactive CLI Diagnostics
        </span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Developer Terminal</h3>
      </div>

      <div 
        onClick={handleTerminalClick}
        className="w-full bg-slate-950 dark:bg-void-2 border border-slate-800 dark:border-white/10 rounded-2xl cursor-text text-left font-mono shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-void-3 border-b border-white/10 select-none">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="text-xs text-slate-400 font-medium">anand@portfolio-cli: ~</div>
          <div className="w-10 h-3" />
        </div>

        <div className="p-6 text-slate-200 text-xs md:text-sm leading-relaxed min-h-[300px] max-h-[450px] overflow-y-auto bg-void-2">
          {history.map((item, idx) => (
            <div key={idx} className="mb-4">
              {item.command && (
                <div className="flex items-center gap-2 mb-1.5 text-white">
                  <span className="text-indigo-400 font-semibold select-none">guest@anand-portfolio:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              {item.output.map((line, lIdx) => (
                <div 
                  key={lIdx} 
                  className={`whitespace-pre-wrap ${
                    line.startsWith('[') ? 'text-indigo-300 font-semibold' : 
                    line.startsWith('•') || line.startsWith('CONTACT') || line.startsWith('CAREER') || line.startsWith('FEATURED') || line.startsWith('TECHNICAL') ? 'text-white font-bold' : 
                    line.includes('not found') ? 'text-rose-400' : 'text-slate-300 font-normal'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-4 text-white">
            <span className="text-indigo-400 font-semibold select-none">guest@anand-portfolio:~$</span>
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
              <span className="text-white whitespace-pre-wrap break-all pr-1">
                {inputValue}
              </span>
              <span className="w-2 h-4 bg-indigo-400 animate-blink block" />
            </div>
          </form>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
