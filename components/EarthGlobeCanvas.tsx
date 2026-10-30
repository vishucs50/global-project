"use client";

import React, { useEffect, useRef } from "react";
import { ParameterMetric } from "@/lib/nasa-data";
import { Satellite, Radio } from "lucide-react";

interface EarthGlobeCanvasProps {
  parameter: ParameterMetric;
}

export const EarthGlobeCanvas: React.FC<EarthGlobeCanvasProps> = ({ parameter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const satellites = [
      { name: "OCO-2", radius: 140, speed: 0.012, angle: 0, color: "#38bdf8", inclination: 0.4 },
      { name: "Sentinel-6", radius: 165, speed: 0.009, angle: 2.1, color: "#34d399", inclination: -0.5 },
      { name: "GISTEMP-Aqua", radius: 185, speed: 0.007, angle: 4.2, color: "#fbbf24", inclination: 0.7 },
    ];

    const render = () => {
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const cx = width / 2;
      const cy = height / 2;
      const earthRadius = Math.min(width, height) * 0.28;

      ctx.clearRect(0, 0, width, height);

      // Atmosphere outer glow
      const glow = ctx.createRadialGradient(cx, cy, earthRadius * 0.8, cx, cy, earthRadius * 1.35);
      glow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
      glow.addColorStop(0.6, "rgba(14, 165, 233, 0.08)");
      glow.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, earthRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Earth body gradient
      const earthGrad = ctx.createRadialGradient(cx - earthRadius * 0.3, cy - earthRadius * 0.3, 10, cx, cy, earthRadius);
      earthGrad.addColorStop(0, "#1e3a8a");
      earthGrad.addColorStop(0.5, "#0f172a");
      earthGrad.addColorStop(1, "#020617");
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, earthRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.stroke();

      // Latitude lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const rad = (lat * Math.PI) / 180;
        const y = cy + Math.sin(rad) * earthRadius;
        const rLat = Math.cos(rad) * earthRadius;
        ctx.beginPath();
        ctx.ellipse(cx, y, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines (rotating)
      rotation += 0.005;
      for (let lon = 0; lon < 6; lon++) {
        const lonAngle = rotation + (lon * Math.PI) / 3;
        const xOffset = Math.sin(lonAngle) * earthRadius;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), earthRadius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Satellites orbiting Earth
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const orbitR = earthRadius * 1.35;
        const sx = cx + Math.cos(sat.angle) * orbitR;
        const sy = cy + Math.sin(sat.angle) * (orbitR * 0.45) + Math.sin(sat.angle * 2) * (sat.inclination * 25);

        // Orbital path
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbitR, orbitR * 0.45, sat.inclination, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite icon/point
        ctx.fillStyle = sat.color;
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing radio wave
        const pulse = (Date.now() / 600 + sat.angle) % 1;
        ctx.strokeStyle = sat.color;
        ctx.globalAlpha = 1 - pulse;
        ctx.beginPath();
        ctx.arc(sx, sy, 4 + pulse * 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Label
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px monospace";
        ctx.fillText(sat.name, sx + 7, sy + 3);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative glass-panel rounded-2xl border border-slate-800 p-5 overflow-hidden flex flex-col justify-between h-[360px]">
      <div className="flex items-center justify-between z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NASA Constellation Telemetry Link</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Active Satellite: <strong>{parameter.sensorMission}</strong>
          </span>
        </div>
        <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
          STATUS: NOMINAL
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="z-10 bg-space-950/80 p-2.5 rounded-xl border border-slate-800/80 text-xs backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-mono text-[11px]">{parameter.satelliteSource}</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 font-semibold">LEO ORBIT • 705 KM</span>
      </div>
    </div>
  );
};

