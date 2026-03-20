import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#050508] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* Orbs */}
      <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-purple-700/20 blur-[80px] animate-pulse" />
      <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-cyan-400/15 blur-[70px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-[60%] w-48 h-48 rounded-full bg-pink-500/10 blur-[60px] animate-pulse delay-1000" />

      {/* Scanlines overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        }}
      />

      {/* 404 Glitch Text */}
      <div className="relative z-20 select-none">
        <p
          className="font-['Bebas_Neue'] text-[clamp(140px,22vw,240px)] leading-none tracking-tighter text-white"
          style={{
            textShadow: "-3px 0 #00e5ff, 3px 0 #ff3c78",
            animation: "glitch 3s infinite, flicker 5s infinite",
          }}
        >
          404
        </p>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center -mt-2 animate-[fadeUp_0.8s_ease_0.2s_both]">
        <h2 className="font-light text-white/80 tracking-[6px] uppercase text-base sm:text-xl mb-3">
          Page Not Found
        </h2>
        <p className="text-white/35 text-sm font-light mb-10">
          The page you&apos;re looking for has vanished into the void.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/15 text-white text-xs tracking-[2px] uppercase font-medium rounded-sm bg-white/3 hover:border-white/40 hover:bg-purple-900/20 transition-all duration-300 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Return Home
        </Link>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes glitch {
          0%, 90%, 100% { text-shadow: -3px 0 #00e5ff, 3px 0 #ff3c78; }
          91% { text-shadow: 6px 0 #00e5ff, -6px 0 #ff3c78; }
          93% { text-shadow: -6px 0 #00e5ff, 6px 0 #ff3c78; }
          95% { text-shadow: -3px 0 #00e5ff, 3px 0 #ff3c78; }
        }

        @keyframes flicker {
          0%, 97%, 100% { opacity: 1; }
          98%            { opacity: 0.85; }
          99%            { opacity: 1; }
          99.5%          { opacity: 0.7; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}