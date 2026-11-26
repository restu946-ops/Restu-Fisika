import {useState} from 'react';
import {CheckCircle2, Search, Target} from 'lucide-react';
import {GLOSSARY_ITEMS, LEARNING_OBJECTIVES, MODULE_IDENTITY} from '../data/materiData';
import {PageId} from '../types/mpi';

interface ObjectivesPageProps {
  onNavigate: (page: PageId) => void;
}

export function ObjectivesPage({onNavigate}: ObjectivesPageProps) {
  const [glossaryQuery, setGlossaryQuery] = useState('');

  const filteredGlossary = GLOSSARY_ITEMS.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-xs font-semibold text-sky-700">Halaman 03 · Tujuan Pembelajaran</div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Kompetensi Dasar, Tujuan Belajar &amp; Peta Konsep
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          Seluruh target capaian di halaman ini disusun langsung dari Pendahuluan (hal. 6), Peta Konsep (hal. 5), Glosarium (hal. 4), serta Kegiatan Pembelajaran 1 dan 2 pada Modul Fisika Kelas X KD 3.6.
        </p>
      </header>

      {/* Kompetensi Dasar */}
      <section className="card-3d-surface rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="h-5 w-5 text-sky-600" />
          <h2 className="text-lg font-bold text-slate-900">Kompetensi Dasar (Hal. 6 Modul)</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-sky-700">KD Pengetahuan</div>
            <p className="mt-1 text-sm font-medium text-slate-800">{MODULE_IDENTITY.kdKnowledge}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-emerald-700">KD Keterampilan</div>
            <p className="mt-1 text-sm font-medium text-slate-800">{MODULE_IDENTITY.kdSkill}</p>
          </div>
        </div>
      </section>

      {/* Tujuan Pembelajaran KP 1 & KP 2 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="card-3d-surface rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">{LEARNING_OBJECTIVES.kp1.title}</h2>
          <p className="text-xs text-slate-500">Setelah mempelajari bagian 1–6 materi, peserta didik diharapkan mampu:</p>
          <ul className="space-y-3">
            {LEARNING_OBJECTIVES.kp1.items.map((item, idx) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-100 font-mono-tabular text-xs font-bold text-sky-800">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-3d-surface rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">{LEARNING_OBJECTIVES.kp2.title}</h2>
          <p className="text-xs text-slate-500">Setelah mempelajari bagian 7 materi dan simulasi roda-roda, peserta didik diharapkan mampu:</p>
          <ul className="space-y-3">
            {LEARNING_OBJECTIVES.kp2.items.map((item, idx) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-mono-tabular text-xs font-bold text-orange-800">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Interactive Peta Konsep (Hal. 5) */}
      <section className="card-3d-surface rounded-3xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Peta Konsep Kinematika Gerak Melingkar (Hal. 5)</h2>
            <p className="text-xs text-slate-500">Klik node peta konsep di bawah ini untuk langsung menuju halaman Materi.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('materi')}
            className="text-xs font-bold text-sky-700 hover:underline"
          >
            Buka Materi Lengkap →
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-xl border border-sky-300 bg-sky-600 px-5 py-2 text-sm font-bold text-white">
              Gerak → Kinematika Gerak Melingkar Beraturan
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => onNavigate('materi')}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-sky-400 transition"
              >
                <div className="text-xs font-bold text-sky-700">Cabang 1</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Pengertian Gerak Melingkar Beraturan</div>
                <p className="mt-1 text-xs text-slate-600">Lintasan lingkaran, ω tetap, α = 0, contoh sehari-hari.</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('materi')}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-sky-400 transition"
              >
                <div className="text-xs font-bold text-emerald-700">Cabang 2 · Besaran GMB</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Besaran-Besaran dalam GMB</div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Periode dan Frekuensi</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Posisi Sudut (θ)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Kecepatan Sudut / Anguler (ω)</li>
                </ul>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('materi')}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-sky-400 transition"
              >
                <div className="text-xs font-bold text-orange-700">Cabang 3 · Hubungan &amp; Aplikasi</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Besaran Sudut ↔ Tangensial &amp; Roda-Roda</div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-orange-600" /> Posisi Sudut &amp; Panjang Lintasan</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-orange-600" /> Kecepatan Sudut &amp; Tangensial</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-orange-600" /> Percepatan Sentripetal &amp; Hubungan Roda-Roda</li>
                </ul>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Glosarium (Hal. 4) */}
      <section className="card-3d-surface rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Glosarium Istilah Penting (Hal. 4)</h2>
            <p className="text-xs text-slate-500">Kamus ringkas besaran fisis yang akan sering kamu temui di bab ini.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              placeholder="Cari istilah fisika..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredGlossary.map((g) => (
            <div key={g.term} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-900">{g.term}</span>
                <span className="text-[11px] font-medium text-slate-500">{g.page}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{g.definition}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
