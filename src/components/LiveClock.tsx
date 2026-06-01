import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LiveClock = () => {
  const [timeStr, setTimeStr] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 3600000 * 5.5);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const seconds = istTime.getSeconds();

      const pad = (num: number) => String(num).padStart(2, '0');

      setTimeStr(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);

      if (hours >= 5 && hours < 12) {
        setTimeOfDay('Morning 🌅');
      } else if (hours >= 12 && hours < 17) {
        setTimeOfDay('Afternoon ☀️');
      } else if (hours >= 17 && hours < 21) {
        setTimeOfDay('Evening 🌆');
      } else {
        setTimeOfDay('Night 🌌');
      }

      setIsAvailable(hours >= 9 && hours < 21);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="p-4 border-3 border-black bg-white brutalist-shadow-black font-mono text-xs text-black flex flex-col gap-2 min-w-[200px]"
    >
      <div className="flex items-center gap-1.5 font-bold uppercase">
        <span>📍</span>
        <span>MUMBAI / VADODARA, IN 🇮🇳</span>
      </div>
      
      <div className="text-xl font-black text-black border-y-2 border-black py-1.5 my-0.5">
        {timeStr} <span className="text-[10px] font-bold">IST</span>
      </div>

      <div className="flex justify-between items-center text-[10px] uppercase font-bold pt-0.5">
        <span>Currently: <span className="text-brutalist-red">{timeOfDay}</span></span>
        <div className="flex items-center gap-1.5">
          <span className={`w-3.5 h-3.5 border-2 border-black rounded-sm ${isAvailable ? 'bg-brutalist-yellow animate-pulse' : 'bg-zinc-400'}`} />
          <span className="text-[9px] font-extrabold uppercase">
            {isAvailable ? 'Available' : 'Resting'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveClock;
