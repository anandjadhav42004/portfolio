import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';

interface LeetData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | string;
  acceptanceRate: number;
  isLive?: boolean;
}

const LEETCODE_USERNAME = 'anandjadhav42004';

const LeetCodeStats = () => {
  const [data, setData] = useState<LeetData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData: LeetData = {
    username: LEETCODE_USERNAME,
    totalSolved: 150,
    easySolved: 80,
    mediumSolved: 55,
    hardSolved: 15,
    ranking: 'N/A',
    acceptanceRate: 56.4,
    isLive: false,
  };

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
        const json = await res.json();

        if (json && json.totalSolved !== undefined) {
          setData({
            username: LEETCODE_USERNAME,
            totalSolved: json.totalSolved,
            easySolved: json.easySolved,
            mediumSolved: json.mediumSolved,
            hardSolved: json.hardSolved,
            ranking: json.ranking ?? 'N/A',
            acceptanceRate: json.acceptanceRate ?? 0,
            isLive: true,
          });
          setLoading(false);
          return;
        }

        throw new Error('Bad response');
      } catch {
        try {
          const res2 = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
          const json2 = await res2.json();

          if (json2 && json2.totalSolved !== undefined) {
            setData({
              username: LEETCODE_USERNAME,
              totalSolved: json2.totalSolved,
              easySolved: json2.easySolved,
              mediumSolved: json2.mediumSolved,
              hardSolved: json2.hardSolved,
              ranking: json2.ranking ?? 'N/A',
              acceptanceRate: json2.acceptanceRate ?? 0,
              isLive: true,
            });
            setLoading(false);
            return;
          }

          throw new Error('Backup API bad response');
        } catch {
          setData(fallbackData);
          setLoading(false);
        }
      }
    };

    fetchLeetCodeData();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-8 border-4 border-black bg-white brutalist-shadow-black text-center font-mono max-w-4xl mx-auto my-12">
        <span className="text-xs text-black font-black tracking-widest uppercase animate-pulse">Loading algorithmic metrics...</span>
      </div>
    );
  }

  // Ring circumference calculations
  const calculateCircleParams = (radius: number, strokeWidth: number) => {
    const normRadius = radius - strokeWidth * 2;
    const circ = normRadius * 2 * Math.PI;
    return { normRadius, circ };
  };

  const { normRadius: rEasy, circ: cEasy } = calculateCircleParams(60, 5);
  const { normRadius: rMed, circ: cMed } = calculateCircleParams(46, 5);
  const { normRadius: rHard, circ: cHard } = calculateCircleParams(32, 5);

  const maxEasy = 300;
  const maxMed = 250;
  const maxHard = 100;

  const pctEasy = Math.min(data.easySolved / maxEasy, 1.0);
  const pctMed = Math.min(data.mediumSolved / maxMed, 1.0);
  const pctHard = Math.min(data.hardSolved / maxHard, 1.0);

  return (
    <section id="leetcode" className="py-24 px-6 lg:px-24 bg-brutalist-bg border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-mono font-black tracking-mega text-brutalist-yellow mb-4 uppercase">・Algorithmic Analytics</h2>
        <p className="text-3xl md:text-5xl font-sans font-black leading-none tracking-tight uppercase text-black mb-16">
          Leetcode Competitive Metrics
        </p>

        {/* LeetCode Diagnostic Card */}
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-12 gap-8 p-6 border-4 border-black bg-white brutalist-shadow-black rounded-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all duration-200">
          
          {/* Circular concentrics dashboard visualizer */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-8 border-b-4 md:border-b-0 md:border-r-4 border-black pb-8 md:pb-0 md:pr-8">
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0 border-4 border-black bg-white p-2 rounded-none shadow-[3px_3px_0px_#000000]">
              <SiLeetcode className="text-4xl text-black absolute" />
              
              <svg className="w-full h-full transform -rotate-90">
                {/* Easy Ring */}
                <circle className="text-zinc-200" strokeWidth="5" stroke="currentColor" fill="transparent" r={rEasy} cx="80" cy="80" />
                <motion.circle 
                  className="text-emerald-500" strokeWidth="5" strokeLinecap="square" stroke="currentColor" fill="transparent" r={rEasy} cx="80" cy="80"
                  strokeDasharray={`${cEasy} ${cEasy}`}
                  initial={{ strokeDashoffset: cEasy }}
                  animate={{ strokeDashoffset: cEasy - pctEasy * cEasy }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* Medium Ring */}
                <circle className="text-zinc-200" strokeWidth="5" stroke="currentColor" fill="transparent" r={rMed} cx="80" cy="80" />
                <motion.circle 
                  className="text-brutalist-yellow" strokeWidth="5" strokeLinecap="square" stroke="currentColor" fill="transparent" r={rMed} cx="80" cy="80"
                  strokeDasharray={`${cMed} ${cMed}`}
                  initial={{ strokeDashoffset: cMed }}
                  animate={{ strokeDashoffset: cMed - pctMed * cMed }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />

                {/* Hard Ring */}
                <circle className="text-zinc-200" strokeWidth="5" stroke="currentColor" fill="transparent" r={rHard} cx="80" cy="80" />
                <motion.circle 
                  className="text-brutalist-red" strokeWidth="5" strokeLinecap="square" stroke="currentColor" fill="transparent" r={rHard} cx="80" cy="80"
                  strokeDasharray={`${cHard} ${cHard}`}
                  initial={{ strokeDashoffset: cHard }}
                  animate={{ strokeDashoffset: cHard - pctHard * cHard }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
              </svg>
            </div>

            {/* Diagnostic Legend */}
            <div className="flex flex-col gap-3 text-xs w-full sm:w-auto font-mono">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-black bg-emerald-500" />
                <div className="flex-1 flex justify-between gap-6 font-bold">
                  <span>EASY SOLVED</span>
                  <span className="text-black font-black">{data.easySolved}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-black bg-brutalist-yellow" />
                <div className="flex-1 flex justify-between gap-6 font-bold">
                  <span>MEDIUM SOLVED</span>
                  <span className="text-black font-black">{data.mediumSolved}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-black bg-brutalist-red" />
                <div className="flex-1 flex justify-between gap-6 font-bold">
                  <span>HARD SOLVED</span>
                  <span className="text-black font-black">{data.hardSolved}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Numeric Diagnostic Matrix */}
          <div className="md:col-span-5 flex flex-col justify-center gap-4 text-xs font-mono">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-2 border-b-2 border-black font-bold">
              <div className="flex items-center gap-3">
                <span className="text-zinc-700 uppercase tracking-wider">LeetCode User</span>
                <span className={`inline-flex items-center gap-2 px-2 py-1 uppercase tracking-[0.35em] text-[10px] font-mono font-black border border-black ${data.isLive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500' : 'text-zinc-500 bg-zinc-200/30 border-zinc-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${data.isLive ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                  {data.isLive ? 'LIVE' : 'CACHED'}
                </span>
              </div>
              <a 
                href={`https://leetcode.com/${data.username}`} 
                target="_blank" 
                rel="noreferrer"
                className="px-2 py-0.5 bg-brutalist-yellow border-2 border-black text-black font-black shadow-[1px_1px_0px_#000000]"
              >
                @{data.username}
              </a>
            </div>

            <div className="flex justify-between items-center pb-2 border-b-2 border-black font-bold">
              <span className="text-zinc-700 uppercase tracking-wider">Total Solved</span>
              <span className="text-black text-sm font-black">{data.totalSolved} Problems</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b-2 border-black font-bold">
              <span className="text-zinc-700 uppercase tracking-wider">Global Ranking</span>
              <span className="text-brutalist-blue font-black">#{typeof data.ranking === 'number' ? data.ranking.toLocaleString() : data.ranking}</span>
            </div>

            <div className="flex justify-between items-center font-bold">
              <span className="text-zinc-700 uppercase tracking-wider">Acceptance Rate</span>
              <span className="text-emerald-500 font-black">{data.acceptanceRate}%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeetCodeStats;

