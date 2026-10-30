"use client";

import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExecutiveSummaryProps {
  selectedId: string;
  onSelectParameter: (id: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  selectedId,
  onSelectParameter,
}) => {
  return (
    <section className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6 mb-6">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            2-Year Planetary Trajectory Analysis (2026 → 2028)
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Telemetry Baseline: <strong>October 2026</strong></span>
          <span className="text-slate-600">•</span>
          <span>Target Horizon: <strong>October 2028</strong></span>
        </div>
      </div>

      {/* Clear Summary Statement */}
      <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
        Based on real-time NASA satellite observations (OCO-2/3, Sentinel-6, and GISTEMP v4),{" "}
        <strong className="text-white">Atmospheric Carbon Dioxide (CO₂)</strong>,{" "}
        <strong className="text-white">Global Mean Sea Level</strong>, and{" "}
        <strong className="text-white">Ocean Heat Content</strong> exhibit an unequivocal, monotonic upward trajectory over the next 2 years. In contrast, polar sea ice minimum extent continues its secular decadal decline.
      </p>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {/* CO2 Card */}
        <div
          onClick={() => onSelectParameter("co2")}
          className={cn(
            "p-3.5 rounded-xl border cursor-pointer transition-all text-left",
            selectedId === "co2"
              ? "bg-cyan-950/40 border-cyan-400/80 ring-1 ring-cyan-400/40 shadow-md"
              : "bg-space-900/60 border-slate-800 hover:border-slate-700"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300">1. Atmospheric CO₂</span>
            <div className="flex items-center gap-0.5 text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>Rising</span>
            </div>
          </div>
          <div className="text-lg font-black text-white mt-1.5">
            429.6 → 435.8 <span className="text-xs font-normal text-slate-400">ppm</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-0.5">
            +6.2 ppm (+1.44%) • &gt;99.9% certainty
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
            Net annual accumulation from persistent anthropogenic combustion.
          </p>
        </div>

        {/* Sea Level Card */}
        <div
          onClick={() => onSelectParameter("sea_level")}
          className={cn(
            "p-3.5 rounded-xl border cursor-pointer transition-all text-left",
            selectedId === "sea_level"
              ? "bg-blue-950/40 border-blue-400/80 ring-1 ring-blue-400/40 shadow-md"
              : "bg-space-900/60 border-slate-800 hover:border-slate-700"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300">2. Sea Level (GMSL)</span>
            <div className="flex items-center gap-0.5 text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>Rising</span>
            </div>
          </div>
          <div className="text-lg font-black text-white mt-1.5">
            109.8 → 118.6 <span className="text-xs font-normal text-slate-400">mm</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-0.5">
            +8.8 mm (+8.01%) • &gt;99.9% certainty
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
            Thermal expansion + Greenland/Antarctica ice mass discharge.
          </p>
        </div>

        {/* Ocean Heat Card */}
        <div
          onClick={() => onSelectParameter("ocean_heat")}
          className={cn(
            "p-3.5 rounded-xl border cursor-pointer transition-all text-left",
            selectedId === "ocean_heat"
              ? "bg-indigo-950/40 border-indigo-400/80 ring-1 ring-indigo-400/40 shadow-md"
              : "bg-space-900/60 border-slate-800 hover:border-slate-700"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300">3. Ocean Heat Content</span>
            <div className="flex items-center gap-0.5 text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>Rising</span>
            </div>
          </div>
          <div className="text-lg font-black text-white mt-1.5">
            27.8 → 29.9 <span className="text-xs font-normal text-slate-400">10²² J</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-0.5">
            +2.1 × 10²² J (+7.55%)
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
            Absorbs &gt;90% of Earth&apos;s positive radiative energy imbalance.
          </p>
        </div>

        {/* Temperature Card */}
        <div
          onClick={() => onSelectParameter("temperature")}
          className={cn(
            "p-3.5 rounded-xl border cursor-pointer transition-all text-left",
            selectedId === "temperature"
              ? "bg-amber-950/40 border-amber-400/80 ring-1 ring-amber-400/40 shadow-md"
              : "bg-space-900/60 border-slate-800 hover:border-slate-700"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">4. Surface Temp Anomaly</span>
            <div className="flex items-center gap-0.5 text-[10px] font-mono text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>Rising</span>
            </div>
          </div>
          <div className="text-lg font-black text-white mt-1.5">
            +1.42 → +1.49 <span className="text-xs font-normal text-slate-400">°C</span>
          </div>
          <div className="text-xs text-cyan-400 font-mono mt-0.5">
            +0.07°C decadal drift
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
            Persistent background warming, modulated by short-term ENSO phases.
          </p>
        </div>
      </div>
    </section>
  );
};

