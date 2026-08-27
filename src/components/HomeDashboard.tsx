import React from 'react';
import { 
  ClipboardList, 
  Users, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  FileText,
  Clock,
  GraduationCap
} from 'lucide-react';
import { APP_NAME } from '../constants';

interface HomeDashboardProps {
  user: any;
  onStartNewExam: () => void;
  onOpenSampleDemo: () => void;
  onOpenToolkit: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  onStartNewExam,
  onOpenSampleDemo,
  onOpenToolkit
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 flex flex-col gap-6">
      
      {/* Welcome Banner - Redesigned to guarantee 100% text visibility with zero clipping */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        
        {/* Main Text Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/30">
              Welcome back, {user?.name || 'Educator'} 👋
            </span>
            {user?.school && (
              <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{user.school}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
            AI Assessment Extraction & Answer Mapping
          </h1>

          <p className="text-xs md:text-sm text-slate-300 font-medium mt-3 leading-relaxed max-w-2xl">
            Upload question papers and student handwritten answer sheets to instantly extract questions, map out-of-order answers across pages, and highlight answer regions.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onStartNewExam}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded-full shadow-md hover:scale-103 transition-all cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Start New Exam Mapping</span>
            </button>
            
            <button
              onClick={onOpenSampleDemo}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Load Sample Biology Exam</span>
            </button>
          </div>
        </div>

        {/* AI Toolkit Launch Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 w-full lg:w-72 shrink-0 flex flex-col gap-3 shadow-inner">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span>AI Teacher's Toolkit Assistant</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Generate marking rubrics, remedial exercise plans, and class analytics powered by Gemini 2.5 AI.
          </p>
          <button
            onClick={onOpenToolkit}
            className="w-full py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
          >
            Launch AI Assistant Chat →
          </button>
        </div>

      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Assessments Mapped</span>
            <h3 className="text-xl font-extrabold text-slate-900">24 Exams</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Avg Class Accuracy</span>
            <h3 className="text-xl font-extrabold text-slate-900">84.2%</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Active Students</span>
            <h3 className="text-xl font-extrabold text-slate-900">142 Students</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Bounding Box Precision</span>
            <h3 className="text-xl font-extrabold text-slate-900">99.4%</h3>
          </div>
        </div>
      </div>

      {/* Recent Assessment Mappings */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Recent Assessment Mappings</h3>
            <p className="text-xs text-slate-500">Processed question papers and answer sheets</p>
          </div>
          <button
            onClick={onStartNewExam}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Upload New Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs font-medium">
          <div
            onClick={onOpenSampleDemo}
            className="py-3.5 flex items-center justify-between hover:bg-slate-50 p-3 rounded-xl transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">Class 10 Biology Unit Test</span>
                <span className="text-slate-400">Class_10_maths_unit_test.pdf • 13 Questions • 5 Pages</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold rounded-full">
                100% Mapped (42/50 Marks)
              </span>
              <button className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg">View Workspace →</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
