import React, { useState } from 'react';
import { Settings, Cpu, ShieldCheck, Check, Sparkles, Sliders, Bell } from 'lucide-react';
import { APP_NAME } from '../constants';

export const SettingsView: React.FC = () => {
  const [savedToast, setSavedToast] = useState(false);
  const [aiModel, setAiModel] = useState('Gemini 2.5 Flash');
  const [autoSubParts, setAutoSubParts] = useState(true);
  const [autoFeedback, setAutoFeedback] = useState(true);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Settings Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">{APP_NAME} System Settings</h2>
              <span className="text-xs bg-slate-900 text-white px-3 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                Locked System Name
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Configure AI vision model, evaluation rubrics, and application preferences
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-full shadow-md transition-all hover:scale-102"
          >
            <Check className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

        {savedToast && (
          <div className="p-3 bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Settings and AI Preferences Saved Successfully!</span>
          </div>
        )}

        {/* Section 1: AI Model Configuration */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-orange-600" />
            <h3 className="font-extrabold text-base text-slate-900">AI Vision Engine Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label className="text-slate-700 block mb-1">Selected AI Model:</label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              >
                <option value="Gemini 2.5 Flash">Gemini 2.5 Flash (Recommended - Free Tier)</option>
                <option value="Gemini 2.0 Pro Vision">Gemini 2.0 Pro Vision</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 block mb-1">API Key Status:</label>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Active & Verified (AQ.Ab8...cgqA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Assessment & Extraction Rules */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-orange-600" />
            <h3 className="font-extrabold text-base text-slate-900">Extraction & Mapping Rules (SRS Compliance)</h3>
          </div>

          <div className="space-y-3 text-xs font-semibold text-slate-800">
            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={autoSubParts}
                onChange={(e) => setAutoSubParts(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <div>
                <span className="font-bold block">FR-005: Treat Labelled Sub-Parts (11a, 11b) as Separate Questions</span>
                <span className="text-[11px] text-slate-500 font-normal">Automatically splits sub-questions into distinct evaluation rows.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={autoFeedback}
                onChange={(e) => setAutoFeedback(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <div>
                <span className="font-bold block">FR-014: Auto-Generate AI Feedback & Scoring</span>
                <span className="text-[11px] text-slate-500 font-normal">Generates encouraging feedback accordions for student answers.</span>
              </div>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
