import React from 'react';
import { Users, GraduationCap, Award, BookOpen } from 'lucide-react';

export const ClassroomView: React.FC = () => {
  const students = [
    { name: 'Student 1 (Sample Exam)', id: 'S101', roll: '10-A-01', score: '42/50 (84%)', status: 'Mapped & Graded' },
    { name: 'Aarav Sharma', id: 'S102', roll: '10-A-02', score: '46/50 (92%)', status: 'Mapped & Graded' },
    { name: 'Ananya Verma', id: 'S103', roll: '10-A-03', score: '38/50 (76%)', status: 'Mapped & Graded' },
    { name: 'Rohan Gupta', id: 'S104', roll: '10-A-04', score: '48/50 (96%)', status: 'Mapped & Graded' }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Delhi Public School</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Class 10 - Biology Section A</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Academic Year 2026 • 38 Enrolled Students</p>
          </div>
          <div className="flex gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <span className="text-xs text-emerald-600 font-bold block">Class Average</span>
              <span className="text-lg font-black text-emerald-800">84.2%</span>
            </div>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
          <h3 className="font-extrabold text-base text-slate-900 mb-4">Student Roster & Assessment Results</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {students.map((stg, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center">
                    {stg.name[0]}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{stg.name}</span>
                    <span className="text-slate-400">Roll: {stg.roll} • ID: {stg.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {stg.score}
                  </span>
                  <span className="text-slate-500 font-semibold">{stg.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
