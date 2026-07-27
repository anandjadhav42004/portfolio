import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiCheck, FiCopy, FiTrendingUp, FiAlertCircle, FiZap, FiInfo } from 'react-icons/fi';

interface AnalysisResult {
  matchPercentage: number;
  matchedSkills: string[];
  skillGaps: string[];
  pitch: string;
}

export const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('anthropic_api_key') || '';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setApiKey(localStorage.getItem('anthropic_api_key') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setJobDescription(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopyPitch = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulatedAnalysis = (text: string): AnalysisResult => {
    const t = text.toLowerCase();
    const matched: string[] = [];
    const gaps: string[] = [];
    
    const skillList = [
      { name: 'React / Next.js', key: 'react' },
      { name: 'Node.js & Express', key: 'node' },
      { name: 'TypeScript', key: 'typescript' },
      { name: 'Tailwind CSS', key: 'tailwind' },
      { name: 'Python & APIs', key: 'python' },
      { name: 'SQL & Relational DBs', key: 'sql' },
      { name: 'MongoDB', key: 'mongo' },
      { name: 'SAP ABAP & BTP', key: 'sap' },
      { name: 'Swift & SwiftUI', key: 'swift' }
    ];

    skillList.forEach(s => {
      if (t.includes(s.key)) {
        matched.push(s.name);
      }
    });

    if (matched.length === 0) {
      matched.push('React / Next.js', 'Node.js & Express', 'TypeScript');
    }

    const gapCandidates = [
      { name: 'AWS Infrastructure (Basics)', key: 'aws' },
      { name: 'Docker Containers', key: 'docker' },
      { name: 'Advanced CI/CD Pipelines', key: 'actions' },
      { name: 'Kubernetes Clusters', key: 'k8s' }
    ];

    gapCandidates.forEach(g => {
      if (t.includes(g.key) || Math.random() > 0.5) {
        if (gaps.length < 2) gaps.push(g.name);
      }
    });

    if (gaps.length < 2) {
      gaps.push('Kubernetes Clusters', 'AWS Infrastructure (Basics)');
    }

    let baseScore = 65 + Math.min(matched.length * 5, 25);
    const matchPercentage = Math.round(Math.min(baseScore, 95));

    const matchesString = matched.slice(0, 3).join(', ');
    const pitch = `Hello! After evaluating your job requirements, I am confident my technical background aligns strongly. My full-stack expertise across ${matchesString}, coupled with my certified SAP ABAP Cloud background, enables me to deliver clean, scalable engineering solutions. I look forward to contributing immediately to your team's upcoming milestones.`;

    return {
      matchPercentage,
      matchedSkills: matched.slice(0, 3),
      skillGaps: gaps.slice(0, 2),
      pitch
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setLoading(true);
    setResult(null);

    if (apiKey) {
      try {
        const prompt = `
Anand's Profile:
- Title: SAP & Full Stack Developer
- Stack: React, Next.js, Node.js, Express, TypeScript, Python, SQL, MongoDB, SAP ABAP Cloud, SAP BTP, SwiftUI.

Analyze job description:
"""
${jobDescription}
"""

Return JSON only:
{
  "matchPercentage": number,
  "matchedSkills": ["Skill 1", "Skill 2", "Skill 3"],
  "skillGaps": ["Gap 1", "Gap 2"],
  "pitch": "Tailored pitch paragraph."
}
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
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const responseText = json.content?.[0]?.text || '';
          const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsedResult = JSON.parse(cleanJson);
          
          setResult({
            matchPercentage: Number(parsedResult.matchPercentage) || 80,
            matchedSkills: Array.isArray(parsedResult.matchedSkills) ? parsedResult.matchedSkills.slice(0, 3) : ['React', 'Node.js', 'SQL'],
            skillGaps: Array.isArray(parsedResult.skillGaps) ? parsedResult.skillGaps.slice(0, 2) : ['AWS Basics', 'Docker'],
            pitch: parsedResult.pitch || 'Tailored pitch generated successfully.'
          });
        } else {
          throw new Error('API failure');
        }
      } catch (err: any) {
        const sim = runSimulatedAnalysis(jobDescription);
        setResult(sim);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        const sim = runSimulatedAnalysis(jobDescription);
        setResult(sim);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <section id="analyzer" className="py-24 px-6 lg:px-20 bg-void border-b border-white/10 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase">
            // Recruitment AI Tooling
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Job Description Match Analyzer
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Test candidate-to-job fit by pasting your job description to generate match scores, skill alignments, and custom cover letters.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Text Area */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`glass-card p-6 rounded-2xl border transition-all flex flex-col items-center justify-center min-h-[220px] ${
                isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10'
              }`}
            >
              <FiUploadCloud className="text-3xl text-indigo-400 mb-3" />
              <p className="text-xs text-slate-300 font-medium text-center mb-4">
                Drag & drop a job description file (.txt) or paste below
              </p>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste engineering job requirements here..."
                className="w-full h-32 px-4 py-3 rounded-xl bg-void border border-white/10 text-white outline-none focus:border-indigo-500 text-xs font-mono resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !jobDescription.trim()}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-glow transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Running Profile Diagnostics...</span>
              ) : (
                <>
                  <FiZap />
                  <span>Analyze Compatibility Match</span>
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-2 min-h-[280px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-full h-full flex flex-col justify-center items-center py-16 glass-card rounded-2xl border border-white/10 text-xs text-slate-400 font-mono">
                  Calculating alignment vectors...
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-4"
                >
                  <div className="p-6 glass-card rounded-2xl border border-white/10 text-center">
                    <span className="text-xs text-slate-400 font-mono">Match Rating</span>
                    <h4 className="text-5xl font-display font-bold text-white my-2">{result.matchPercentage}%</h4>
                    <span className="text-xs font-medium text-emerald-400 block mt-1">
                      {result.matchPercentage >= 80 ? '✓ High Strategic Fit' : '✓ Qualified Candidate'}
                    </span>
                  </div>

                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mb-2 font-mono">
                      <FiTrendingUp /> Key Stack Strengths
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedSkills.map((sk, index) => (
                        <span key={index} className="text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 mb-2 font-mono">
                      <FiAlertCircle /> Fast Upskill Topics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.skillGaps.map((gap, index) => (
                        <span key={index} className="text-[11px] px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full h-full glass-card rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center p-6 text-xs text-slate-400 leading-relaxed font-mono">
                  <FiTrendingUp className="text-2xl text-slate-500 mb-2" />
                  <span>Paste job specs and click Analyze to view match scores & tailored outreach text.</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pitch Area */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-6 glass-card rounded-2xl border border-white/10 relative"
            >
              <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1.5 mb-3 font-mono">
                <FiZap /> Generated Introduction Pitch
              </span>

              <p className="text-sm text-slate-200 leading-relaxed mb-4 italic font-sans">
                "{result.pitch}"
              </p>

              <button
                onClick={handleCopyPitch}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                {copied ? <FiCheck /> : <FiCopy />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Tailored Pitch'}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
