import React, { useState, useEffect } from 'react';

interface CodeToken {
  text: string;
  type: 'keyword' | 'variable' | 'operator' | 'punctuation' | 'property' | 'string' | 'number';
}

const codeTokens: CodeToken[] = [
  { text: "const ", type: "keyword" },
  { text: "anand ", type: "variable" },
  { text: "= ", type: "operator" },
  { text: "{\n", type: "punctuation" },
  { text: "  role", type: "property" },
  { text: ": [", type: "punctuation" },
  { text: '"SAP Dev"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"Full Stack"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"iOS"', type: "string" },
  { text: "],\n  stack", type: "property" },
  { text: ": [", type: "punctuation" },
  { text: '"MEAN"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"SAP BTP"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"Swift"', type: "string" },
  { text: "],\n  certified", type: "property" },
  { text: ": [", type: "punctuation" },
  { text: '"SAP ABAP"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"Oracle AI"', type: "string" },
  { text: "],\n  status", type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Open to Work 🟢"', type: "string" },

  { text: ",\n  motto", type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Not just code. A legacy."', type: "string" },
  { text: "\n};", type: "punctuation" }
];

const tokenClassNames = {
  keyword: 'text-brutalist-red font-bold',
  variable: 'text-black font-semibold',
  operator: 'text-brutalist-blue font-bold',
  punctuation: 'text-zinc-600',
  property: 'text-black font-semibold',
  string: 'text-emerald-700 font-bold',
  number: 'text-brutalist-blue font-bold',
};

const HeroCodeEditor = () => {
  const [visibleTokens, setVisibleTokens] = useState<{ text: string; type: CodeToken['type'] }[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let active = true;
    let tokenIdx = 0;
    let charIdx = 0;
    let currentTypingTokens: typeof visibleTokens = [];

    const resetEditor = () => {
      currentTypingTokens = [];
      setVisibleTokens([]);
      setIsDone(false);
      tokenIdx = 0;
      charIdx = 0;
      setTimeout(typeChar, 400);
    };

    const typeChar = () => {
      if (!active) return;

      if (tokenIdx < codeTokens.length) {
        const token = codeTokens[tokenIdx];
        
        if (charIdx === 0) {
          currentTypingTokens.push({ text: '', type: token.type });
        }

        currentTypingTokens[tokenIdx].text += token.text[charIdx];
        setVisibleTokens([...currentTypingTokens]);

        charIdx++;

        if (charIdx >= token.text.length) {
          tokenIdx++;
          charIdx = 0;
        }

        const delay = token.type === 'string' ? 20 + Math.random() * 20 : 10 + Math.random() * 10;
        setTimeout(typeChar, delay);
      } else {
        setIsDone(true);
        setTimeout(() => {
          if (active) resetEditor();
        }, 8000);
      }
    };

    const initialTimer = setTimeout(typeChar, 600);

    return () => {
      active = false;
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <div 
      className="w-full max-w-lg border-4 border-black bg-white rounded-none overflow-hidden brutalist-shadow-black font-mono text-xs text-left select-none relative group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all duration-200"
    >
      {/* Editor Header / Traffic Lights */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b-3 border-black">
        <div className="flex gap-2">
          <span className="w-3.5 h-3.5 border-2 border-black bg-brutalist-red" />
          <span className="w-3.5 h-3.5 border-2 border-black bg-brutalist-yellow" />
          <span className="w-3.5 h-3.5 border-2 border-black bg-emerald-400" />
        </div>
        
        {/* Editor Filename Tab */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black text-[10px] text-white uppercase font-bold tracking-wider">
          <span>TS</span>
          <span>anand.ts</span>
        </div>
        
        <div className="w-10 h-3" />
      </div>

      {/* Editor Body */}
      <div className="p-5 flex gap-4 bg-white leading-relaxed overflow-x-auto min-h-[220px]">
        {/* Line Numbers */}
        <div className="flex flex-col text-zinc-400 select-none text-right font-bold pr-1 border-r border-zinc-200">
          {Array.from({ length: 9 }).map((_, idx) => (
            <span key={idx} className="pr-2">{idx + 1}</span>
          ))}
        </div>

        {/* Code Content Area */}
        <pre className="flex-1 whitespace-pre-wrap">
          <code className="text-black">
            {visibleTokens.map((token, index) => (
              <span key={index} className={tokenClassNames[token.type]}>
                {token.text}
              </span>
            ))}
            
            {/* Blinking block cursor */}
            <span className={`inline-block w-2 h-4 bg-black ml-0.5 align-middle ${isDone ? 'animate-blink' : ''}`} />
          </code>
        </pre>
      </div>
    </div>
  );
};

export default HeroCodeEditor;
