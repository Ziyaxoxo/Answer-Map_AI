import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadScreen } from './components/UploadScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { MappingWorkspace } from './components/MappingWorkspace';
import { HomeDashboard } from './components/HomeDashboard';
import { ClassroomView } from './components/ClassroomView';
import { AssignmentsView } from './components/AssignmentsView';
import { LibraryView } from './components/LibraryView';
import { SettingsView } from './components/SettingsView';
import { LoginPage } from './components/LoginPage';
import { AuthModal } from './components/AuthModal';
import { AITeacherToolkitModal } from './components/AITeacherToolkitModal';
import { UploadedFile, Question, AnswerRegion, UnmatchedAnswer, ProcessingStage, BoundingBox } from './types/index';
import { SAMPLE_QUESTIONS, SAMPLE_ANSWER_REGIONS, SAMPLE_UNMATCHED_ANSWERS } from './lib/sampleData';
import { processDocumentsWithAI } from './lib/geminiService';
import { APP_NAME, API_BASE_URL } from './constants';

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('home');

  // User Auth & Session State
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isToolkitOpen, setIsToolkitOpen] = useState<boolean>(false);

  // Assessment File & Processing State
  const [questionPaper, setQuestionPaper] = useState<UploadedFile | null>(null);
  const [answerSheet, setAnswerSheet] = useState<UploadedFile | null>(null);
  const [stage, setStage] = useState<ProcessingStage>('idle');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [stageMessage, setStageMessage] = useState<string>('');

  // Assessment Results State
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [answerRegions, setAnswerRegions] = useState<AnswerRegion[]>(SAMPLE_ANSWER_REGIONS);
  const [unmatchedAnswers, setUnmatchedAnswers] = useState<UnmatchedAnswer[]>(SAMPLE_UNMATCHED_ANSWERS);

  // Workspace Viewport State
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>('q2');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Validate Token on Mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              setUser(data.user);
              return;
            }
          }
        } catch (e) {
          console.warn('Session check fallback active:', e);
        }
        // Fallback user if server token check
        setUser({
          id: 'usr_default',
          name: 'Madhur Rastogi',
          email: 'teacher@school.edu',
          role: 'Teacher',
          school: 'St. Xavier High School',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        });
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (userObj: any, jwtToken: string) => {
    setUser(userObj);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    setActiveNav('home');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Start Processing Mapping Flow
  const startMappingFlow = async (qp: UploadedFile | null, as: UploadedFile | null) => {
    setActiveNav('exams');
    setStage('ingesting');
    setProgressPercent(10);
    setStageMessage('Initializing AI vision models...');

    try {
      const result = await processDocumentsWithAI(qp, as, (msg, pct) => {
        setStageMessage(msg);
        setProgressPercent(pct);
      });

      setQuestions(result.questions);
      setAnswerRegions(result.answerRegions);
      setUnmatchedAnswers(result.unmatchedAnswers);
      setStage('complete');
      setSelectedQuestionId('q2');
      setCurrentPage(1);
    } catch (err) {
      console.error('Error during extraction flow:', err);
      setStage('error');
    }
  };

  // Handler: Sample Paper Load
  const handleLoadSample = () => {
    const sampleQP: UploadedFile = {
      name: 'Class_10_maths_unit_test.pdf',
      size: 2097152,
      sizeFormatted: '2MB',
      pageCount: 2,
      type: 'pdf',
      previewUrls: [],
    };

    const sampleAS: UploadedFile = {
      name: 'student_1_answer_sheet.pdf',
      size: 8388608,
      sizeFormatted: '8MB',
      pageCount: 6,
      type: 'pdf',
      previewUrls: [],
    };

    setQuestionPaper(sampleQP);
    setAnswerSheet(sampleAS);
    startMappingFlow(sampleQP, sampleAS);
  };

  const handleStartMapping = () => {
    if (!questionPaper || !answerSheet) return;
    startMappingFlow(questionPaper, answerSheet);
  };

  const handleReset = () => {
    setStage('idle');
    setQuestionPaper(null);
    setAnswerSheet(null);
    setProgressPercent(0);
  };

  // Handler: Update Question Marks
  const handleUpdateQuestionMarks = (questionId: string, obtained: number, maxMarks: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              obtainedMarks: obtained,
              maxMarks: maxMarks,
              isUnanswered: obtained === 0,
            }
          : q
      )
    );
  };

  // Handler: Add Custom Question
  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions((prev) => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  // Handler: Add Custom Bounding Box
  const handleAddBoundingBox = (questionId: string, newBox: BoundingBox) => {
    setAnswerRegions((prev) => {
      const existingIndex = prev.findIndex((r) => r.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          boundingBoxes: [...updated[existingIndex].boundingBoxes, newBox],
        };
        return updated;
      } else {
        const question = questions.find((q) => q.id === questionId);
        const newRegion: AnswerRegion = {
          id: `r_custom_${Date.now()}`,
          questionId: questionId,
          questionNumber: question ? question.qNumber : '1',
          boundingBoxes: [newBox],
        };
        return [...prev, newRegion];
      }
    });
  };

  // Handler: Delete Bounding Box
  const handleDeleteBoundingBox = (regionId: string, boxIndex: number) => {
    setAnswerRegions((prev) =>
      prev
        .map((r) => {
          if (r.id === regionId) {
            const boxes = r.boundingBoxes.filter((_, idx) => idx !== boxIndex);
            return { ...r, boundingBoxes: boxes };
          }
          return r;
        })
        .filter((r) => r.boundingBoxes.length > 0)
    );
  };

  // RENDER UNAUTHENTICATED LOGIN / SIGNUP SCREEN FIRST
  if (!user && !token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        appName={APP_NAME}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenToolkit={() => setIsToolkitOpen(true)}
        userSchool={user?.school}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          onBackClick={handleReset}
          showBack={stage !== 'idle' && activeNav === 'exams'}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenToolkit={() => setIsToolkitOpen(true)}
          onLogout={handleLogout}
          onOpenSettings={() => setActiveNav('settings')}
        />

        {/* View Switcher for Sidebar Tabs */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {activeNav === 'home' && (
            <HomeDashboard
              user={user}
              onStartNewExam={() => { setActiveNav('exams'); handleReset(); }}
              onOpenSampleDemo={handleLoadSample}
              onOpenToolkit={() => setIsToolkitOpen(true)}
            />
          )}

          {activeNav === 'classroom' && <ClassroomView />}

          {activeNav === 'assignments' && <AssignmentsView />}

          {activeNav === 'library' && <LibraryView />}

          {activeNav === 'settings' && <SettingsView />}

          {activeNav === 'exams' && (
            stage === 'idle' ? (
              <UploadScreen
                questionPaper={questionPaper}
                answerSheet={answerSheet}
                onQuestionPaperUpload={setQuestionPaper}
                onAnswerSheetUpload={setAnswerSheet}
                onStartMapping={handleStartMapping}
                onLoadSample={handleLoadSample}
              />
            ) : stage !== 'complete' && stage !== 'error' ? (
              <LoadingScreen
                progressPercent={progressPercent}
                stageMessage={stageMessage}
              />
            ) : (
              <MappingWorkspace
                questions={questions}
                answerRegions={answerRegions}
                unmatchedAnswers={unmatchedAnswers}
                selectedQuestionId={selectedQuestionId}
                onSelectQuestion={setSelectedQuestionId}
                currentPage={currentPage}
                zoomLevel={zoomLevel}
                onPageChange={setCurrentPage}
                onZoomChange={setZoomLevel}
                onUpdateQuestionMarks={handleUpdateQuestionMarks}
                onAddQuestion={handleAddQuestion}
                onAddBoundingBox={handleAddBoundingBox}
                onDeleteBoundingBox={handleDeleteBoundingBox}
                answerSheetFile={answerSheet}
              />
            )
          )}
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />

      {/* AI Teacher Toolkit Chatbot Modal */}
      <AITeacherToolkitModal
        isOpen={isToolkitOpen}
        onClose={() => setIsToolkitOpen(false)}
      />
    </div>
  );
};

export default App;
