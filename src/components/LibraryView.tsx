import React from 'react';
import { BookOpen, FileText, Download } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const libraryItems = [
    { name: 'Class 10 Biology Question Paper PDF', pages: 2, size: '2MB', type: 'Question Paper' },
    { name: 'Student 1 Handwritten Answer Sheet PDF', pages: 6, size: '8MB', type: 'Answer Sheet' },
    { name: 'Biology Marking Rubric & Solution Key', pages: 3, size: '1MB', type: 'Rubric' }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <h2 className="text-2xl font-black text-slate-900">My Assessment Repository Library</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Uploaded question papers and answer sheet archives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
          {libraryItems.map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block text-xs">{item.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">{item.type} • {item.pages} Pages • {item.size}</span>
                </div>
              </div>
              <button className="w-full py-2 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800">
                <Download className="w-3.5 h-3.5" />
                <span>Download Archive</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
