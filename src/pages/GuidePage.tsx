import {BookCheck, CheckCircle2, Compass, Gamepad2, HelpCircle, RotateCcw} from 'lucide-react';
import {SmartImage} from '../components/SmartImage';
import {PageId} from '../types/mpi';

interface GuidePageProps {
  onNavigate: (page: PageId) => void;
}

export function GuidePage({onNavigate}: GuidePageProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-xs font-semibold text-sky-700">Halaman 02 · Panduan Penggunaan</div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Panduan Belajar &amp; Aturan Main Media Pembelajaran
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Ikuti panduan di bawah ini agar pengalaman belajarmu runtut, menyenangkan, dan mencapai ketuntasan sesuai Petunjuk Penggunaan Modul Fisika Kelas X KD 3.6 (hal. 7).
        </p>
      </header>

      {/* Character Welcome Split */}
      <section className="card-3d-surface rounded-3xl p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="h-56 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-emerald-50">
              <SmartImage
                src="/src/assets/images/character_student_guide_1795670452256.jpg"
                alt="Karakter siswa 3D membawa kincir dan stopwatch sebagai pemandu belajar"
                className="h-full w-full object-cover"
                fallbackTitle="Pemandu Belajar Siswa Kelas X"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Hai, Teman-Teman Kelas X! Siap Menjelajahi Gerak Melingkar?
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Di website ini, kamu tidak hanya membaca rumus, tetapi juga bisa memutar roda-roda secara langsung, menguji hitungan dengan kalkulator fisika, bermain papan lintasan 2π radian, hingga mengeksplorasi simulasi resmi PhET dari University of Colorado Boulder.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="text-xs font-bold text-sky-700">Topik 1 · Kegiatan Belajar 1</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">Gerak Melingkar Beraturan (GMB)</div>
                <p className="mt-0.5 text-xs text-slate-600">Besaran sudut, linear, percepatan sentripetal, dan tangensial.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="text-xs font-bold text-orange-700">Topik 2 · Kegiatan Belajar 2</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">Hubungan Roda-Roda</div>
                <p className="mt-0.5 text-xs text-slate-600">Sistem sepusat, dihubungkan rantai/sabuk, dan bersinggungan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Instructions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="card-3d-surface rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">1. Petunjuk Navigasi</h3>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>Gunakan menu utama di bagian atas atau tombol <strong>Menu Utama</strong> untuk melompat ke salah satu dari 9 halaman.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>Di bagian bawah setiap halaman tersedia tombol <strong>Kembali</strong>, <strong>Beranda</strong>, dan <strong>Lanjut</strong> agar belajarmu selalu terarah.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>Semua progres belajar, jawaban kuis, skor gim, dan catatan refleksimu tersimpan otomatis di peramban (<em>localStorage</em>).</span>
            </li>
          </ul>
        </section>

        <section className="card-3d-surface rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <BookCheck className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">2. Aturan Pengerjaan Kuis</h3>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>Pelajari Tujuan Pembelajaran dan ke-7 bagian Materi terlebih dahulu sebelum masuk ke Latihan HOTS.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>Kunci jawaban dan analisis pengecoh pada Latihan HOTS tidak ditampilkan sebelum kamu memilih jawaban.</span>
            </li>
            <li className="flex items-start gap-2">
              <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <span><strong>Aturan Modul Hal. 7:</strong> Jika skormu masih di bawah <strong>70</strong>, bacalah kembali materinya terlebih dahulu sebelum mengulang soal yang keliru!</span>
            </li>
          </ul>
        </section>

        <section className="card-3d-surface rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="h-5 w-5 text-orange-600" />
            <h3 className="text-base font-bold text-slate-900">3. Aturan Gim &amp; Simulasi</h3>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <span>Gunakan slider pada laboratorium simulasi GMB dan Roda-Roda untuk mengamati perubahan vektor kecepatan dan arah putaran.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <span>Mainkan 4 gim internal (Pasangkan Konsep, Cari Kata, Susun Langkah, Papan Lintasan 2π) untuk menguji kecepatan berpikirmu.</span>
            </li>
            <li className="flex items-start gap-2">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <span>Selesaikan 3 misi eksplorasi pada simulasi <strong>PhET Ladybug Revolution</strong> sebagai penguatan konsep visual.</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-sky-950">Sudah paham alurnya?</div>
          <p className="text-xs text-sky-800">Langkah berikutnya adalah mengenal Kompetensi Dasar dan Tujuan Pembelajaran kita.</p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('tujuan')}
          className="btn-tactile-primary rounded-xl px-5 py-2.5 text-xs font-bold text-white"
        >
          Lihat Tujuan Pembelajaran
        </button>
      </div>
    </div>
  );
}
