import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {CheckCircle2, LayoutGrid, X} from 'lucide-react';
import {PageId} from './types/mpi';
import {useLearningProgress} from './hooks/useLearningProgress';
import {PageNavFooter} from './components/PageNavFooter';
import {HomePage} from './pages/HomePage';
import {GuidePage} from './pages/GuidePage';
import {ObjectivesPage} from './pages/ObjectivesPage';
import {MaterialPage} from './pages/MaterialPage';
import {HotsQuizPage} from './pages/HotsQuizPage';
import {GamesPage} from './pages/GamesPage';
import {EvaluationPage} from './pages/EvaluationPage';
import {ReferencesPage} from './pages/ReferencesPage';
import {DeveloperPage} from './pages/DeveloperPage';

const ALL_PAGES: {id: PageId; num: string; label: string; desc: string}[] = [
  {id: 'beranda', num: '01', label: 'Beranda', desc: 'Halaman utama dan ringkasan progres'},
  {id: 'panduan', num: '02', label: 'Panduan', desc: 'Petunjuk navigasi, aturan kuis & gim'},
  {id: 'tujuan', num: '03', label: 'Tujuan Pembelajaran', desc: 'KD 3.6, tujuan belajar, peta konsep & glosarium'},
  {id: 'materi', num: '04', label: 'Materi', desc: '7 bagian konsep, simulasi langsung & kalkulator'},
  {id: 'latihan', num: '05', label: 'Latihan HOTS', desc: '10 soal literasi A–E & analisis pengecoh'},
  {id: 'gim', num: '06', label: 'Gim Edukasi', desc: 'Drag-drop, cari kata, papan 2π & PhET'},
  {id: 'evaluasi', num: '07', label: 'Evaluasi & Refleksi', desc: 'Evaluasi modul, penilaian diri & riwayat'},
  {id: 'referensi', num: '08', label: 'Referensi', desc: 'Daftar pustaka modul PDF & catatan jujur'},
  {id: 'pengembang', num: '09', label: 'Pengembang', desc: 'Profil Restu Miftahul Jannah, S.Pd.'},
];

const TOP_NAV_LINKS: {id: PageId; label: string}[] = [
  {id: 'beranda', label: 'Beranda'},
  {id: 'materi', label: 'Materi'},
  {id: 'latihan', label: 'Latihan HOTS'},
  {id: 'gim', label: 'Gim Edukasi'},
  {id: 'evaluasi', label: 'Evaluasi'},
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('beranda');
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    progress,
    overallPercent,
    markPageVisited,
    toggleTopicCompleted,
    markTopicCompleted,
    setHotsAnswer,
    resetHotsAnswers,
    setEvalAnswer,
    resetEvalAnswers,
    setSelfAssessmentValue,
    setReflectionNote,
    setStudentName,
    recordGameScore,
    addHistoryEntry,
    resetAllProgress,
  } = useLearningProgress();

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setMenuOpen(false);
    markPageVisited(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    markPageVisited('beranda');
  }, [markPageVisited]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Clean 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
          {/* Zone 1: Brand Title */}
          <button
            type="button"
            onClick={() => navigateTo('beranda')}
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors"
          >
            OrbitFisika X
          </button>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {TOP_NAV_LINKS.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-sky-600 text-sky-700'
                      : 'border-transparent hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="btn-tactile-primary inline-flex min-h-10 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white whitespace-nowrap shrink-0"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6}}
            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
          >
            {currentPage === 'beranda' && (
              <HomePage
                progress={progress}
                overallPercent={overallPercent}
                onNavigate={navigateTo}
              />
            )}
            {currentPage === 'panduan' && <GuidePage onNavigate={navigateTo} />}
            {currentPage === 'tujuan' && <ObjectivesPage onNavigate={navigateTo} />}
            {currentPage === 'materi' && (
              <MaterialPage
                completedTopics={progress.completedTopics}
                onToggleTopic={toggleTopicCompleted}
                onMarkTopic={markTopicCompleted}
              />
            )}
            {currentPage === 'latihan' && (
              <HotsQuizPage
                answers={progress.hotsAnswers}
                onSelectAnswer={setHotsAnswer}
                onReset={resetHotsAnswers}
                onSaveHistory={(score, maxScore) =>
                  addHistoryEntry({
                    category: 'Latihan HOTS',
                    title: '10 Soal HOTS Gerak Melingkar',
                    score,
                    maxScore,
                  })
                }
                onNavigate={navigateTo}
              />
            )}
            {currentPage === 'gim' && (
              <GamesPage
                gameScores={progress.gameScores}
                onRecordScore={recordGameScore}
                onLogHistory={(title, score, maxScore) =>
                  addHistoryEntry({
                    category: 'Gim Edukasi',
                    title,
                    score,
                    maxScore,
                  })
                }
              />
            )}
            {currentPage === 'evaluasi' && (
              <EvaluationPage
                progress={progress}
                onSelectEvalAnswer={setEvalAnswer}
                onResetEval={resetEvalAnswers}
                onSetSelfAssessment={setSelfAssessmentValue}
                onSetReflectionNote={setReflectionNote}
                onSetStudentName={setStudentName}
                onSaveHistory={(score, maxScore) =>
                  addHistoryEntry({
                    category: 'Evaluasi Akhir',
                    title: '10 Soal Evaluasi Modul KD 3.6',
                    score,
                    maxScore,
                  })
                }
                onResetAllProgress={resetAllProgress}
                onNavigate={navigateTo}
              />
            )}
            {currentPage === 'referensi' && <ReferencesPage />}
            {currentPage === 'pengembang' && <DeveloperPage />}

            <PageNavFooter
              currentPage={currentPage}
              onNavigate={navigateTo}
              onOpenMenu={() => setMenuOpen(true)}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-slate-500 sm:px-6">
          <div>
            Media Pembelajaran Interaktif Fisika Kelas X · Restu Miftahul Jannah, S.Pd. · SMA Dharma Karya UT
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('referensi')}
              className="hover:text-slate-900 font-medium"
            >
              Referensi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('pengembang')}
              className="hover:text-slate-900 font-medium"
            >
              Pengembang
            </button>
          </div>
        </div>
      </footer>

      {/* All 9 Pages Directory Modal / Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Utama 9 Halaman"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Menu Utama Pembelajaran</h2>
                <p className="text-xs text-slate-500">
                  Progres Keseluruhan: <strong className="font-mono-tabular text-sky-700">{overallPercent}%</strong> · Pilih halaman tujuanmu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ALL_PAGES.map((p) => {
                const active = currentPage === p.id;
                const visited = progress.visitedPages.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigateTo(p.id)}
                    className={`flex items-start justify-between gap-3 rounded-2xl border p-3.5 text-left transition ${
                      active
                        ? 'border-sky-600 bg-sky-50'
                        : 'border-slate-200 bg-white hover:border-sky-400 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        <span className="font-mono-tabular mr-1.5 text-sky-700">{p.num}.</span>
                        {p.label}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">{p.desc}</p>
                    </div>
                    {visited && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
