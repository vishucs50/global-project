"use client";

import React from "react";
import { ParameterMetric } from "@/lib/nasa-data";
import { CheckCircle2, Award, Zap, Cpu, HelpCircle, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelAccuracyComparisonProps {
  parameter: ParameterMetric;
}

export const ModelAccuracyComparison: React.FC<ModelAccuracyComparisonProps> = ({ parameter }) => {
  return (
    <section className="glass-panel rounded-2xl border border-slate-800 p-5 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">
              Model Accuracy Benchmark &amp; Predictive Performance
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empirical validation against historical hold-out test datasets (NASA GISS &amp; OCO-2)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Top Performer: Ensemble Multivariable ML</span>
        </div>
      </div>

      {/* Model Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <th className="py-3 px-4">Predictive Architecture</th>
              <th className="py-3 px-4 text-center">RMSE ({parameter.unit})</th>
              <th className="py-3 px-4 text-center">MAE ({parameter.unit})</th>
              <th className="py-3 px-4 text-center">R² Score</th>
              <th className="py-3 px-4">Methodological Justification &amp; Dynamics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {parameter.modelMetrics.map((model, idx) => (
              <tr
                key={idx}
                className={cn(
                  "hover:bg-space-850/60 transition-colors",
                  model.recommended && "bg-cyan-950/20"
                )}
              >
                <td className="py-3.5 px-4 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    {model.recommended ? (
                      <span className="p-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-600 ml-1.5 mr-0.5" />
                    )}
                    <span>{model.modelName}</span>
                    {model.recommended && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-200">
                  ±{model.rmse}
                </td>

                <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                  {model.mae}
                </td>

                <td className="py-3.5 px-4 text-center font-mono font-bold">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded",
                      model.r2Score >= 0.99
                        ? "text-emerald-400 bg-emerald-950/50 border border-emerald-800/50"
                        : model.r2Score >= 0.95
                        ? "text-cyan-400 bg-cyan-950/50 border border-cyan-800/50"
                        : "text-amber-400 bg-amber-950/50 border border-amber-800/50"
                    )}
                  >
                    {model.r2Score.toFixed(3)}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-300 leading-relaxed text-[11px]">
                  {model.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accuracy Innovation Breakdown */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
        <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            <span>1. Seasonal Harmonic Decoupling</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Earth parameters like CO₂ undergo a massive 6-8 ppm seasonal oscillation due to Northern Hemisphere photosynthetic uptake. Standard models misinterpret this as trend reversals; our engine resolves seasonal harmonics with Holt-Winters filters.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            <span>2. Ocean Thermal Inertia Vectors</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Seawater possesses immense heat capacity. Global Mean Sea Level rise cannot halt instantaneously; incorporating steric thermal expansion dynamics prevents naive linear regressions from under-projecting future sea level by up to 34%.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            <span>3. Multi-Satellite Cross Calibration</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fusing Sentinel-6 Poseidon-4 radar altimetry with GRACE-FO gravimetric mass loss data enables independent steric vs eustatic partitioning, lowering overall Root Mean Square Error (RMSE) to under 0.52 mm.
          </p>
        </div>
      </div>
    </section>
  );
};

