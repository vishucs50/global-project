"use client";

import React from "react";
import { ParameterMetric } from "@/lib/nasa-data";
import { Download, FileText, Database, X } from "lucide-react";

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  parameter: ParameterMetric;
}

export const DataExportModal: React.FC<DataExportModalProps> = ({ isOpen, onClose, parameter }) => {
  if (!isOpen) return null;

  const downloadCSV = () => {
    let csv = "Date,Type,Value,Unit,Model\n";
    parameter.historicalData.forEach((d) => {
      csv += `${d.date},Observed,${d.actual},${parameter.unit},NASA Satellite Telemetry\n`;
    });
    parameter.forecastData.forEach((d) => {
      csv += `${d.date},Forecast,${d.ensembleML},${parameter.unit},Ensemble ML\n`;
      csv += `${d.date},Forecast,${d.holtWinters},${parameter.unit},Holt-Winters\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nasa_${parameter.id}_prediction_2026_2028.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const data = {
      parameter: parameter.name,
      unit: parameter.unit,
      october2026Baseline: parameter.oct2026Value,
      twoYearTarget2028: parameter.twoYearForecastValue,
      historical: parameter.historicalData,
      forecast: parameter.forecastData,
      validationMetrics: parameter.modelMetrics,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nasa_${parameter.id}_prediction_2026_2028.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/30 bg-space-950 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Export Predictive Dataset</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-space-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Export full telemetry record and multi-model forecast data for <strong>{parameter.name}</strong> (2018–2028).
        </p>

        <div className="space-y-2.5">
          <button
            onClick={downloadCSV}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-space-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-space-850 transition-all text-xs text-white group"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">Comma-Separated Values (.csv)</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </button>

          <button
            onClick={downloadJSON}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-space-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-space-850 transition-all text-xs text-white group"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Structured JSON (.json)</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-space-850 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

