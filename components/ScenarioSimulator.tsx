"use client";

import React, { useState } from "react";
import { SSP_SCENARIOS, ScenarioAdjustment } from "@/lib/predictive-models";
import { ParameterMetric } from "@/lib/nasa-data";
import { Sliders, RefreshCw, Sparkles, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScenarioSimulatorProps {
  parameter: ParameterMetric;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ parameter }) => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<"ssp126" | "ssp245" | "ssp585">("ssp245");
  const [emissionAdjustment, setEmissionAdjustment] = useState<number>(0);
  const [solarFlux, setSolarFlux] = useState<number>(0);

  const currentScenario = SSP_SCENARIOS[selectedScenarioKey];

  // Dynamic simulation calculation for 2028 based on scenario multipliers
  const baseDelta = parameter.twoYearDelta;
  let multiplier = 1.0;

  if (parameter.id === "co2") {
    multiplier = currentScenario.co2Multiplier * (1 + emissionAdjustment / 100);
  } else if (parameter.id === "temperature") {
    multiplier = currentScenario.tempMultiplier * (1 + emissionAdjustment / 200) + solarFlux * 0.02;
  } else if (parameter.id === "sea_level") {
    multiplier = currentScenario.seaLevelMultiplier * (1 + emissionAdjustment / 300);
  } else if (parameter.id === "ocean_heat") {
    multiplier = currentScenario.tempMultiplier * (1 + emissionAdjustment / 250);
  } else {
    multiplier = currentScenario.tempMultiplier;
  }

  const simulatedDelta = Number((baseDelta * multiplier).toFixed(2));
  const simulated2028Value = Number((parameter.oct2026Value + simulatedDelta).toFixed(2));

  return (
    <section className="glass-panel rounded-2xl border border-slate-800 p-5 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Interactive Scenario &amp; Policy Simulation Engine</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate how climate policies and emission pathways reshape the 2026–2028 trajectory
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedScenarioKey("ssp245");
            setEmissionAdjustment(0);
            setSolarFlux(0);
          }}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-space-900 transition-colors w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Scenario Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(Object.keys(SSP_SCENARIOS) as Array<keyof typeof SSP_SCENARIOS>).map((key) => {
          const scn = SSP_SCENARIOS[key];
          const isSelected = selectedScenarioKey === key;

          return (
            <div
              key={key}
              onClick={() => setSelectedScenarioKey(key)}
              className={cn(
                "p-4 rounded-xl border cursor-pointer transition-all text-left",
                isSelected
                  ? "border-cyan-400 bg-space-850/90 shadow-md ring-1 ring-cyan-400/40"
                  : "border-slate-800 bg-space-900/50 hover:border-slate-700"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border", scn.tagColor)}>
                  {key.toUpperCase()}
                </span>
                {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
              </div>
              <h4 className="font-bold text-white text-sm mb-1">{scn.name}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{scn.description}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Sliders & Live Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-space-900/60 p-5 rounded-xl border border-slate-800">
        {/* Sliders Side */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">Global Emission Delta Modifier:</span>
              <span className="font-mono text-cyan-300 font-bold">
                {emissionAdjustment > 0 ? `+${emissionAdjustment}%` : `${emissionAdjustment}%`}
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={emissionAdjustment}
              onChange={(e) => setEmissionAdjustment(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-space-950 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>-40% (Emergency Transition)</span>
              <span>0% (Status Quo)</span>
              <span>+40% (Surging Emissions)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">Solar Cycle 25 Radiative Forcing Flux:</span>
              <span className="font-mono text-cyan-300 font-bold">
                {solarFlux > 0 ? `+${solarFlux} W/m²` : `${solarFlux} W/m²`}
              </span>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="1"
              value={solarFlux}
              onChange={(e) => setSolarFlux(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-space-950 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>-2 (Solar Minimum)</span>
              <span>0 (Baseline)</span>
              <span>+2 (Solar Maximum)</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Feedback Box */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-space-950/90 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono font-semibold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulated Projection (October 2028)</span>
            </div>
            <div className="text-3xl font-black text-white">
              {simulated2028Value} <span className="text-sm font-normal text-slate-400">{parameter.unit}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-1">
              Simulated Delta: {simulatedDelta > 0 ? `+${simulatedDelta}` : simulatedDelta} {parameter.unit} (over 2 years)
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Even under aggressive net-zero policies (SSP1-2.6), atmospheric CO₂ and Sea Level continue rising through 2028 due to atmospheric residence time and ocean thermal memory.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

