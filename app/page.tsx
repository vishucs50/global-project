"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionAnswerHero } from "@/components/QuestionAnswerHero";
import { ParameterSelector } from "@/components/ParameterSelector";
import { PredictionChart } from "@/components/PredictionChart";
import { ModelAccuracyComparison } from "@/components/ModelAccuracyComparison";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { EarthGlobeCanvas } from "@/components/EarthGlobeCanvas";
import { DeployGuideModal } from "@/components/DeployGuideModal";
import { QuestionAnswerModal } from "@/components/QuestionAnswerModal";
import { DataExportModal } from "@/components/DataExportModal";
import { NASA_EARTH_PARAMETERS } from "@/lib/nasa-data";
import {
  Download,
  Share2,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";

export default function Home() {
  const [selectedParameterId, setSelectedParameterId] = useState<string>("co2");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isQAModalOpen, setIsQAModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const currentParameter = NASA_EARTH_PARAMETERS[selectedParameterId] || NASA_EARTH_PARAMETERS.co2;

  return (
    <div className="min-h-screen flex flex-col bg-space-950 text-slate-100">
      {/* Top Navbar */}
      <Navbar
        onOpenDeployGuide={() => setIsDeployModalOpen(true)}
        onOpenQAModal={() => setIsQAModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section: Direct, comprehensive answer to Q.5 */}
        <QuestionAnswerHero onSelectParameter={(id) => setSelectedParameterId(id)} />

        {/* Vital Signs Parameter Selector */}
        <ParameterSelector
          selectedId={selectedParameterId}
          onSelect={(id) => setSelectedParameterId(id)}
        />

        {/* Primary Analytical Grid: Interactive Chart & Earth 3D Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <PredictionChart parameter={currentParameter} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Live Orbit & Sensor Link */}
            <EarthGlobeCanvas parameter={currentParameter} />

            {/* Parameter Fast Facts Card */}
            <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  Telemetry Summary
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  REF: NASA-GSFC-2026
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Parameter:</span>
                  <span className="font-semibold text-white">{currentParameter.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">October 2026 Value:</span>
                  <span className="font-mono font-bold text-white">
                    {currentParameter.oct2026Value} {currentParameter.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">October 2028 Forecast:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {currentParameter.twoYearForecastValue} {currentParameter.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">2-Year Delta:</span>
                  <span
                    className={`font-mono font-bold ${
                      currentParameter.twoYearDelta > 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {currentParameter.twoYearDelta > 0
                      ? `+${currentParameter.twoYearDelta}`
                      : currentParameter.twoYearDelta}{" "}
                    {currentParameter.unit} ({currentParameter.twoYearDeltaPercent > 0 ? "+" : ""}
                    {currentParameter.twoYearDeltaPercent}%)
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">2-Year Behavior:</span>
                  <span
                    className={`font-semibold capitalize ${
                      currentParameter.trendDirection === "rise"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    Tends to {currentParameter.trendDirection}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-space-900 hover:bg-space-850 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export Predictive Telemetry (.CSV / .JSON)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Accuracy Benchmark Section (Solves "predict earth's parameter more accurately") */}
        <ModelAccuracyComparison parameter={currentParameter} />

        {/* Interactive Scenario & Policy Simulator */}
        <ScenarioSimulator parameter={currentParameter} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-space-950/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-wider">NASA GEO-PREDICT</span>
            <span className="text-slate-600">|</span>
            <span>Earth System Science &amp; Predictive Analytics</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Data Sources: NASA OCO-2, GISS GISTEMP v4, Sentinel-6, NOAA GML</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Vercel Deployment Guide</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DeployGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      <QuestionAnswerModal
        isOpen={isQAModalOpen}
        onClose={() => setIsQAModalOpen(false)}
      />

      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        parameter={currentParameter}
      />
    </div>
  );
}

