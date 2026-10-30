"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { ParameterSelector } from "@/components/ParameterSelector";
import { PredictionChart } from "@/components/PredictionChart";
import { ModelAccuracyComparison } from "@/components/ModelAccuracyComparison";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { EarthGlobeCanvas } from "@/components/EarthGlobeCanvas";
import { DeployGuideModal } from "@/components/DeployGuideModal";
import { DataExportModal } from "@/components/DataExportModal";
import { NASA_EARTH_PARAMETERS } from "@/lib/nasa-data";
import { Download, ExternalLink, Activity, Layers, Sliders } from "lucide-react";

export default function Home() {
  const [selectedParameterId, setSelectedParameterId] = useState<string>("co2");
  const [activeTab, setActiveTab] = useState<"forecast" | "accuracy" | "scenarios">("forecast");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const currentParameter = NASA_EARTH_PARAMETERS[selectedParameterId] || NASA_EARTH_PARAMETERS.co2;

  return (
    <div className="min-h-screen flex flex-col bg-space-950 text-slate-100 selection:bg-cyan-500 selection:text-space-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeployGuide={() => setIsDeployModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 1: Primary Forecast & Telemetry Overview */}
        {activeTab === "forecast" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Executive Findings Banner (Decluttered, zero Q.5 wording) */}
            <ExecutiveSummary
              selectedId={selectedParameterId}
              onSelectParameter={(id) => setSelectedParameterId(id)}
            />

            {/* Compact Parameter Selector */}
            <ParameterSelector
              selectedId={selectedParameterId}
              onSelect={(id) => setSelectedParameterId(id)}
            />

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <PredictionChart parameter={currentParameter} />
              </div>

              <div className="lg:col-span-4 space-y-5">
                {/* 3D Canvas Orbit Sensor */}
                <EarthGlobeCanvas parameter={currentParameter} />

                {/* Telemetry Metric Summary Card */}
                <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      Current Telemetry Snapshot
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      OCT 2026 BASELINE
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Parameter:</span>
                      <span className="font-semibold text-white">{currentParameter.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">October 2026 Level:</span>
                      <span className="font-mono font-bold text-white">
                        {currentParameter.oct2026Value} {currentParameter.unit}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">October 2028 Projection:</span>
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
                      <span className="text-slate-400">Certainty Level:</span>
                      <span className="font-medium text-slate-200">
                        {currentParameter.confidenceLevel}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsExportModalOpen(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-space-900 hover:bg-space-850 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Export Telemetry Record (.CSV / .JSON)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Model Accuracy & Validation (Answers how to predict Earth's parameter more accurately) */}
        {activeTab === "accuracy" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white mb-0.5">
                  Earth Parameter Accuracy Benchmarks &amp; Error Residuals
                </h2>
                <p className="text-slate-400">
                  Select any vital sign below to inspect multi-model error metrics (RMSE, MAE, R²) and see why hybrid ensemble modeling outperforms naive linear projections.
                </p>
              </div>
            </div>

            <ParameterSelector
              selectedId={selectedParameterId}
              onSelect={(id) => setSelectedParameterId(id)}
            />

            <ModelAccuracyComparison parameter={currentParameter} />
          </div>
        )}

        {/* Tab 3: Interactive Climate Policy & Scenario Simulator */}
        {activeTab === "scenarios" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <ParameterSelector
              selectedId={selectedParameterId}
              onSelect={(id) => setSelectedParameterId(id)}
            />

            <ScenarioSimulator parameter={currentParameter} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-space-950/80 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-wider">NASA EarthPulse</span>
            <span className="text-slate-600">•</span>
            <span>Earth System Predictive Analytics</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Sensors: NASA OCO-2, GISS GISTEMP v4, Sentinel-6, NOAA GML</span>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Vercel Deploy Guide</span>
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

      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        parameter={currentParameter}
      />
    </div>
  );
}
