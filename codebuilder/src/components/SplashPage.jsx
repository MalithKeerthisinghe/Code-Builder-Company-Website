import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashPage({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const circumference = 2 * Math.PI * 60;

  useEffect(() => {
    if (!isHolding) {
      // When not holding, gradually decrease progress
      if (progress <= 0) return;

      const timer = window.setTimeout(() => {
        setProgress((current) => Math.max(0, current - 1));
      }, 50);

      return () => window.clearTimeout(timer);
    }

    // When holding, increase progress
    if (progress >= 100) {
      const timer = window.setTimeout(() => {
        onComplete?.();
      }, 250);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setProgress((current) => Math.min(100, current + 1));
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isHolding, progress, onComplete]);

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  const handleTouchStart = () => {
    setIsHolding(true);
  };

  const handleTouchEnd = () => {
    setIsHolding(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050608] text-white px-6">
      <div className="relative flex flex-col items-center gap-8">
        <button
          type="button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          disabled={progress === 100}
          className="relative rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:opacity-90 transition-opacity"
        >
          <motion.div
            initial={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-center"
          >
            <svg className="w-56 h-56" viewBox="0 0 140 140" aria-hidden="true">
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="#22d3ee"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference - (progress / 100) * circumference
                }
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="CodeBuilder logo"
                className="w-28 h-28 rounded-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              />
            </div>
          </motion.div>
        </button>

        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight">CodeBuilder</h1>
        </div>

        <div className="w-72 h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-400">
          {isHolding
            ? `Loading ${Math.round(progress)}%`
            : progress > 0
              ? `Release to reset`
              : "Hold the logo to continue"}
        </p>
      </div>
    </div>
  );
}
