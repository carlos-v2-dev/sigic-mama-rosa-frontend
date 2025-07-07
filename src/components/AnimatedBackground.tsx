
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Aurora Borealis Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 via-purple-500/20 to-pink-500/20 animate-aurora"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-cyan-500/15 via-yellow-500/15 to-red-500/15 animate-aurora-reverse"></div>
      </div>
      
      {/* Dancing Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full animate-orbit opacity-60 blur-sm"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full animate-orbit-reverse opacity-70 blur-sm"></div>
      <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full animate-orbit opacity-65 blur-sm"></div>
      <div className="absolute bottom-20 right-32 w-20 h-20 bg-gradient-to-r from-green-400 to-teal-600 rounded-full animate-orbit-reverse opacity-75 blur-sm"></div>
      
      {/* Electric Lightning */}
      <div className="absolute top-1/4 left-1/3 w-2 h-40 bg-gradient-to-b from-transparent via-electric-blue to-transparent animate-lightning opacity-80"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-electric-purple to-transparent animate-lightning-delayed opacity-70"></div>
      
      {/* Neon Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-400/30 animate-pulse"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Shooting Stars */}
      <div className="absolute top-10 left-0 w-2 h-2 bg-white rounded-full animate-shooting-star opacity-90"></div>
      <div className="absolute top-1/3 left-0 w-1 h-1 bg-yellow-300 rounded-full animate-shooting-star-delayed opacity-80"></div>
      <div className="absolute top-2/3 left-0 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-shooting-star-slow opacity-85"></div>
      
      {/* Plasma Waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-plasma-wave"></div>
        <div className="absolute top-1/4 left-0 w-full h-6 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-plasma-wave-reverse"></div>
        <div className="absolute top-1/2 left-0 w-full h-10 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent animate-plasma-wave"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-4 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-plasma-wave-reverse"></div>
      </div>
      
      {/* Holographic Prisms */}
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-rainbow-start via-rainbow-mid to-rainbow-end transform rotate-45 animate-prism opacity-40"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-tr from-rainbow-end via-rainbow-mid to-rainbow-start transform rotate-12 animate-prism-reverse opacity-35"></div>
      
      {/* Digital Rain */}
      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-green-400 via-green-300 to-transparent animate-digital-rain"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
