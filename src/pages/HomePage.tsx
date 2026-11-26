import {ArrowRight, BookOpen, Compass, Gamepad2, GraduationCap, Target} from 'lucide-react';
import {LearningProgressState, PageId} from '../types/mpi';
import {SmartImage} from '../components/SmartImage';
import {MODULE_IDENTITY} from '../data/materiData';

interface HomePageProps {
  progress: LearningProgressState;
  overallPercent: number;
  onNavigate: (page: PageId) => void;
}

const QUICK_MENU_CARDS: {id: PageId; title: string; subtitle: string}[] = [
  {id: 'panduan', title: '02. Panduan Belajar', subtitle: 'Aturan navigasi, kuis, dan batas tuntas 70'},
  {id: 'tujuan', title: '03. Tujuan & Peta Konsep', subtitle: 'Target KD 3.6, peta konsep, dan glosarium'},
  {id: 'materi', title: '04. Materi & Simulasi', subtitle: '7 bagian konsep, animasi, dan kalkulator'},
  {id: 'latihan', title: '05. Latihan HOTS', subtitle: '10 soal literasi A–E & analisis pengecoh'},
  {id: 'gim', title: '06. Gim Edukasi', subtitle: 'Drag-drop, cari kata, papan 2π, dan PhET'},
  {id: 'evaluasi', title: '07. Evaluasi & Refleksi', subtitle: 'Tes akhir modul, penilaian diri, dan riwayat'},
  {id: 'referensi', title: '08. Referensi Sumber', subtitle: 'Daftar pustaka modul PDF & catatan akurasi'},
  {id: 'pengembang', title: '09. Profil Pengembang', subtitle: 'Restu Miftahul Jannah, S.Pd. — SMA Dharma Karya UT'},
];

export function HomePage({progress, overallPercent, onNavigate}: HomePageProps) {
  const hotsCount = Object.keys(progress.hotsAnswers).length;
  const evalCount = Object.keys(progress.evalAnswers).length;
  const gamesDone = [
    progress.gameScores.dragDropBest !== null,
    progress.gameScores.wordSearchBest !== null,
    progress.gameScores.orderingBest !== null,
    progress.gameScores.boardGameBest !== null,
    progress.gameScores.phetExplored,
  ].filter(Boolean).length;

  return (
    <div className="space-y-10">
      {/* Hero Split Section */}
      <section className="card-3d-surface overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-700">
                <span>Fisika SMA Kelas X</span>
                <span aria-hidden="true">·</span>
                <span>SMA Dharma Karya UT</span>
                <span aria-hidden="true">·</span>
                <span>Modul KD 3.6</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Eksplorasi Dunia Kinematika Gerak Melingkar
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                Selamat datang di Media Pembelajaran Interaktif Fisika Kelas X. Pelajari bagaimana bianglala, jarum jam, hingga gir sepeda ontel bekerja melalui simulasi langsung, latihan HOTS berbasis literasi, dan gim edukasi sains.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('materi')}
                  className="btn-tactile-primary inline-flex min-h-12 items-center gap-2.5 rounded-2xl px-6 py-3 text-sm font-bold text-white whitespace-nowrap"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('panduan')}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap"
                >
                  <Compass className="h-4 w-4 text-sky-600" />
                  <span>Baca Panduan</span>
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Pengembang: <strong className="text-slate-700">{MODULE_IDENTITY.developerName}</strong> ({MODULE_IDENTITY.developerSchool}) · Sumber utama: Modul Fisika Kelas X KD 3.6 Direktorat SMA.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-sky-50">
              <SmartImage
                src="/src/assets/images/hero_physics_explorer_1795670451382.jpg"
                alt="Ilustrasi 3D siswa dan guru Fisika SMA menjelajahi bianglala dan sistem roda gigi"
                className="h-full w-full object-cover"
                fallbackTitle="Dunia Eksplorasi Kinematika Gerak Melingkar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Progress KPI Strip */}
      <section aria-label="Ringkasan Progres Belajar" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-3d-surface rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Progres Total</span>
            <GraduationCap className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-2 font-mono-tabular text-2xl font-extrabold text-slate-900">
            {overallPercent}%
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-600 transition-all"
              style={{width: `${overallPercent}%`}}
            />
          </div>
        </div>

        <div className="card-3d-surface rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Materi Dipahami</span>
            <BookOpen className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-mono-tabular text-2xl font-extrabold text-slate-900">
            {progress.completedTopics.length} / 7
          </div>
          <p className="mt-1 text-xs text-slate-500">Topik GMB hingga roda-roda</p>
        </div>

        <div className="card-3d-surface rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Latihan HOTS &amp; Evaluasi</span>
            <Target className="h-4 w-4 text-orange-600" />
          </div>
          <div className="mt-2 font-mono-tabular text-2xl font-extrabold text-slate-900">
            {hotsCount + evalCount} / 20
          </div>
          <p className="mt-1 text-xs text-slate-500">10 HOTS · 10 Evaluasi Modul</p>
        </div>

        <div className="card-3d-surface rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Gim &amp; Simulasi PhET</span>
            <Gamepad2 className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-2 font-mono-tabular text-2xl font-extrabold text-slate-900">
            {gamesDone} / 5
          </div>
          <p className="mt-1 text-xs text-slate-500">Aktivitas bermain interaktif</p>
        </div>
      </section>

      {/* Complete 9-Page Learning Path Directory */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Peta Halaman Pembelajaran</h2>
          <p className="text-sm text-slate-600">
            Pilih halaman mana saja atau ikuti urutan nomor secara bertahap dari Panduan hingga Evaluasi.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_MENU_CARDS.map((card) => {
            const visited = progress.visitedPages.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="card-3d-surface group flex flex-col justify-between rounded-2xl p-4 text-left transition hover:border-sky-400"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-sky-700">
                      {card.title}
                    </span>
                    {visited && (
                      <span className="text-[11px] font-semibold text-emerald-700">Dikunjungi</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{card.subtitle}</p>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  <span>Buka Halaman</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
