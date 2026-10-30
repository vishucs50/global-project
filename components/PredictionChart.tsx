"use client";

import React, { useState } from "react";
import { ParameterMetric } from "@/lib/nasa-data";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Calendar, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionChartProps {
  parameter: ParameterMetric;
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ parameter }) => {
  const [activeModel, setActiveModel] = useState<"ensemble" | "holtWinters" | "arima" | "all">("ensemble");
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  const [timeHorizon, setTimeHorizon] = useState<"2yr" | "5yr">("2yr");

  // Construct continuous dataset merging historical actuals and forecast projections
  const historical = parameter.historicalData.map((d) => ({
    date: d.date,
    historical: d.actual,
    ensembleML: d.actual,
    holtWinters: d.actual,
    arima: d.actual,
    lower95: d.actual,
    upper95: d.actual,
  }));

  const maxForecastDate = timeHorizon === "2yr" ? "2028-10" : "2030-10";
  const forecast = parameter.forecastData
    .filter((d) => d.date > "2026-10" && d.date <= maxForecastDate)
    .map((d) => ({
      date: d.date,
      historical: null,
      ensembleML: d.ensembleML,
      holtWinters: d.holtWinters,
      arima: d.arima,
      lower95: d.lower95,
      upper95: d.upper95,
    }));

  const chartData = [...historical, ...forecast];

  const values = [
    ...parameter.historicalData.map((d) => d.actual),
    ...parameter.forecastData.flatMap((d) => [d.ensembleML, d.lower95, d.upper95]),
  ];
  const minY = Math.floor(Math.min(...values) * 0.98);
  const maxY = Math.ceil(Math.max(...values) * 1.02);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6">
      {/* Top Bar: Title & Horizon Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">{parameter.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
              {parameter.unit}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            NASA Observation Record (2018–2026) vs High-Precision Model Projections (2026–2028)
          </p>
        </div>

        {/* 2-Year vs 5-Year Horizon */}
        <div className="flex items-center bg-space-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setTimeHorizon("2yr")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5",
              timeHorizon === "2yr"
                ? "bg-cyan-500 text-space-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>2-Year Forecast (2026–2028)</span>
          </button>
          <button
            onClick={() => setTimeHorizon("5yr")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-semibold transition-all",
              timeHorizon === "5yr"
                ? "bg-cyan-500 text-space-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            )}
          >
            5-Year (2030)
          </button>
        </div>
      </div>

      {/* Model Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-mono text-[11px] mr-1">Model:</span>
          <button
            onClick={() => setActiveModel("ensemble")}
            className={cn(
              "px-2.5 py-1 rounded-lg border font-medium transition-all text-xs",
              activeModel === "ensemble"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-space-900/60 text-slate-400 border-slate-800 hover:text-white"
            )}
          >
            Ensemble ML (Recommended)
          </button>
          <button
            onClick={() => setActiveModel("holtWinters")}
            className={cn(
              "px-2.5 py-1 rounded-lg border font-medium transition-all text-xs",
              activeModel === "holtWinters"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                : "bg-space-900/60 text-slate-400 border-slate-800 hover:text-white"
            )}
          >
            Holt-Winters Exponential
          </button>
          <button
            onClick={() => setActiveModel("arima")}
            className={cn(
              "px-2.5 py-1 rounded-lg border font-medium transition-all text-xs",
              activeModel === "arima"
                ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                : "bg-space-900/60 text-slate-400 border-slate-800 hover:text-white"
            )}
          >
            ARIMA (1,1,1)
          </button>
          <button
            onClick={() => setActiveModel("all")}
            className={cn(
              "px-2.5 py-1 rounded-lg border font-medium transition-all text-xs",
              activeModel === "all"
                ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                : "bg-space-900/60 text-slate-400 border-slate-800 hover:text-white"
            )}
          >
            Show All
          </button>
        </div>

        <button
          onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
          className={cn(
            "text-[11px] px-2.5 py-1 rounded-lg border transition-all",
            showConfidenceInterval
              ? "bg-blue-950/60 text-blue-300 border-blue-800/60 font-semibold"
              : "bg-space-900 text-slate-500 border-slate-800"
          )}
        >
          {showConfidenceInterval ? "✓ 95% Confidence Band" : "+ Confidence Band"}
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 25, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={{ stroke: "#334155" }}
            />
            <YAxis
              domain={[minY, maxY]}
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={{ stroke: "#334155" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0f19",
                borderColor: "#334155",
                borderRadius: "10px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#38bdf8", fontWeight: "bold" }}
              formatter={(val: any, name: string) => {
                if (val === null || val === undefined) return ["-", name];
                return [`${val} ${parameter.unit}`, name];
              }}
            />

            <ReferenceLine
              x="2026-10"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              label={{
                value: "Oct 2026 (Present)",
                fill: "#f59e0b",
                fontSize: 10,
                position: "insideTopLeft",
              }}
            />

            {showConfidenceInterval && (
              <Area
                type="monotone"
                dataKey="upper95"
                stroke="transparent"
                fill="url(#confidenceBand)"
                fillOpacity={0.4}
                name="95% Confidence Upper"
              />
            )}

            {/* Observed Data */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ffffff", stroke: "#0ea5e9", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#38bdf8" }}
              name="NASA Observed Record"
            />

            {/* Forecast Lines */}
            {(activeModel === "ensemble" || activeModel === "all") && (
              <Line
                type="monotone"
                dataKey="ensembleML"
                stroke="#38bdf8"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
                name="Ensemble ML Forecast"
              />
            )}

            {(activeModel === "holtWinters" || activeModel === "all") && (
              <Line
                type="monotone"
                dataKey="holtWinters"
                stroke="#34d399"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Holt-Winters Seasonal"
              />
            )}

            {(activeModel === "arima" || activeModel === "all") && (
              <Line
                type="monotone"
                dataKey="arima"
                stroke="#c084fc"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                dot={false}
                name="ARIMA (1,1,1)"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Mechanism Footer */}
      <div className="mt-4 p-3 rounded-xl bg-space-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Physical Mechanism: </strong>
          {parameter.scientificMechanism}
        </p>
      </div>
    </div>
  );
};
