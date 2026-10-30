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
  Legend,
} from "recharts";
import { Sliders, Eye, EyeOff, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionChartProps {
  parameter: ParameterMetric;
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ parameter }) => {
  const [showEnsemble, setShowEnsemble] = useState(true);
  const [showHoltWinters, setShowHoltWinters] = useState(true);
  const [showArima, setShowArima] = useState(false);
  const [showPoly, setShowPoly] = useState(false);
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  const [timeHorizon, setTimeHorizon] = useState<"2yr" | "5yr">("2yr");

  // Construct continuous dataset merging historical actuals and forecast projections
  const historical = parameter.historicalData.map((d) => ({
    date: d.date,
    historical: d.actual,
    ensembleML: d.actual, // connect line smoothly at junction
    holtWinters: d.actual,
    arima: d.actual,
    polynomial: d.actual,
    lower95: d.actual,
    upper95: d.actual,
    isForecast: false,
  }));

  // Filter forecast by horizon
  const maxForecastDate = timeHorizon === "2yr" ? "2028-10" : "2030-10";
  const forecast = parameter.forecastData
    .filter((d) => d.date > "2026-10" && d.date <= maxForecastDate)
    .map((d) => ({
      date: d.date,
      historical: null,
      ensembleML: d.ensembleML,
      holtWinters: d.holtWinters,
      arima: d.arima,
      polynomial: d.polynomial,
      lower95: d.lower95,
      upper95: d.upper95,
      isForecast: true,
    }));

  const chartData = [...historical, ...forecast];

  // Calculate dynamic Y-axis domain
  const values = [
    ...parameter.historicalData.map((d) => d.actual),
    ...parameter.forecastData.flatMap((d) => [d.ensembleML, d.lower95, d.upper95]),
  ];
  const minY = Math.floor(Math.min(...values) * 0.98);
  const maxY = Math.ceil(Math.max(...values) * 1.02);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 md:p-6 mb-8">
      {/* Chart Top Bar: Title & Model Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">{parameter.name}</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-mono">
              Unit: {parameter.unit}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Historical Satellite Record (2018–2026) vs Next 2 Years High-Precision Models (2026–2028)
          </p>
        </div>

        {/* Horizon Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-space-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTimeHorizon("2yr")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5",
                timeHorizon === "2yr"
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Next 2 Years (2026–2028 Focus)</span>
            </button>
            <button
              onClick={() => setTimeHorizon("5yr")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all",
                timeHorizon === "5yr"
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              5-Year Horizon (2030)
            </button>
          </div>
        </div>
      </div>

      {/* Model Layer Toggles */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 bg-space-900/60 p-3 rounded-xl border border-slate-800/80">
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mr-1">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active Predictive Models:</span>
        </span>

        <button
          onClick={() => setShowEnsemble(!showEnsemble)}
          className={cn(
            "text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all",
            showEnsemble
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
              : "bg-space-950 text-slate-500 border-slate-800"
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Ensemble ML (Recommended)</span>
        </button>

        <button
          onClick={() => setShowHoltWinters(!showHoltWinters)}
          className={cn(
            "text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all",
            showHoltWinters
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
              : "bg-space-950 text-slate-500 border-slate-800"
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Holt-Winters Seasonal</span>
        </button>

        <button
          onClick={() => setShowArima(!showArima)}
          className={cn(
            "text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all",
            showArima
              ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
              : "bg-space-950 text-slate-500 border-slate-800"
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>ARIMA (1,1,1)</span>
        </button>

        <button
          onClick={() => setShowPoly(!showPoly)}
          className={cn(
            "text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all",
            showPoly
              ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
              : "bg-space-950 text-slate-500 border-slate-800"
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Polynomial</span>
        </button>

        <button
          onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
          className={cn(
            "text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all ml-auto",
            showConfidenceInterval
              ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
              : "bg-space-950 text-slate-500 border-slate-800"
          )}
        >
          {showConfidenceInterval ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>95% Confidence Band</span>
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
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
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0f19",
                borderColor: "#334155",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#38bdf8", fontWeight: "bold" }}
              formatter={(val: any, name: string) => {
                if (val === null || val === undefined) return ["-", name];
                return [`${val} ${parameter.unit}`, name];
              }}
            />

            {/* Reference Line for Present Day (October 2026) */}
            <ReferenceLine
              x="2026-10"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{
                value: "Present (Oct 2026)",
                fill: "#f59e0b",
                fontSize: 11,
                position: "insideTopLeft",
              }}
            />

            {/* 95% Confidence Interval Band */}
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

            {/* Historical Telemetry Observed Curve */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ffffff", stroke: "#0ea5e9", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#38bdf8" }}
              name="NASA Observed Record"
            />

            {/* Ensemble ML Curve */}
            {showEnsemble && (
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

            {/* Holt-Winters Seasonal Curve */}
            {showHoltWinters && (
              <Line
                type="monotone"
                dataKey="holtWinters"
                stroke="#34d399"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Holt-Winters Exponential"
              />
            )}

            {/* ARIMA Curve */}
            {showArima && (
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

            {/* Polynomial Curve */}
            {showPoly && (
              <Line
                type="monotone"
                dataKey="polynomial"
                stroke="#fbbf24"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={false}
                name="Quadratic Polynomial"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Scientific Explanatory Footnote */}
      <div className="mt-4 p-3 rounded-xl bg-space-900/50 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Physical Mechanism: </span>
          <span>{parameter.scientificMechanism}</span>
        </div>
      </div>
    </div>
  );
};

