import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Maximize2,
  FileQuestion,
  HelpCircle,
  AlertTriangle,
  Plus,
  Edit2,
  Download,
  Printer,
  X
} from 'lucide-react';
import { Question, AnswerRegion, UnmatchedAnswer, BoundingBox, UploadedFile } from '../types/index';
import { DocumentViewer } from './DocumentViewer';

interface MappingWorkspaceProps {
  questions: Question[];
  answerRegions: AnswerRegion[];
  unmatchedAnswers: UnmatchedAnswer[];
  selectedQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
  currentPage: number;
  zoomLevel: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  onUpdateQuestionMarks?: (questionId: string, obtained: number, maxMarks: number) => void;
  onAddQuestion?: (newQ: Question) => void;
  onAddBoundingBox?: (questionId: string, newBox: BoundingBox) => void;
  onDeleteBoundingBox?: (regionId: string, boxIndex: number) => void;
  answerSheetFile?: UploadedFile | null;
}

export const MappingWorkspace: React.FC<MappingWorkspaceProps> = ({
  questions,
  answerRegions,
  unmatchedAnswers,
  selectedQuestionId,
  onSelectQuestion,
  currentPage,
  zoomLevel,
  onPageChange,
  onZoomChange,
  onUpdateQuestionMarks,
  onAddQuestion,
  onAddBoundingBox,
  onDeleteBoundingBox,
  answerSheetFile,
}) => {
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Record<string, boolean>>({
    q2: true,
  });

  const [activeTab, setActiveTab] = useState<'questions' | 'answersheet'>('questions');
  const [filterMode, setFilterMode] = useState<'all' | 'unanswered' | 'outoforder'>('all');

  // Edit Marks Modal State
  const [editingMarksQId, setEditingMarksQId] = useState<string | null>(null);
  const [editObtained, setEditObtained] = useState<number>(0);
  const [editMax, setEditMax] = useState<number>(5);

  // Add Question Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQNum, setNewQNum] = useState('');
  const [newQText, setNewQText] = useState('');
  const [newQMaxMarks, setNewQMaxMarks] = useState(5);

  // Export Report Modal State
  const [showExportModal, setShowExportModal] = useState(false);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedQuestionIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = questions.every((q) => expandedQuestionIds[q.id]);
    const newState: Record<string, boolean> = {};
    questions.forEach((q) => {
      newState[q.id] = !allExpanded;
    });
    setExpandedQuestionIds(newState);
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterMode === 'unanswered') return q.isUnanswered;
    if (filterMode === 'outoforder') return q.isOutofOrder;
    return true;
  });

  const handleSaveMarks = () => {
    if (editingMarksQId && onUpdateQuestionMarks) {
      onUpdateQuestionMarks(editingMarksQId, editObtained, editMax);
    }
    setEditingMarksQId(null);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQNum.trim() || !newQText.trim()) return;

    const newQuestion: Question = {
      id: `q_custom_${Date.now()}`,
      qNumber: newQNum.trim(),
      displayLabel: newQNum.trim(),
      text: newQText.trim(),
      maxMarks: Number(newQMaxMarks),
      obtainedMarks: Number(newQMaxMarks),
      isSubPart: newQNum.toLowerCase().includes('a') || newQNum.toLowerCase().includes('b'),
      aiFeedback: 'Manually added question.',
      answerRegionIds: [],
    };

    if (onAddQuestion) {
      onAddQuestion(newQuestion);
    }

    setShowAddModal(false);
    setNewQNum('');
    setNewQText('');
  };

  const totalScoreObtained = questions.reduce((sum, q) => sum + (q.obtainedMarks || 0), 0);
  const totalScoreMax = questions.reduce((sum, q) => sum + (q.maxMarks || 0), 0);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-slate-100 relative">
      
      {/* Mobile Screen Tab Switcher */}
      <div className="md:hidden flex bg-white border-b border-gray-200 p-2 gap-2 shrink-0">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'questions'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Questions ({questions.length})
        </button>
        <button
          onClick={() => setActiveTab('answersheet')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'answersheet'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Answer Sheet
        </button>
      </div>

      {/* LEFT PANEL: Extracted Questions List */}
      <div
        className={`w-full md:w-[480px] lg:w-[540px] bg-white border-r border-gray-200 flex flex-col h-full shrink-0 ${
          activeTab === 'answersheet' ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-sm">
              Extracted Questions ({questions.length})
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Total Score: <strong className="text-emerald-700">{totalScoreObtained} / {totalScoreMax} Marks</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-2.5 py-1.5 rounded-full shadow-2xs transition-all"
              title="Add a custom question"
            >
              <Plus className="w-3.5 h-3.5 text-orange-600" />
              <span>Add Q</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-full shadow-2xs transition-all"
              title="Export Evaluation Summary"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={handleExpandAll}
              className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-2.5 py-1.5 rounded-full shadow-2xs transition-all"
            >
              {questions.every((q) => expandedQuestionIds[q.id]) ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        {/* Filter Quick Pills */}
        <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-full border transition-all ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilterMode('unanswered')}
            className={`px-3 py-1 rounded-full border transition-all ${
              filterMode === 'unanswered'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
            }`}
          >
            Unanswered ({questions.filter((q) => q.isUnanswered).length})
          </button>
          <button
            onClick={() => setFilterMode('outoforder')}
            className={`px-3 py-1 rounded-full border transition-all ${
              filterMode === 'outoforder'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
            }`}
          >
            Out-of-Order ({questions.filter((q) => q.isOutofOrder).length})
          </button>
        </div>

        {/* Question Cards Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {filteredQuestions.map((q) => {
            const isSelected = selectedQuestionId === q.id;
            const isExpanded = Boolean(expandedQuestionIds[q.id]);
            const isZeroScore = q.obtainedMarks === 0;

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-orange-500 bg-gradient-to-r from-orange-50/40 to-amber-50/30 ring-2 ring-orange-400/30 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Question Card Main Content */}
                <div className="p-3.5 flex items-start gap-3">
                  {/* Number Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-sm'
                        : q.isSubPart
                        ? 'bg-slate-200 text-slate-800'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {q.qNumber}
                  </div>

                  {/* Question Text Body */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      {q.text}
                    </p>

                    {/* Edge Case Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {q.isSubPart && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                          Sub-part {q.displayLabel}
                        </span>
                      )}

                      {q.isOutofOrder && (
                        <span className="text-[10px] bg-orange-100 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Out-of-Order Answer
                        </span>
                      )}

                      {q.isUnanswered && (
                        <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Unanswered Question
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Editable Score Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingMarksQId(q.id);
                        setEditObtained(q.obtainedMarks);
                        setEditMax(q.maxMarks);
                      }}
                      className={`px-2.5 py-1 rounded-full font-extrabold text-xs border transition-all hover:scale-105 ${
                        q.isUnanswered || isZeroScore
                          ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
                      }`}
                      title="Click to edit marks"
                    >
                      {q.obtainedMarks}/{q.maxMarks} ✏️
                    </button>

                    {/* Accordion Expander */}
                    <button
                      onClick={(e) => toggleExpand(q.id, e)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Feedback Accordion */}
                {isExpanded && q.aiFeedback && (
                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs font-sans">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                      <span>AI Feedback & Evaluation Notes</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      {q.aiFeedback}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* UNMATCHED ANSWERS SECTION */}
          {unmatchedAnswers.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Unmatched Answer Content ({unmatchedAnswers.length})</span>
              </div>
              {unmatchedAnswers.map((u) => (
                <div key={u.id} className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs">
                  <p className="text-slate-700 font-medium italic">"{u.textSnippet}"</p>
                  <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
                    Page {u.pageNumber} • {u.note}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Document Viewer */}
      <div
        className={`flex-1 h-full ${
          activeTab === 'questions' ? 'hidden md:flex' : 'flex'
        }`}
      >
        <DocumentViewer
          currentPage={currentPage}
          totalPages={5}
          zoomLevel={zoomLevel}
          onPageChange={onPageChange}
          onZoomChange={onZoomChange}
          selectedQuestionId={selectedQuestionId}
          questions={questions}
          answerRegions={answerRegions}
          onSelectQuestion={onSelectQuestion}
          onAddBoundingBox={onAddBoundingBox}
          onDeleteBoundingBox={onDeleteBoundingBox}
          answerSheetFile={answerSheetFile}
        />
      </div>

      {/* EDIT MARKS MODAL */}
      {editingMarksQId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-4">Edit Marks / Score</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-slate-600 block mb-1">Obtained Marks:</label>
                <input
                  type="number"
                  value={editObtained}
                  onChange={(e) => setEditObtained(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Max Marks:</label>
                <input
                  type="number"
                  value={editMax}
                  onChange={(e) => setEditMax(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={() => setEditingMarksQId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMarks}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
              >
                Save Marks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD QUESTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900">Add Custom Question</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-slate-600 block mb-1">Question Number / Label (e.g. 14, 11c):</label>
                <input
                  type="text"
                  value={newQNum}
                  onChange={(e) => setNewQNum(e.target.value)}
                  placeholder="e.g. 14"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Question Text:</label>
                <textarea
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Enter question wording..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-medium text-slate-900 h-24"
                  required
                ></textarea>
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Max Marks:</label>
                <input
                  type="number"
                  value={newQMaxMarks}
                  onChange={(e) => setNewQMaxMarks(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-sm"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPORT SUMMARY REPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 my-8">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Answer Map AI - Evaluation Summary Report</h3>
                <p className="text-xs text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 font-bold p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-700 block">Total Assessment Score</span>
                  <span className="text-slate-500">{questions.length} Questions Processed</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-700 block">{totalScoreObtained} / {totalScoreMax}</span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {Math.round((totalScoreObtained / (totalScoreMax || 1)) * 100)}% Overall Score
                  </span>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-xl divide-y">
                {questions.map((q) => (
                  <div key={q.id} className="p-3 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-slate-900">Q{q.displayLabel}. {q.text}</span>
                      {q.aiFeedback && <p className="text-slate-500 mt-1 italic">{q.aiFeedback}</p>}
                    </div>
                    <span className="font-extrabold text-emerald-700 shrink-0">{q.obtainedMarks}/{q.maxMarks}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
