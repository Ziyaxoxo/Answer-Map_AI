import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  progressPercent: number;
  stageMessage: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progressPercent, stageMessage }) => {
  const stages = [
    { label: 'Question Ingestion', minProgress: 15 },
    { label: 'Printed Order & Sub-parts (11a, 11b)', minProgress: 35 },
    { label: 'Handwritten Answer OCR', minProgress: 60 },
    { label: 'Out-of-order Mapping & Highlights', minProgress: 82 },
    { label: 'AI Marks & Feedback', minProgress: 95 },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-orange-100/40 via-amber-50/50 to-orange-200/30 rounded-full blur-3xl -z-0"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Animated Sparkling Stars Graphic matching Figma */}
        <div className="relative mb-6">
          <div className="w-20 h-20 flex items-center justify-center relative animate-pulse">
            <Sparkles className="w-16 h-16 text-orange-500 fill-orange-500" />
            <Sparkles className="w-8 h-8 text-amber-400 fill-amber-400 absolute -top-2 -right-2 animate-bounce" />
            <Sparkles className="w-6 h-6 text-orange-400 fill-orange-400 absolute -bottom-1 -left-2 animate-ping" />
          </div>
        </div>

        {/* Loading Text matching Figma */}
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Extracting...
        </h2>
        <p className="text-slate-400 text-sm font-semibold mt-1">
          This may take a while
        </p>

        {/* Progress Bar (FR-003) */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full mt-6 overflow-hidden border border-slate-200/80 p-0.5">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${Math.max(10, progressPercent)}%` }}
          ></div>
        </div>

        {/* Dynamic Stage Message */}
        <p className="text-xs font-bold text-orange-600 mt-3 animate-pulse">
          {stageMessage} ({progressPercent}%)
        </p>

        {/* Pipeline Stage Checklist (Showing compliance with SRS FR-003, FR-004, FR-005, FR-007, FR-010) */}
        <div className="mt-8 w-full bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4 text-left flex flex-col gap-2">
          {stages.map((stg, i) => {
            const isDone = progressPercent >= stg.minProgress;
            return (
              <div key={i} className="flex items-center gap-2.5 text-xs">
                <CheckCircle2
                  className={`w-4 h-4 transition-colors ${
                    isDone ? 'text-emerald-500 fill-emerald-100' : 'text-slate-300'
                  }`}
                />
                <span
                  className={`font-medium transition-colors ${
                    isDone ? 'text-slate-800 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {stg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
