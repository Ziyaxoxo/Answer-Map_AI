import React, { useRef } from 'react';
import { Upload, X, FileText, Sparkles, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { UploadedFile } from '../types/index';
import { APP_NAME } from '../constants';

interface UploadScreenProps {
  questionPaper: UploadedFile | null;
  answerSheet: UploadedFile | null;
  onQuestionPaperUpload: (file: UploadedFile | null) => void;
  onAnswerSheetUpload: (file: UploadedFile | null) => void;
  onStartMapping: () => void;
  onLoadSample: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  questionPaper,
  answerSheet,
  onQuestionPaperUpload,
  onAnswerSheetUpload,
  onStartMapping,
  onLoadSample,
}) => {
  const qpInputRef = useRef<HTMLInputElement>(null);
  const asInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (file: UploadedFile | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type.includes('pdf') || file.name.endsWith('.pdf');
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const previewUrl = URL.createObjectURL(file);

    const uploaded: UploadedFile = {
      name: file.name,
      size: file.size,
      sizeFormatted: `${sizeInMb}MB`,
      pageCount: isPdf ? 2 : 1,
      type: isPdf ? 'pdf' : 'image',
      previewUrls: [previewUrl],
      rawFile: file,
    };

    callback(uploaded);
  };

  const isBothUploaded = Boolean(questionPaper && answerSheet);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 md:p-12 relative">
      
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Title Section */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>Upload</span>
          <span className="bg-[#FFF0EC] text-[#FF5722] px-3.5 py-1 rounded-2xl border border-orange-200 inline-block font-extrabold shadow-2xs">
            Question Paper & Answer Sheets
          </span>
        </h1>

        <p className="text-slate-500 text-sm font-semibold mt-3">
          Upload PDF or image files to extract questions & map student handwritten answers
        </p>

        {/* Avatar Graphic matching Figma */}
        <div className="my-6 relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-orange-100 via-amber-50 to-orange-200 p-1.5 shadow-inner flex items-center justify-center relative">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-orange-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                alt="Teacher Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute top-1 left-2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm"></span>
            <span className="absolute bottom-2 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-sm"></span>
            <span className="absolute top-8 -right-2 w-3.5 h-3.5 bg-orange-400 rounded-full border-2 border-white shadow-sm"></span>
          </div>
        </div>

        {/* Dual Drag & Drop File Upload Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-6">
          
          {/* 1. Question Paper Box */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[170px] shadow-sm hover:border-orange-400 transition-all relative">
            <input
              type="file"
              ref={qpInputRef}
              onChange={(e) => handleFileChange(e, onQuestionPaperUpload)}
              accept=".pdf,image/*"
              className="hidden"
            />

            {questionPaper ? (
              /* Filled Card State matching Figma */
              <div className="w-full flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-500 text-white font-bold text-xs flex flex-col items-center justify-center shrink-0 shadow-sm">
                    {questionPaper.type === 'pdf' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                    <span className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">
                      {questionPaper.type}
                    </span>
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-semibold text-slate-800 text-sm truncate max-w-[180px]">
                      {questionPaper.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {questionPaper.sizeFormatted} • {questionPaper.pageCount} Pages
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onQuestionPaperUpload(null)}
                  className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Empty Drop Zone */
              <div
                onClick={() => qpInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center justify-center py-4 w-full group"
              >
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Upload <span className="text-orange-600">Question Paper</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">PDF or Image • Max 10MB</div>
              </div>
            )}
          </div>

          {/* 2. Answer Sheet Box */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[170px] shadow-sm hover:border-orange-400 transition-all relative">
            <input
              type="file"
              ref={asInputRef}
              onChange={(e) => handleFileChange(e, onAnswerSheetUpload)}
              accept=".pdf,image/*"
              className="hidden"
            />

            {answerSheet ? (
              /* Filled Card State matching Figma */
              <div className="w-full flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-500 text-white font-bold text-xs flex flex-col items-center justify-center shrink-0 shadow-sm">
                    {answerSheet.type === 'pdf' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                    <span className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">
                      {answerSheet.type}
                    </span>
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-semibold text-slate-800 text-sm truncate max-w-[180px]">
                      {answerSheet.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {answerSheet.sizeFormatted} • {answerSheet.pageCount} Pages
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onAnswerSheetUpload(null)}
                  className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Empty Drop Zone */
              <div
                onClick={() => asInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center justify-center py-4 w-full group"
              >
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Upload <span className="text-orange-600">Answer Sheet</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">PDF or Image • Max 10MB</div>
              </div>
            )}
          </div>
        </div>

        {/* Start Mapping Action Button */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
          <button
            onClick={onStartMapping}
            disabled={!isBothUploaded}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all ${
              isBothUploaded
                ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer hover:scale-105 shadow-slate-900/20'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-75'
            }`}
          >
            <span>Start Mapping</span>
            <span className="text-base">→</span>
          </button>

          <span className="text-xs font-bold text-slate-400">OR</span>

          {/* Harmonious Sample Paper Load Button */}
          <button
            onClick={onLoadSample}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-full shadow-md hover:shadow-lg hover:scale-102 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Load Sample Biology Exam Demo</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          Once both files are uploaded, {APP_NAME} will extract questions & map answers with exact highlights
        </p>
      </div>
    </div>
  );
};
