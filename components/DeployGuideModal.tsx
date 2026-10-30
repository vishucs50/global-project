"use client";

import React, { useState } from "react";
import { X, Copy, Check, ExternalLink, Terminal, Globe, Github } from "lucide-react";

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-space-950 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Deploy to Vercel (Step-by-Step)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-space-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          <p>
            This Next.js application is configured for seamless zero-config deployment on Vercel. Choose either method below:
          </p>

          {/* Option 1: Vercel CLI (Instant) */}
          <div className="p-4 rounded-xl bg-space-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Method 1: Instant Vercel CLI Deployment
              </span>
              <button
                onClick={() => copyToClipboard("npx vercel", 1)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Open your PowerShell / terminal in this directory and execute:
            </p>
            <pre className="p-2.5 rounded-lg bg-space-950 border border-slate-800 font-mono text-cyan-300 text-xs select-all">
              npx vercel
            </pre>
            <p className="text-[11px] text-slate-500">
              Press Enter through the prompts. Vercel will build and assign a live production URL in under 60 seconds!
            </p>
          </div>

          {/* Option 2: GitHub repository push */}
          <div className="p-4 rounded-xl bg-space-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Github className="w-4 h-4 text-emerald-400" />
                Method 2: Git Repository &amp; Vercel Dashboard
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    "git init\ngit add .\ngit commit -m 'Initial commit: NASA Earth Predictive Dashboard'\ngit branch -M main\n# push to your GitHub repo and import into vercel.com",
                    2
                  )
                }
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 transition-colors"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Initialize a Git repository and push to GitHub:
            </p>
            <pre className="p-2.5 rounded-lg bg-space-950 border border-slate-800 font-mono text-emerald-300 text-[11px] overflow-x-auto select-all">
              git init{"\n"}
              git add .{"\n"}
              git commit -m &quot;NASA Earth Predictive Dashboard&quot;{"\n"}
              git branch -M main
            </pre>
            <p className="text-[11px] text-slate-500">
              Then navigate to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com/new</a>, connect your repository, and click <strong>Deploy</strong>.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

