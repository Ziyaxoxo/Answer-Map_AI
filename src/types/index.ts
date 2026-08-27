export interface Question {
  id: string;
  qNumber: string; // e.g. "1", "2", "11a", "11b"
  displayLabel: string; // e.g. "1", "2", "11. a.", "11. b."
  text: string;
  maxMarks: number;
  obtainedMarks: number;
  isSubPart: boolean;
  parentQNumber?: string;
  aiFeedback?: string;
  isUnanswered?: boolean;
  isOutofOrder?: boolean;
  answerRegionIds: string[];
}

export interface BoundingBox {
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  width: number; // 0 - 100%
  height: number; // 0 - 100%
  page: number; // 1-indexed page
}

export interface AnswerRegion {
  id: string;
  questionId: string;
  questionNumber: string;
  boundingBoxes: BoundingBox[];
  transcribedText?: string;
  isOutofOrder?: boolean;
  isUnmatched?: boolean;
}

export interface UnmatchedAnswer {
  id: string;
  pageNumber: number;
  textSnippet: string;
  boundingBox: BoundingBox;
  note: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  sizeFormatted: string;
  pageCount: number;
  type: 'pdf' | 'image';
  previewUrls: string[];
  rawFile?: File;
}

export type ProcessingStage = 
  | 'idle'
  | 'ingesting'
  | 'extracting_questions'
  | 'extracting_answers'
  | 'mapping_answers'
  | 'evaluating_grading'
  | 'complete'
  | 'error';

export interface AssessmentState {
  id: string;
  questionPaper: UploadedFile | null;
  answerSheet: UploadedFile | null;
  stage: ProcessingStage;
  progressPercent: number;
  questions: Question[];
  answerRegions: AnswerRegion[];
  unmatchedAnswers: UnmatchedAnswer[];
  selectedQuestionId: string | null;
  currentPage: number;
  zoomLevel: number;
  aiModelUsed: string;
}
