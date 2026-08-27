import React, { useRef, useState, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Trash2, 
  Maximize2,
  RotateCcw,
  Check
} from 'lucide-react';
import { AnswerRegion, Question, BoundingBox, UploadedFile } from '../types/index';

interface DocumentViewerProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  selectedQuestionId: string | null;
  questions: Question[];
  answerRegions: AnswerRegion[];
  onSelectQuestion: (questionId: string) => void;
  onAddBoundingBox?: (questionId: string, newBox: BoundingBox) => void;
  onDeleteBoundingBox?: (regionId: string, boxIndex: number) => void;
  answerSheetFile?: UploadedFile | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  currentPage,
  totalPages,
  zoomLevel,
  onPageChange,
  onZoomChange,
  selectedQuestionId,
  questions,
  answerRegions,
  onSelectQuestion,
  onAddBoundingBox,
  onDeleteBoundingBox,
  answerSheetFile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  // Drawing mode for creating custom bounding boxes
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  // Find answer regions on current page
  const currentPageRegions = answerRegions.filter((region) =>
    region.boundingBoxes.some((box) => box.page === currentPage)
  );

  // Auto-switch page when selecting a question on a different page
  useEffect(() => {
    if (!selectedQuestion) return;

    const matchingRegion = answerRegions.find((r) => r.questionId === selectedQuestion.id);
    if (matchingRegion && matchingRegion.boundingBoxes.length > 0) {
      const firstBoxOnPage = matchingRegion.boundingBoxes.find((b) => b.page === currentPage);
      if (!firstBoxOnPage) {
        const targetPage = matchingRegion.boundingBoxes[0]?.page;
        if (targetPage && targetPage <= totalPages) {
          onPageChange(targetPage);
        }
      }
    }
  }, [selectedQuestionId, answerRegions, currentPage, onPageChange, selectedQuestion, totalPages]);

  // Handle Drag-and-Draw Bounding Box
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawingMode || !docRef.current) return;
    const rect = docRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStartPoint({ x, y });
    setCurrentBox({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawingMode || !startPoint || !docRef.current) return;
    const rect = docRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(startPoint.x, currentX);
    const y = Math.min(startPoint.y, currentY);
    const w = Math.abs(currentX - startPoint.x);
    const h = Math.abs(currentY - startPoint.y);

    setCurrentBox({ x, y, w, h });
  };

  const handleMouseUp = () => {
    if (!isDrawingMode || !startPoint || !currentBox || !selectedQuestionId) return;

    if (currentBox.w > 2 && currentBox.h > 2 && onAddBoundingBox) {
      const newBox: BoundingBox = {
        x: Math.round(currentBox.x),
        y: Math.round(currentBox.y),
        width: Math.round(currentBox.w),
        height: Math.round(currentBox.h),
        page: currentPage,
      };
      onAddBoundingBox(selectedQuestionId, newBox);
    }

    setStartPoint(null);
    setCurrentBox(null);
    setIsDrawingMode(false);
  };

  // Custom uploaded file preview URL
  const uploadedImageSrc = answerSheetFile?.previewUrls?.[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-200 border-l border-gray-200 relative overflow-hidden select-none">
      {/* Document Toolbar */}
      <div className="h-13 bg-slate-900 text-white px-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-300">Answer Sheet Document</span>
          {selectedQuestion && (
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30 font-bold">
              Mapped to Q{selectedQuestion.displayLabel}
            </span>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Draw Bounding Box Toggle Button */}
          <button
            onClick={() => setIsDrawingMode(!isDrawingMode)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isDrawingMode
                ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Click and drag over document to draw a custom answer highlight box"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isDrawingMode ? 'Drawing Mode Active...' : '✏️ Draw Answer Box'}</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => onZoomChange(Math.max(60, zoomLevel - 20))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-slate-200">{zoomLevel}%</span>
            <button
              onClick={() => onZoomChange(Math.min(200, zoomLevel + 20))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onZoomChange(100)}
              className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors border-l border-slate-700 ml-0.5"
              title="Reset Zoom to 100%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Page Switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-6 flex justify-center items-start relative select-none"
      >
        <div
          ref={docRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`bg-white shadow-2xl rounded-sm relative border border-slate-300 transition-all duration-200 ease-out overflow-hidden ${
            isDrawingMode ? 'cursor-crosshair ring-2 ring-emerald-500' : 'cursor-default'
          }`}
          style={{
            width: `${Math.round(680 * (zoomLevel / 100))}px`,
            minHeight: `${Math.round(920 * (zoomLevel / 100))}px`,
          }}
        >
          {/* Display Custom Uploaded File Image OR Sample Handwritten Canvas */}
          {uploadedImageSrc && answerSheetFile?.type === 'image' ? (
            <img
              src={uploadedImageSrc}
              alt="Uploaded Student Answer Sheet"
              className="w-full h-auto object-contain pointer-events-none"
            />
          ) : (
            /* Rendered Sample Handwritten Content matching Biology Exam Screenshot */
            <div className="w-full h-full p-8 font-serif text-slate-800 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              {currentPage === 1 && (
                <div className="flex flex-col gap-8 text-sm">
                  <div className="relative p-2">
                    <span className="font-bold text-blue-900 font-sans mr-2">Q1.</span>
                    <span className="text-slate-800 tracking-wide font-medium italic">
                      Arteries carry oxygenated blood away from the heart to the organs. The Aorta is the largest artery.
                    </span>
                  </div>

                  <div className="relative p-2 flex flex-col gap-4">
                    <div>
                      <span className="font-bold text-blue-900 font-sans mr-2">Q2.</span>
                      <span className="text-slate-800 tracking-wide font-medium italic">
                        Chloroplast is the organelle responsible for photosynthesis.
                      </span>
                    </div>

                    <div className="p-4 bg-amber-50/30 rounded-xl border border-amber-200/60 font-sans text-xs">
                      <p className="font-semibold text-slate-700">
                        Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy.
                      </p>
                      <div className="my-3 text-center font-mono font-bold text-slate-900 bg-white p-2 rounded border border-slate-200">
                        6CO₂ + 6H₂O &nbsp;
                        <span className="text-xs text-orange-600 font-sans">──Light/Chlorophyll──▶</span>
                        &nbsp; C₆H₁₂O₆ + 6O₂
                      </div>

                      <div className="flex items-center justify-center my-4">
                        <div className="w-56 h-36 border border-dashed border-emerald-400 bg-emerald-50/40 rounded-xl p-3 flex flex-col items-center justify-between text-[11px] relative">
                          <span className="font-bold text-amber-600 self-start">☀ Sunlight</span>
                          <div className="flex justify-between w-full text-slate-600 font-semibold px-2">
                            <span>Carbon dioxide ➔</span>
                            <span>➔ Oxygen</span>
                          </div>
                          <span className="font-bold text-blue-600 self-end">💧 Water</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-blue-900 font-sans mr-2">Q3.</span>
                      <p className="text-slate-800 text-xs mt-1">
                        The process mainly occurs in the chloroplast of the plant cell. It has two main stages:
                      </p>
                      <ol className="list-decimal list-inside text-xs mt-1 text-slate-700 font-sans font-medium space-y-1">
                        <li><strong>Light reaction</strong> — Captures light energy.</li>
                        <li><strong>Dark reaction</strong> — Uses energy to make glucose.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="flex flex-col gap-8 text-sm">
                  <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-200/60">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-900 font-sans">Q5.</span>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        Out of Order Answer
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-sans">
                      Structure of Alveolus showing capillary gas exchange interface:
                    </p>

                    <div className="my-4 flex items-center justify-center">
                      <div className="w-64 h-44 bg-white border-2 border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-sm">
                        <div className="w-24 h-24 rounded-full border-4 border-emerald-500 bg-emerald-100/50 flex items-center justify-center text-xs font-bold text-emerald-800">
                          Alveolar Sac
                        </div>
                        <div className="absolute top-2 right-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                          Capillary Net
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 mt-2">
                          O₂ In ➔ | ⬅ CO₂ Out
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/20 rounded-xl border border-emerald-200/60 font-sans text-xs">
                    <span className="font-bold text-blue-900 font-sans mr-2">Q2 (Contd).</span>
                    <p className="text-slate-700 mt-1">
                      The process mainly occurs in the chloroplast of the plant cell. It has two main stages:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
                      <li>1. Light reaction — Captures light energy.</li>
                      <li>2. Dark reaction — Uses energy to make glucose.</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentPage >= 3 && (
                <div className="flex flex-col gap-6 text-sm">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-blue-900 font-sans mr-2">Answers Page {currentPage}</span>
                    <p className="text-xs text-slate-600 mt-2 font-sans">
                      Handwritten diagrams & calculations for Questions 6 through 13.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dragging Preview Box in Drawing Mode */}
          {isDrawingMode && currentBox && (
            <div
              className="absolute border-2 border-dashed border-emerald-600 bg-emerald-400/20 pointer-events-none rounded-lg"
              style={{
                left: `${currentBox.x}%`,
                top: `${currentBox.y}%`,
                width: `${currentBox.w}%`,
                height: `${currentBox.h}%`,
              }}
            ></div>
          )}

          {/* SVG Bounding Box Overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {currentPageRegions.map((region) => {
              const isSelected = selectedQuestionId === region.questionId;
              const question = questions.find((q) => q.id === region.questionId);
              const displayQNum = question ? question.displayLabel : region.questionNumber;

              return region.boundingBoxes
                .filter((box) => box.page === currentPage)
                .map((box, bIdx) => {
                  return (
                    <g
                      key={`${region.id}-${bIdx}`}
                      className="pointer-events-auto cursor-pointer"
                      onClick={() => onSelectQuestion(region.questionId)}
                    >
                      <rect
                        x={`${box.x}%`}
                        y={`${box.y}%`}
                        width={`${box.width}%`}
                        height={`${box.height}%`}
                        rx="8"
                        ry="8"
                        fill={isSelected ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.12)'}
                        stroke="#22C55E"
                        strokeWidth={isSelected ? '3.5' : '2'}
                        className={`transition-all duration-200 ${
                          isSelected ? 'filter drop-shadow-md animate-pulse' : 'hover:stroke-emerald-400'
                        }`}
                      />

                      <foreignObject
                        x={`${box.x}%`}
                        y={`${Math.max(1, box.y - 2.5)}%`}
                        width="80"
                        height="32"
                        className="overflow-visible"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-extrabold text-[11px] shadow-sm transition-all ${
                              isSelected
                                ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 scale-105'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}
                          >
                            <span>Q{displayQNum}</span>
                            {region.isOutofOrder && (
                              <span className="text-[9px] bg-orange-500 text-white px-1 rounded">Out</span>
                            )}
                          </div>

                          {isSelected && onDeleteBoundingBox && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteBoundingBox(region.id, bIdx);
                              }}
                              className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 shadow-sm"
                              title="Delete this bounding box"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </foreignObject>
                    </g>
                  );
                });
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
