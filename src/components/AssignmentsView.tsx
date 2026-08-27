import React from 'react';
import { FileText, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const AssignmentsView: React.FC = () => {
  const assignments = [
    { title: 'Class 10 Biology Unit Test 1', due: '26 August 2026', total: 38, mapped: 38, status: 'Completed' },
    { title: 'Class 10 Photosynthesis Worksheet', due: '01 September 2026', total: 38, mapped: 28, status: 'In Progress' },
    { title: 'Class 9 Science Mid-Term', due: '15 August 2026', total: 42, mapped: 42, status: 'Completed' }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <h2 className="text-2xl font-black text-slate-900">Assignments & Test Papers</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Track answer sheet mapping submissions</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
          <div className="divide-y divide-slate-100 text-xs">
            {assignments.map((asg, i) => (
              <div key={i} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{asg.title}</span>
                    <span className="text-slate-400">Due: {asg.due} • {asg.mapped}/{asg.total} Sheets Mapped</span>
                  </div>
                </div>
                <span className={`px-3 py-1 font-extrabold rounded-full ${
                  asg.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {asg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
