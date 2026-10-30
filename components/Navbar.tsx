"use client";

import React from "react";
import { Satellite, BarChart3, ShieldCheck, Sliders, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTab: "forecast" | "accuracy" | "scenarios";
  setActiveTab: (tab: "forecast" | "accuracy" | "scenarios") => void;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDeployGuide,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-space-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-space-950 rounded-[11px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-space-950" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                NASA <span className="text-cyan-400">EarthPulse</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-800/60 font-semibold uppercase">
                Oct 2026 Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              Earth System Predictive Intelligence Dashboard
            </p>
          </div>
        </div>

        {/* Center Dashboard View Navigation Tabs */}
        <nav className="hidden sm:flex items-center bg-space-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("forecast")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5",
              activeTab === "forecast"
                ? "bg-cyan-500 text-space-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            )}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Forecasts</span>
          </button>

          <button
            onClick={() => setActiveTab("accuracy")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5",
              activeTab === "accuracy"
                ? "bg-cyan-500 text-space-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Model Accuracy</span>
          </button>

          <button
            onClick={() => setActiveTab("scenarios")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5",
              activeTab === "scenarios"
                ? "bg-cyan-500 text-space-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Scenario Simulator</span>
          </button>
        </nav>

        {/* Deploy to Vercel Action */}
        <button
          onClick={onOpenDeployGuide}
          className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all active:scale-95"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Deploy on Vercel</span>
        </button>
      </div>

      {/* Mobile Tab Bar */}
      <div className="sm:hidden flex items-center justify-around border-t border-slate-800/80 bg-space-950 px-2 py-1.5 text-xs">
        <button
          onClick={() => setActiveTab("forecast")}
          className={cn(
            "px-2.5 py-1 rounded-md font-semibold text-[11px]",
            activeTab === "forecast" ? "bg-cyan-500 text-space-950 font-bold" : "text-slate-400"
          )}
        >
          Forecasts
        </button>
        <button
          onClick={() => setActiveTab("accuracy")}
          className={cn(
            "px-2.5 py-1 rounded-md font-semibold text-[11px]",
            activeTab === "accuracy" ? "bg-cyan-500 text-space-950 font-bold" : "text-slate-400"
          )}
        >
          Accuracy
        </button>
        <button
          onClick={() => setActiveTab("scenarios")}
          className={cn(
            "px-2.5 py-1 rounded-md font-semibold text-[11px]",
            activeTab === "scenarios" ? "bg-cyan-500 text-space-950 font-bold" : "text-slate-400"
          )}
        >
          Scenarios
        </button>
      </div>
    </header>
  );
};
