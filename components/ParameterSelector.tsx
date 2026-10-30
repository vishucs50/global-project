"use client";

import React from "react";
import { ParameterMetric, NASA_EARTH_PARAMETERS } from "@/lib/nasa-data";
import { TrendingUp, TrendingDown, Satellite, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParameterSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ParameterSelector: React.FC<ParameterSelectorProps> = ({ selectedId, onSelect }) => {
  const parameters = Object.values(NASA_EARTH_PARAMETERS);

  return (
    <div className="space-y-3 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          NASA Earth Vital Signs Telemetry (Oct 2026 Baseline)
        </h2>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
          Select metric to inspect predictive trajectory &amp; accuracy
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parameters.map((param) => {
          const isSelected = param.id === selectedId;
          const isRising = param.trendDirection === "rise";

          return (
            <div
              key={param.id}
              onClick={() => onSelect(param.id)}
              className={cn(
                "relative cursor-pointer p-4 rounded-xl border transition-all duration-200 text-left glass-panel",
                isSelected
                  ? "border-cyan-400 bg-space-850/90 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50"
                  : "border-slate-800 hover:border-slate-700 hover:bg-space-900/60"
              )}
            >
              {/* Top Row: Title & Trend Pill */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                    {param.shortName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                    <Satellite className="w-3 h-3 text-cyan-400" />
                    <span className="truncate max-w-[160px]">{param.satelliteSource}</span>
                  </div>
                </div>

                <div
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 uppercase tracking-wider",
                    isRising
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  )}
                >
                  {isRising ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{isRising ? "Rising" : "Declining"}</span>
                </div>
              </div>

              {/* October 2026 Value vs 2-Year Projection */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                    Oct 2026 (Now)
                  </span>
                  <div className="text-xl font-black text-white">
                    {param.oct2026Value}{" "}
                    <span className="text-xs font-normal text-slate-400">{param.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                    Oct 2028 (+2 Yrs)
                  </span>
                  <div className="text-sm font-bold text-cyan-300 flex items-center justify-end gap-1">
                    <span>
                      {param.twoYearForecastValue} {param.unit}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "text-[10px] font-mono font-semibold",
                      isRising ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {isRising ? "+" : ""}
                    {param.twoYearDelta > 0 ? `+${param.twoYearDelta}` : param.twoYearDelta} {param.unit} ({isRising ? "+" : ""}
                    {param.twoYearDeltaPercent}%)
                  </div>
                </div>
              </div>

              {/* Confidence Indicator */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-500">Certainty:</span>
                <span className="font-medium text-slate-300">{param.confidenceLevel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

