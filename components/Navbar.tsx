"use client";

import React from "react";
import { Satellite, Activity, Globe2, Sparkles, ExternalLink, Cpu } from "lucide-react";

interface NavbarProps {
  onOpenDeployGuide: () => void;
  onOpenQAModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDeployGuide, onOpenQAModal }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-space-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-space-950 rounded-[11px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-space-950 animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-space-950" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-white text-lg flex items-center gap-1.5">
                NASA <span className="text-cyan-400">GEO-PREDICT</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold uppercase tracking-wider">
                Oct 2026 Live
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              Earth System Predictive Intelligence • 2026–2028 Forecast Horizon
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenQAModal}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-800/60 hover:bg-blue-900/50 hover:text-white transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Q.5 Executive Finding</span>
          </button>

          <button
            onClick={onOpenDeployGuide}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Deploy to Vercel</span>
          </button>
        </div>
      </div>
    </header>
  );
};

