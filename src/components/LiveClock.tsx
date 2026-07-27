import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [timeStr, setTimeStr] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 3600000 * 5.5);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const pad = (num: number) => String(num).padStart(2, '0');

      setTimeStr(`${pad(hours)}:${pad(minutes)} IST`);
      setIsAvailable(hours >= 9 && hours < 22);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-void-2 border border-white/10 text-xs text-slate-300 font-mono">
      <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
      <span className="font-semibold text-slate-200">Mumbai/Vadodara</span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-300">{timeStr}</span>
    </div>
  );
};

export default LiveClock;
