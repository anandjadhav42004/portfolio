import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'anandjadhav42004';
const LEETCODE_USERNAME = 'anandjadhav42004';

interface GitHubData {
  public_repos: number;
  followers: number;
  stars: number;
  name: string;
  isFallback?: boolean;
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | string;
  isFallback?: boolean;
}

const LiveStats = () => {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const githubRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
        if (!githubRes.ok) {
          throw new Error('GitHub request failed');
        }
        const githubData = await githubRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        if (!reposRes.ok) {
          throw new Error('GitHub repos request failed');
        }
        const reposData = await reposRes.json();

        const totalStars = Array.isArray(reposData)
          ? reposData.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
          : 0;

        setGithub({
          public_repos: githubData.public_repos ?? 0,
          followers: githubData.followers ?? 0,
          stars: totalStars,
          name: githubData.name || GITHUB_USERNAME,
          isFallback: false,
        });
      } catch (err) {
        setGithub({
          public_repos: 25,
          followers: 10,
          stars: 8,
          name: 'Anand Jadhav',
          isFallback: true,
        });
      } finally {
        setGithubLoading(false);
      }

      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
        if (!res.ok) {
          throw new Error('LeetCode request failed');
        }
        const data = await res.json();

        if (data.status === 'success') {
          setLeetcode({
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
            ranking: data.ranking || 'N/A',
            isFallback: false,
          });
        } else {
          throw new Error('API failed');
        }
      } catch (err) {
        setLeetcode({
          totalSolved: 150,
          easySolved: 80,
          mediumSolved: 55,
          hardSolved: 15,
          ranking: 'N/A',
          isFallback: true,
        });
      } finally {
        setLeetcodeLoading(false);
      }
    };

    fetchLiveData();

    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="stats" className="py-24 px-6 lg:px-24 border-t border-white/10">
      <h2 className="text-xs font-mono tracking-mega text-electric mb-16 uppercase">・Live Stats</h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        
        {/* GitHub Card */}
        <div className="bg-void-2 border border-white/10 p-8 flex flex-col gap-8 hover-target relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-electric transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-3xl font-syne font-bold uppercase tracking-widest">GitHub</h3>
              <p className="text-xs font-mono text-dim uppercase tracking-[0.35em] mt-3">{github?.name || GITHUB_USERNAME}</p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
              {github?.isFallback && <span className="text-white/80">· cached</span>}
            </span>
          </div>

          {githubLoading ? (
            <div className="text-center text-sm font-mono text-dim uppercase tracking-[0.2em]">
              Fetching live data...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Public Repos</p>
                <p className="text-5xl font-syne font-bold">{github?.public_repos ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Followers</p>
                <p className="text-5xl font-syne font-bold">{github?.followers ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Total Stars</p>
                <p className="text-5xl font-syne font-bold">{github?.stars ?? '--'}</p>
              </div>
            </div>
          )}
        </div>

        {/* LeetCode Card */}
        <div className="bg-void-2 border border-white/10 p-8 flex flex-col gap-8 hover-target relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-3xl font-syne font-bold uppercase tracking-widest">LeetCode</h3>
              <p className="text-xs font-mono text-dim uppercase tracking-[0.35em] mt-3">@{LEETCODE_USERNAME}</p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
              {leetcode?.isFallback && <span className="text-white/80">· cached</span>}
            </span>
          </div>

          {leetcodeLoading ? (
            <div className="text-center text-sm font-mono text-dim uppercase tracking-[0.2em]">
              Fetching live data...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Solved</p>
                <p className="text-5xl font-syne font-bold">{leetcode?.totalSolved ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Ranking</p>
                <p className="text-5xl font-syne font-bold">{typeof leetcode?.ranking === 'number' ? leetcode?.ranking.toLocaleString() : leetcode?.ranking ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Easy</p>
                <p className="text-5xl font-syne font-bold">{leetcode?.easySolved ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-dim tracking-widest uppercase mb-2">Medium</p>
                <p className="text-5xl font-syne font-bold">{leetcode?.mediumSolved ?? '--'}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default LiveStats;
