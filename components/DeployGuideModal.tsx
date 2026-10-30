"use client";

import React, { useState } from "react";
import { X, Copy, Check, Terminal, Github, Globe } from "lucide-react";

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
      <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-space-950 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">Deploy to Vercel</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-space-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          This Next.js application is fully optimized for production with zero server dependencies. Choose either method to deploy:
        </p>

        <div className="space-y-3">
          {/* Option 1: Vercel CLI */}
          <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Option 1: Vercel CLI
              </span>
              <button
                onClick={() => copyToClipboard("npx vercel", 1)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 1 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="p-2 rounded-lg bg-space-950 border border-slate-800 font-mono text-cyan-300 text-xs select-all">
              npx vercel
            </pre>
            <p className="text-[11px] text-slate-500">
              Run in your terminal. Follow the prompt to authenticate, and your live URL will be generated in seconds.
            </p>
          </div>

          {/* Option 2: GitHub & Vercel Dashboard */}
          <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                Option 2: Git Push to Vercel
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    "git remote add origin https://github.com/<your-username>/<repo-name>.git\ngit branch -M main\ngit push -u origin main",
                    2
                  )
                }
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 transition-colors"
              >
                {copiedIndex === 2 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 2 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Push to GitHub, then import the repository on{" "}
              <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                vercel.com/new
              </a>{" "}
              and click <strong>Deploy</strong>.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
