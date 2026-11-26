import {useState} from 'react';
import {AlertCircle, BookOpen, CheckCircle2, ChevronLeft, ChevronRight} from 'lucide-react';
import {MATERI_TOPICS} from '../data/materiData';
import {MathFormula} from '../components/MathFormula';
import {PhysicsDiagramSvg} from '../components/PhysicsDiagramSvg';
import {SmartImage} from '../components/SmartImage';
import {
  FormulaCalculator,
  GmbCanvasSimulation,
  RodaRodaSimulation,
} from '../components/PhysicsSimulations';

interface MaterialPageProps {
  completedTopics: string[];
  onToggleTopic: (topicId: string) => void;
  onMarkTopic: (topicId: string) => void;
}

export function MaterialPage({
  completedTopics,
  onToggleTopic,
  onMarkTopic,
}: MaterialPageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const topic = MATERI_TOPICS[activeIdx];
  const isDone = completedTopics.includes(topic.id);

  const goTopic = (nextIdx: number) => {
    setActiveIdx(nextIdx);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-sky-700">
            Halaman 04 · Materi Pembelajaran Interaktif
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Kinematika Gerak Melingkar &amp; Hubungan Roda-Roda
          </h1>
          <p className="text-sm text-slate-600">
            Pelajari 7 tahap materi sesuai urutan modul PDF, bereksperimen dengan simulasi, dan tandai setiap bagian yang sudah kamu kuasai.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 font-mono-tabular">
          Progres Materi: {completedTopics.length} / {MATERI_TOPICS.length} Selesai
        </div>
      </header>

      {/* Topic Stepper Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {MATERI_TOPICS.map((item, idx) => {
          const active = idx === activeIdx;
          const done = completedTopics.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTopic(idx)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold transition whitespace-nowrap shrink-0 ${
                active
                  ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                  : done
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="font-mono-tabular">{idx + 1}.</span>
              <span>{item.title.split('(')[0].trim()}</span>
              {done && <CheckCircle2 className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Main Topic Card */}
      <article className="card-3d-surface rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-700">
              <span>{topic.partLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Sumber PDF: {topic.sourcePages}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{topic.title}</h2>
          </div>

          <button
            type="button"
            onClick={() => onToggleTopic(topic.id)}
            className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition whitespace-nowrap shrink-0 ${
              isDone
                ? 'border-emerald-500 bg-emerald-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isDone ? 'Sudah Dipahami' : 'Tandai Paham'}</span>
          </button>
        </div>

        <p className="text-base leading-relaxed text-slate-700">{topic.summary}</p>

        {/* Key Points */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-900">Poin Kunci Konsep Fisika</h3>
          <ul className="space-y-2.5">
            {topic.keyPoints.map((kp) => (
              <li
                key={kp}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm leading-relaxed text-slate-700"
              >
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Diagrams for specific topics */}
        {topic.id === 'pengertian-gmb' && (
          <PhysicsDiagramSvg
            type="gmb-vectors"
            caption="Ilustrasi vektor kecepatan linear (v) yang menyinggung lingkaran dan percepatan sentripetal (aₛ) menuju pusat lingkaran O."
          />
        )}

        {topic.id === 'hubungan-lurus-melingkar' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3">Besaran Gerak Lurus</th>
                  <th className="px-4 py-3">Satuan SI</th>
                  <th className="px-4 py-3">Besaran Gerak Melingkar</th>
                  <th className="px-4 py-3">Satuan SI</th>
                  <th className="px-4 py-3">Hubungan Persamaan (Hal. 18)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                <tr>
                  <td className="px-4 py-3 font-medium">x (jarak)</td>
                  <td className="px-4 py-3 font-mono-tabular">m</td>
                  <td className="px-4 py-3 font-medium">θ (posisi sudut)</td>
                  <td className="px-4 py-3 font-mono-tabular">rad (radian)</td>
                  <td className="px-4 py-3"><MathFormula latex="x = r\,\theta" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">v (kecepatan)</td>
                  <td className="px-4 py-3 font-mono-tabular">m/s</td>
                  <td className="px-4 py-3 font-medium">ω (kecepatan sudut)</td>
                  <td className="px-4 py-3 font-mono-tabular">rad/s</td>
                  <td className="px-4 py-3"><MathFormula latex="v = r\,\omega" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">aₜ (percepatan tangensial)</td>
                  <td className="px-4 py-3 font-mono-tabular">m/s²</td>
                  <td className="px-4 py-3 font-medium">α (percepatan sudut)</td>
                  <td className="px-4 py-3 font-mono-tabular">rad/s²</td>
                  <td className="px-4 py-3"><MathFormula latex="a_t = r\,\alpha" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {topic.id === 'hubungan-roda-roda' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="md:col-span-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <SmartImage
                src="/src/assets/images/gear_system_3d_1795670451759.jpg"
                alt="Model 3D tiga jenis hubungan roda-roda: sepusat, sabuk, dan bersinggungan"
                className="h-52 w-full object-cover"
                fallbackTitle="Model 3D Hubungan Roda-Roda"
              />
            </div>
            <div className="md:col-span-7 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Jenis Hubungan</th>
                    <th className="p-2.5">Arah Putar</th>
                    <th className="p-2.5">Persamaan Utama (Hal. 32)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold">1. Seporos (Sepusat)</td>
                    <td className="p-2.5">Searah</td>
                    <td className="p-2.5"><MathFormula latex="\omega_A = \omega_B,\; \frac{v_A}{R_A} = \frac{v_B}{R_B}" /></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">2. Sabuk / Rantai</td>
                    <td className="p-2.5">Searah</td>
                    <td className="p-2.5"><MathFormula latex="v_A = v_B,\; \omega_A R_A = \omega_B R_B" /></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">3. Bersinggungan</td>
                    <td className="p-2.5 font-semibold text-orange-700">Berlawanan arah</td>
                    <td className="p-2.5"><MathFormula latex="v_A = v_B,\; \omega_A R_A = \omega_B R_B" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Formulas */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Rumus &amp; Satuan SI</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {topic.formulas.map((f) => (
              <div key={f.label} className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                <div className="text-xs font-bold text-sky-900 mb-2">{f.label}</div>
                <div className="rounded-xl bg-white px-3 py-2 border border-sky-100">
                  <MathFormula latex={f.latex} block />
                </div>
                {f.notes && f.notes.length > 0 && (
                  <ul className="mt-2.5 space-y-1 text-xs text-slate-600">
                    {f.notes.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Worked Examples */}
        {topic.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Contoh Soal &amp; Pembahasan</h3>
            <div className="space-y-4">
              {topic.examples.map((ex) => (
                <div key={ex.title} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{ex.title}</h4>
                    <span className="text-xs font-medium text-slate-500">{ex.sourcePage}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{ex.problem}</p>
                  <div className="rounded-xl bg-slate-50 p-3.5 space-y-1.5">
                    <div className="text-xs font-bold text-slate-700">Langkah Penyelesaian:</div>
                    {ex.steps.map((st) => (
                      <div key={st} className="text-xs sm:text-sm text-slate-700">
                        • {st}
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200">
                      <MathFormula latex={ex.answerLatex} block />
                    </div>
                  </div>
                  {ex.pedagogicalNote && (
                    <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      <span>{ex.pedagogicalNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topic Footer Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={activeIdx === 0}
            onClick={() => goTopic(activeIdx - 1)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Bagian Sebelumnya</span>
          </button>

          {activeIdx < MATERI_TOPICS.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                onMarkTopic(topic.id);
                goTopic(activeIdx + 1);
              }}
              className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-white"
            >
              <span>Tandai Paham &amp; Lanjut Bagian {activeIdx + 2}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onMarkTopic(topic.id)}
              className="btn-tactile-amber inline-flex min-h-10 items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-white"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Selesaikan Semua Materi</span>
            </button>
          )}
        </div>
      </article>

      {/* Interactive Physics Simulation / Calculator attached cleanly below the active topic */}
      {topic.simulationType === 'gmb' && <GmbCanvasSimulation />}
      {topic.simulationType === 'roda-roda' && <RodaRodaSimulation />}
      {topic.simulationType === 'calculator' && <FormulaCalculator />}

      {/* Always keep Calculator accessible on other topics via collapsible toggle or direct view */}
      {topic.simulationType !== 'calculator' && (
        <details className="rounded-3xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-bold text-sky-700">
            Buka Kalkulator Rumus Gerak Melingkar
          </summary>
          <div className="mt-4">
            <FormulaCalculator />
          </div>
        </details>
      )}
    </div>
  );
}
