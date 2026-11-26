import {Award, BookOpen, GraduationCap, School, Sparkles} from 'lucide-react';
import {MODULE_IDENTITY} from '../data/materiData';
import {SmartImage} from '../components/SmartImage';

export function DeveloperPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <div className="text-xs font-semibold text-sky-700">Halaman 09 · Profil Pengembang</div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Pengembang Media Pembelajaran Interaktif
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Dirancang untuk menghadirkan pembelajaran Fisika Kelas X yang komunikatif, interaktif, dan ramah remaja.
        </p>
      </header>

      <section className="card-3d-surface rounded-3xl p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="h-64 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-sky-50 shadow-sm">
              <SmartImage
                src="/src/assets/images/character_teacher_3d_1795670452599.jpg"
                alt="Ilustrasi 3D Guru Fisika Pengembang: Restu Miftahul Jannah, S.Pd."
                className="h-full w-full object-cover"
                fallbackTitle="Restu Miftahul Jannah, S.Pd."
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-5">
            <div>
              <div className="text-xs font-semibold text-sky-700">Guru &amp; Pengembang Media</div>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                {MODULE_IDENTITY.developerName}
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Pendidik Mata Pelajaran Fisika · {MODULE_IDENTITY.developerSchool}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-700">
              Media Pembelajaran Interaktif (MPI) topik <strong>Kinematika Gerak Melingkar</strong> ini dikembangkan khusus untuk peserta didik kelas X SMA agar konsep-konsep abstrak seperti perpindahan sudut, kecepatan tangensial, percepatan sentripetal, dan hubungan roda-roda dapat diamati secara visual dan diuji coba langsung.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
                <School className="h-5 w-5 shrink-0 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Instansi</div>
                  <div className="text-xs text-slate-600">{MODULE_IDENTITY.developerSchool}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
                <GraduationCap className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Sasaran Peserta Didik</div>
                  <div className="text-xs text-slate-600">Peserta Didik Kelas X SMA</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
                <BookOpen className="h-5 w-5 shrink-0 text-orange-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Rujukan Kurikulum</div>
                  <div className="text-xs text-slate-600">Modul Fisika Kelas X KD 3.6 (Direktorat SMA, 2020)</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Pendekatan Pedagogis</div>
                  <div className="text-xs text-slate-600">Simulasi Interaktif, Literasi HOTS, &amp; Gamifikasi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 flex items-start gap-3">
        <Award className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>Ucapan Terima Kasih &amp; Atribusi Sumber:</strong> Materi pokok dalam MPI ini bersumber dari <em>Modul Pembelajaran SMA Fisika Kelas X KD 3.6: Gerak Melingkar</em> yang disusun oleh <strong>Neny Else Josephine, S.Pd, MM</strong> (SMAN 2 Surabaya) dan diterbitkan oleh Direktorat SMA, Kemendikbud tahun 2020, serta simulasi interaktif <strong>PhET</strong> oleh University of Colorado Boulder.
        </div>
      </section>
    </div>
  );
}
