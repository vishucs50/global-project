"use client";

import React from "react";
import { ParameterMetric } from "@/lib/nasa-data";
import { CheckCircle2, Award, Zap, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelAccuracyComparisonProps {
  parameter: ParameterMetric;
}

export const ModelAccuracyComparison: React.FC<ModelAccuracyComparisonProps> = ({ parameter }) => {
  return (
    <section className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Model Accuracy Benchmark &amp; Validation Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Empirical validation against historical hold-out test datasets (NASA GISS &amp; OCO-2)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono w-fit">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Optimal Model: Ensemble Multivariable ML</span>
        </div>
      </div>

      {/* Accuracy Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <th className="py-2.5 px-3">Predictive Model</th>
              <th className="py-2.5 px-3 text-center">RMSE ({parameter.unit})</th>
              <th className="py-2.5 px-3 text-center">MAE ({parameter.unit})</th>
              <th className="py-2.5 px-3 text-center">R² Score</th>
              <th className="py-2.5 px-3">Dynamics &amp; Performance Justification</th>
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
                <td className="py-3 px-3 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    {model.recommended ? (
                      <span className="p-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 ml-1.5 mr-0.5" />
                    )}
                    <span>{model.modelName}</span>
                    {model.recommended && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase">
                        Highest Precision
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                  ±{model.rmse}
                </td>

                <td className="py-3 px-3 text-center font-mono text-slate-300">
                  {model.mae}
                </td>

                <td className="py-3 px-3 text-center font-mono font-bold">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded",
                      model.r2Score >= 0.99
                        ? "text-emerald-400 bg-emerald-950/50 border border-emerald-800/50"
                        : "text-cyan-400 bg-cyan-950/50 border border-cyan-800/50"
                    )}
                  >
                    {model.r2Score.toFixed(3)}
                  </span>
                </td>

                <td className="py-3 px-3 text-slate-300 leading-relaxed text-[11px]">
                  {model.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accuracy Innovation Breakdown */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4 border-t border-slate-800">
        <div className="p-3.5 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Seasonal Decoupling</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Earth parameters like CO₂ undergo an annual 6–8 ppm vegetative breathing cycle. Holt-Winters filters isolate this oscillation to prevent false trend reversals.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Thermal Inertia Vectors</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Seawater heat capacity creates multi-decade climate inertia. Incorporating steric expansion prevents naive regressions from under-projecting sea levels by up to 34%.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-space-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Cross-Satellite Fusion</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fusing Sentinel-6 Poseidon-4 altimetry with GRACE-FO gravimetry decouples ocean thermal expansion from continental ice melt, lowering forecast RMSE below 0.52 mm.
          </p>
        </div>
      </div>
    </section>
  );
};
