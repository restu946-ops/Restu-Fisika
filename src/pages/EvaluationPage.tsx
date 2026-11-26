import {useState} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  History,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';
import {
  EVAL_QUESTIONS,
  SELF_ASSESSMENT_KP1,
  SELF_ASSESSMENT_KP2,
} from '../data/quizData';
import {LearningProgressState, PageId} from '../types/mpi';
import {MathFormula} from '../components/MathFormula';
import {PhysicsDiagramSvg} from '../components/PhysicsDiagramSvg';

interface EvaluationPageProps {
  progress: LearningProgressState;
  onSelectEvalAnswer: (questionId: number, optionIndex: number) => void;
  onResetEval: () => void;
  onSetSelfAssessment: (itemKey: string, val: 'Ya' | 'Tidak') => void;
  onSetReflectionNote: (note: string) => void;
  onSetStudentName: (name: string) => void;
  onSaveHistory: (score: number, maxScore: number) => void;
  onResetAllProgress: () => void;
  onNavigate: (page: PageId) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function EvaluationPage({
  progress,
  onSelectEvalAnswer,
  onResetEval,
  onSetSelfAssessment,
  onSetReflectionNote,
  onSetStudentName,
  onSaveHistory,
  onResetAllProgress,
  onNavigate,
}: EvaluationPageProps) {
  const [activeTab, setActiveTab] = useState<'evaluasi' | 'refleksi' | 'riwayat'>('evaluasi');
  const [savedEval, setSavedEval] = useState(false);

  const evalAnsweredCount = Object.keys(progress.evalAnswers).length;
  const evalCorrectCount = EVAL_QUESTIONS.filter(
    (q) => progress.evalAnswers[q.id] === q.correctIndex,
  ).length;
  const evalScore100 = Math.round((evalCorrectCount / EVAL_QUESTIONS.length) * 100);

  const allSelfItems = [...SELF_ASSESSMENT_KP1, ...SELF_ASSESSMENT_KP2];
  const hasTidak = allSelfItems.some((item) => progress.selfAssessment[item.id] === 'Tidak');
  const allSelfFilled = allSelfItems.every(
    (item) => progress.selfAssessment[item.id] === 'Ya' || progress.selfAssessment[item.id] === 'Tidak',
  );

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <div className="text-xs font-semibold text-sky-700">
          Halaman 07 · Evaluasi Akhir, Penilaian Diri &amp; Riwayat
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Evaluasi Pemahaman &amp; Refleksi Belajar
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Uji penguasaanmu melalui 10 soal Evaluasi resmi modul (hal. 36–38), lengkapi Penilaian Diri (hal. 25 &amp; 35), dan pantau riwayat skor belajarmu.
        </p>
      </header>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('evaluasi')}
          className={`flex-1 min-h-11 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
            activeTab === 'evaluasi' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Evaluasi Modul (10 Soal)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('refleksi')}
          className={`flex-1 min-h-11 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
            activeTab === 'refleksi' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Penilaian Diri &amp; Refleksi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('riwayat')}
          className={`flex-1 min-h-11 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
            activeTab === 'riwayat' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Riwayat Hasil Belajar
        </button>
      </div>

      {/* TAB 1: EVALUASI MODUL (10 SOAL HAL 36-38) */}
      {activeTab === 'evaluasi' && (
        <div className="space-y-6">
          <div className="card-3d-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
            <div>
              <div className="text-xs font-semibold text-slate-500">Status Pengerjaan Evaluasi</div>
              <div className="mt-0.5 font-mono-tabular text-lg font-extrabold text-slate-900">
                Terjawab {evalAnsweredCount} / {EVAL_QUESTIONS.length} · Benar {evalCorrectCount} ({evalScore100}%)
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {evalAnsweredCount === EVAL_QUESTIONS.length && (
                <button
                  type="button"
                  disabled={savedEval}
                  onClick={() => {
                    onSaveHistory(evalCorrectCount, EVAL_QUESTIONS.length);
                    setSavedEval(true);
                  }}
                  className="btn-tactile-primary rounded-xl px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  {savedEval ? 'Tersimpan di Riwayat ✓' : 'Simpan Nilai Evaluasi'}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onResetEval();
                  setSavedEval(false);
                }}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Ulangi Evaluasi</span>
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {EVAL_QUESTIONS.map((q) => {
              const picked = progress.evalAnswers[q.id];
              const answered = picked !== undefined;
              const right = picked === q.correctIndex;

              return (
                <article key={q.id} className="card-3d-surface rounded-3xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tabular text-xs font-bold text-sky-700">
                      Evaluasi No. {q.id}
                    </span>
                    <span className="text-xs text-slate-500">{q.sourcePage}</span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900">
                    {q.question}
                  </p>

                  <PhysicsDiagramSvg type={q.diagramType} />

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {q.options.map((opt, idx) => {
                      const isPick = picked === idx;
                      const isKey = idx === q.correctIndex;
                      let cls = 'border-slate-200 bg-white text-slate-800 hover:border-sky-400';
                      if (answered) {
                        if (isKey) cls = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                        else if (isPick) cls = 'border-rose-400 bg-rose-50 text-rose-950';
                        else cls = 'border-slate-200 bg-slate-50 text-slate-500';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={answered}
                          onClick={() => {
                            onSelectEvalAnswer(q.id, idx);
                            setSavedEval(false);
                          }}
                          className={`flex min-h-11 items-center justify-between gap-2 rounded-xl border-2 px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition ${cls}`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono-tabular text-xs font-bold text-slate-800">
                              {LETTERS[idx]}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {answered && isKey && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                          {answered && isPick && !isKey && <XCircle className="h-4 w-4 shrink-0 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                      <div className="text-xs font-bold text-slate-900">
                        {right ? (
                          <span className="text-emerald-700">✓ Jawabanmu Benar ({LETTERS[q.correctIndex]})</span>
                        ) : (
                          <span className="text-rose-700">✕ Kurang Tepat — Jawaban Fisika yang Benar: {LETTERS[q.correctIndex]}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                      {q.explanationLatex && (
                        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <MathFormula latex={q.explanationLatex} block />
                        </div>
                      )}
                      {q.pdfNote && (
                        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                          <span>{q.pdfNote}</span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PENILAIAN DIRI (HAL 25 & 35) + REFLEKSI */}
      {activeTab === 'refleksi' && (
        <div className="space-y-6">
          <section className="card-3d-surface rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <ClipboardCheck className="h-5 w-5 text-sky-600" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Penilaian Diri Peserta Didik (Hal. 25 &amp; 35 Modul)
                </h2>
                <p className="text-xs text-slate-500">
                  Jawablah pertanyaan berikut dengan jujur dan bertanggung jawab sesuai penguasaanmu saat ini.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Bagian A · Gerak Melingkar Beraturan (Hal. 25)</h3>
              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {SELF_ASSESSMENT_KP1.map((item, idx) => {
                  const val = progress.selfAssessment[item.id];
                  return (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <span className="text-sm text-slate-800">
                        <strong className="font-mono-tabular mr-2 text-slate-500">0{idx + 1}.</strong>
                        {item.text}
                      </span>
                      <div className="flex gap-2 shrink-0">
                        {(['Ya', 'Tidak'] as const).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => onSetSelfAssessment(item.id, choice)}
                            className={`min-h-9 rounded-lg border px-4 py-1.5 text-xs font-bold transition ${
                              val === choice
                                ? choice === 'Ya'
                                  ? 'border-emerald-600 bg-emerald-600 text-white'
                                  : 'border-amber-600 bg-amber-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <h3 className="text-sm font-bold text-slate-800 pt-2">Bagian B · Hubungan Roda-Roda (Hal. 35)</h3>
              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {SELF_ASSESSMENT_KP2.map((item, idx) => {
                  const val = progress.selfAssessment[item.id];
                  return (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <span className="text-sm text-slate-800">
                        <strong className="font-mono-tabular mr-2 text-slate-500">0{idx + 1}.</strong>
                        {item.text}
                      </span>
                      <div className="flex gap-2 shrink-0">
                        {(['Ya', 'Tidak'] as const).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => onSetSelfAssessment(item.id, choice)}
                            className={`min-h-9 rounded-lg border px-4 py-1.5 text-xs font-bold transition ${
                              val === choice
                                ? choice === 'Ya'
                                  ? 'border-emerald-600 bg-emerald-600 text-white'
                                  : 'border-amber-600 bg-amber-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Automatic Feedback based on PDF rule hal 25 & 35 */}
            {hasTidak && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4">
                <p className="text-xs sm:text-sm font-medium text-amber-950">
                  <strong>Rekomendasi Modul (Hal. 25/35):</strong> Masih ada jawaban &quot;Tidak&quot;. Segera lakukan <em>review</em> pembelajaran pada bagian materi yang belum kamu kuasai!
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('materi')}
                  className="btn-tactile-amber rounded-xl px-4 py-2 text-xs font-bold text-white"
                >
                  Review Materi
                </button>
              </div>
            )}

            {allSelfFilled && !hasTidak && (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs sm:text-sm font-semibold text-emerald-900">
                Selamat! Semua jawaban &quot;Ya&quot; — kamu siap melanjutkan ke pembelajaran fisika berikutnya!
              </div>
            )}
          </section>

          {/* Reflection Journal */}
          <section className="card-3d-surface rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Jurnal Refleksi Belajar Pribadi</h3>
            <p className="text-xs text-slate-600">
              Tuliskan nama lengkapmu serta hal paling menarik atau konsep yang masih ingin kamu tanyakan kepada guru fisika (tersimpan otomatis di perangkatmu).
            </p>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Nama Peserta Didik
                <input
                  type="text"
                  value={progress.studentName}
                  onChange={(e) => onSetStudentName(e.target.value)}
                  placeholder="Tulis nama lengkapmu..."
                  className="mt-1 w-full max-w-md rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Catatan Refleksi
                <textarea
                  rows={4}
                  value={progress.reflectionNote}
                  onChange={(e) => onSetReflectionNote(e.target.value)}
                  placeholder="Contoh: Hari ini saya memahami perbedaan arah percepatan sentripetal dan kecepatan tangensial, serta cara kerja gir sepeda ontel..."
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm text-slate-900"
                />
              </label>
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: RIWAYAT HASIL BELAJAR */}
      {activeTab === 'riwayat' && (
        <section className="card-3d-surface rounded-3xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <History className="h-5 w-5 text-sky-600" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Riwayat Hasil Belajar — {progress.studentName}
                </h2>
                <p className="text-xs text-slate-500">Catatan skor Latihan HOTS, Evaluasi Akhir, dan Gim Edukasi yang tersimpan di localStorage.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onResetAllProgress}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
            >
              <Trash2 className="h-4 w-4" />
              <span>Hapus Semua Progres</span>
            </button>
          </div>

          {progress.history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              Belum ada riwayat skor yang disimpan. Selesaikan Latihan HOTS, Evaluasi Akhir, atau Gim Edukasi lalu simpan skormu!
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Waktu</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Aktivitas</th>
                    <th className="px-4 py-3">Skor</th>
                    <th className="px-4 py-3">Persentase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                  {progress.history.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 font-mono-tabular text-xs text-slate-500">{item.timestamp}</td>
                      <td className="px-4 py-3 font-semibold">{item.category}</td>
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3 font-mono-tabular font-bold">
                        {item.score} / {item.maxScore}
                      </td>
                      <td className="px-4 py-3 font-mono-tabular font-bold text-sky-700">
                        {item.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
