import {useState} from 'react';
import {CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck, XCircle} from 'lucide-react';
import {HOTS_QUESTIONS} from '../data/quizData';
import {MathFormula} from '../components/MathFormula';
import {PhysicsDiagramSvg} from '../components/PhysicsDiagramSvg';
import {PageId} from '../types/mpi';

interface HotsQuizPageProps {
  answers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  onReset: () => void;
  onSaveHistory: (score: number, maxScore: number) => void;
  onNavigate: (page: PageId) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function HotsQuizPage({
  answers,
  onSelectAnswer,
  onReset,
  onSaveHistory,
  onNavigate,
}: HotsQuizPageProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [savedNotice, setSavedNotice] = useState(false);

  const q = HOTS_QUESTIONS[currentIdx];
  const selectedOpt = answers[q.id];
  const hasAnswered = selectedOpt !== undefined;
  const isCorrect = hasAnswered && selectedOpt === q.correctIndex;

  const answeredCount = Object.keys(answers).length;
  const correctCount = HOTS_QUESTIONS.filter(
    (item) => answers[item.id] === item.correctIndex,
  ).length;
  const score100 = Math.round((correctCount / HOTS_QUESTIONS.length) * 100);
  const allAnswered = answeredCount === HOTS_QUESTIONS.length;

  const handleChoose = (optIdx: number) => {
    if (hasAnswered) return; // Lock once answered so key isn't gamed
    onSelectAnswer(q.id, optIdx);
    setSavedNotice(false);
  };

  const handleResetQuiz = () => {
    onReset();
    setCurrentIdx(0);
    setSavedNotice(false);
  };

  const handleRecordResult = () => {
    onSaveHistory(correctCount, HOTS_QUESTIONS.length);
    setSavedNotice(true);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-sky-700">
            Halaman 05 · Latihan Soal HOTS (10 Soal Literasi A–E)
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Tantangan HOTS Kontekstual Gerak Melingkar
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Pilih satu jawaban yang paling tepat berdasarkan stimulus fenomena sehari-hari atau data percobaan. Kunci jawaban, alasan ilmiah, dan analisis pengecoh akan terbuka setelah kamu menjawab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 font-mono-tabular">
            Terjawab: {answeredCount} / {HOTS_QUESTIONS.length} · Benar: {correctCount}
          </div>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulangi Kuis</span>
          </button>
        </div>
      </header>

      {/* Question Navigator Numbers 1..10 */}
      <div className="flex flex-wrap gap-2">
        {HOTS_QUESTIONS.map((item, idx) => {
          const ans = answers[item.id];
          const answered = ans !== undefined;
          const right = ans === item.correctIndex;
          const active = idx === currentIdx;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border font-mono-tabular text-xs font-bold transition ${
                active
                  ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                  : answered && right
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : answered && !right
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
              aria-label={`Soal nomor ${item.id}`}
            >
              {item.id}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      <section className="card-3d-surface rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-sky-700">
              Soal {q.id} dari {HOTS_QUESTIONS.length} · {q.contextTag}
            </div>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900">{q.title}</h2>
          </div>
          <span className="text-xs text-slate-500">{q.sourceAlignment}</span>
        </div>

        {/* Literacy Stimulus */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-600">Stimulus Literasi</div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-800">{q.stimulusNarrative}</p>

          {q.diagramType === 'table-data' && q.tableHeaders && q.tableRows && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    {q.tableHeaders.map((h) => (
                      <th key={h} className="px-3 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono-tabular text-slate-800">
                  {q.tableRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, ci) => (
                        <td key={`${row[0]}-${ci}`} className="px-3 py-2.5">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <PhysicsDiagramSvg type={q.diagramType} />
        </div>

        {/* Question Prompt */}
        <p className="text-base font-bold text-slate-900">{q.question}</p>

        {/* Options A-E */}
        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            const isUserChoice = selectedOpt === idx;
            const isAnswerKey = idx === q.correctIndex;

            let optionClasses =
              'border-slate-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50/40';
            if (hasAnswered) {
              if (isAnswerKey) {
                optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950';
              } else if (isUserChoice && !isAnswerKey) {
                optionClasses = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                optionClasses = 'border-slate-200 bg-slate-50 text-slate-500';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleChoose(idx)}
                className={`flex w-full min-h-12 items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm transition ${optionClasses}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono-tabular text-xs font-bold text-slate-800">
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="pt-0.5 font-medium">{opt}</span>
                </div>
                {hasAnswered && isAnswerKey && (
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Benar
                  </span>
                )}
                {hasAnswered && isUserChoice && !isAnswerKey && (
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-rose-700">
                    <XCircle className="h-4 w-4" /> Pilihanmu
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback + Distractor Analysis (only shown AFTER answering!) */}
        {hasAnswered && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Jawaban Benar! ({OPTION_LETTERS[q.correctIndex]})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-rose-700">
                  <XCircle className="h-5 w-5" />
                  Kurang Tepat — Kunci Jawaban: {OPTION_LETTERS[q.correctIndex]}
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <div className="font-bold text-slate-900">Alasan &amp; Pembahasan:</div>
              <p className="leading-relaxed">{q.explanation}</p>
              {q.explanationLatex && (
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <MathFormula latex={q.explanationLatex} block />
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900">Analisis Pengecoh Setiap Opsi:</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {q.distractorAnalysis.map((da) => (
                  <div key={da.optionLabel} className="rounded-xl border border-slate-200 bg-white p-3 text-xs">
                    <div className="font-bold text-slate-900">{da.optionLabel}</div>
                    <p className="mt-0.5 text-slate-600">{da.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next / Prev Question Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => i - 1)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Soal Sebelumnya</span>
          </button>

          {currentIdx < HOTS_QUESTIONS.length - 1 && (
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => i + 1)}
              className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-white"
            >
              <span>Soal Berikutnya</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* Completion Summary & 70-point mastery check */}
      {allAnswered && (
        <section
          className={`rounded-3xl border p-6 space-y-4 ${
            score100 >= 70
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-amber-300 bg-amber-50'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                <span>Latihan HOTS Selesai! Skor Kamu: {score100} / 100 ({correctCount} benar dari 10)</span>
              </div>
              <p className="text-xs text-slate-700">
                {score100 >= 70
                  ? 'Selamat! Kamu melampaui batas minimal 70 sesuai petunjuk modul (hal. 7). Lanjutkan ke Gim Edukasi!'
                  : 'Sesuai petunjuk modul (hal. 7), karena skormu di bawah 70, bacalah kembali bagian Materi yang masih keliru sebelum mengulang kuis.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRecordResult}
                disabled={savedNotice}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-60"
              >
                {savedNotice ? 'Tersimpan di Riwayat ✓' : 'Simpan Skor ke Riwayat'}
              </button>
              {score100 < 70 && (
                <button
                  type="button"
                  onClick={() => onNavigate('materi')}
                  className="btn-tactile-amber rounded-xl px-4 py-2 text-xs font-bold text-white"
                >
                  Baca Ulang Materi
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
