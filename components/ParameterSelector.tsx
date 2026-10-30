"use client";

import React from "react";
import { NASA_EARTH_PARAMETERS } from "@/lib/nasa-data";
import { TrendingUp, TrendingDown, Satellite } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParameterSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ParameterSelector: React.FC<ParameterSelectorProps> = ({ selectedId, onSelect }) => {
  const parameters = Object.values(NASA_EARTH_PARAMETERS);

  return (
    <div className="mb-6">
      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
        <span>Select Earth Vital Sign to Inspect:</span>
        <span className="hidden sm:inline">6 Core Planetary Metrics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {parameters.map((param) => {
          const isSelected = param.id === selectedId;
          const isRising = param.trendDirection === "rise";

          return (
            <button
              key={param.id}
              onClick={() => onSelect(param.id)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-[84px]",
                isSelected
                  ? "bg-space-850 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md shadow-cyan-500/10"
                  : "bg-space-900/50 border-slate-800 hover:border-slate-700 hover:bg-space-850/60"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold text-slate-200 truncate">
                  {param.shortName}
                </span>
                <span
                  className={cn(
                    "text-[9px] font-mono px-1 py-0.2 rounded font-semibold",
                    isRising ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
                  )}
                >
                  {isRising ? "▲ Rise" : "▼ Fall"}
                </span>
              </div>

              <div>
                <div className="text-sm font-extrabold text-white">
                  {param.oct2026Value}{" "}
                  <span className="text-[10px] font-normal text-slate-400">{param.unit}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  Forecast: {param.twoYearForecastValue} {param.unit}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
