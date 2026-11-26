import {AlertCircle, BookOpen, ExternalLink} from 'lucide-react';
import {MODULE_IDENTITY} from '../data/materiData';

const PDF_LINKS = [
  'https://www.wardayacollege.com/fisika/kinematika/gerak-melingkar/',
  'https://fisikakontekstual.com/materi-gerak-melingkar/',
  'https://www.studiobelajar.com/gerak-melingkar/',
  'https://www.coretanilmu.xyz/2018/12/gerak-melingkarberaturan-gmb-dalam.html',
  'https://www.anashir.com/fisika/gerak-melingkar-beraturan-gmb/',
  'https://bagibagiilmufisika.wordpress.com/2011/02/23/gerak-melingkar-beraturan/',
  'https://www.fisikabc.com/2017/06/posisi-sudut-gerak-melingkar.html',
  'https://www.fisikabc.com/2017/06/percepatan-linear-gerak-melingkar.html',
  'https://www.fisikabc.com/2017/06/hubungan-besaran-anguler-dengan-tangensial-gerak-melingkar.html',
  'https://www.fisikabc.com/2017/06/hubungan-roda-roda-gerak-melingkar.html',
  'https://www.edutafsi.com/2015/06/soal-dan-jawaban-hubungan-roda.html',
  'https://www.hajarfisika.com/2017/09/soal-dan-pembahasan-hubungan-roda-roda.html',
  'https://fisikasekolahmadrasah.blogspot.com/2017/11/soal-dan-pembahasan-gerak-melingkar.html',
  'https://soalfismat.com/contoh-soal-hubungan-roda-dan-pembahasan/',
  'http://fisikastudycenter.com/fisika-x-sma/3-gerak-melingkar',
];

export function ReferencesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <div className="text-xs font-semibold text-sky-700">Halaman 08 · Referensi &amp; Daftar Pustaka</div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Sumber Rujukan &amp; Transparansi Akademik
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Seluruh materi, urutan pembahasan, soal evaluasi, dan daftar pustaka pada media pembelajaran ini merujuk langsung kepada berkas PDF sumber utama (hal. 1–39).
        </p>
      </header>

      {/* Primary Module & Book */}
      <section className="card-3d-surface rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-5 w-5 text-sky-600" />
          <h2 className="text-lg font-bold text-slate-900">Sumber Utama (Hal. 2 &amp; Hal. 39 PDF)</h2>
        </div>

        <div className="space-y-3 text-sm text-slate-700">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-bold text-slate-900">1. {MODULE_IDENTITY.sourceModule}</div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Penyusun: {MODULE_IDENTITY.sourceAuthor}. Diterbitkan oleh {MODULE_IDENTITY.sourcePublisher}. (Halaman 1–39).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-bold text-slate-900">
              2. Subagya, Hari. 2016. <em>Buku Konsep dan Penerapan Fisika untuk SMA/MA Kelas X Kurikulum 2013 Edisi Revisi 2016 Kelompok Peminatan MIPA</em>. PT. Bumi Aksara.
            </div>
            <p className="mt-1 text-xs text-slate-500">Tercantum pada Daftar Pustaka Modul Halaman 39.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-bold text-slate-900">
              3. PhET Interactive Simulations — Ladybug Revolution / Rotation
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Simulasi fisika interaktif dari University of Colorado Boulder (
              <a
                href="https://phet.colorado.edu/en/simulations/rotation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-700 hover:underline"
              >
                https://phet.colorado.edu/en/simulations/rotation
              </a>
              ), diintegrasikan pada halaman Gim Edukasi sebagai media eksperimen tambahan.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Transparency Notes on PDF */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <h2 className="text-base font-bold">Catatan Kejujuran &amp; Verifikasi atas PDF Sumber</h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-950">
          Sesuai prinsip kejujuran akademik, berikut adalah beberapa catatan transparan terkait ketidaksesuaian ketik minor yang ditemukan pada berkas PDF sumber:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 list-disc pl-5">
          <li><strong>Halaman 15 (Rumus Fₛ):</strong> Pada kotak rumus tertulis <code className="font-mono-tabular">4π²rf/T²</code>; bentuk matematis yang konsisten dengan <code className="font-mono-tabular">aₛ = 4π²r/T²</code> adalah <code className="font-mono-tabular">Fₛ = 4π²mr/T² = 4π²mrf²</code>.</li>
          <li><strong>Halaman 16 &amp; 17:</strong> Contoh soal hal. 16 menuliskan satuan percepatan <code className="font-mono-tabular">0,05 m/s</code> (kurang kuadrat, seharusnya <code className="font-mono-tabular">m/s²</code>); pada hal. 17 keterangan <code className="font-mono-tabular">v</code> tertulis &quot;kecepatan sudut&quot; (seharusnya &quot;kecepatan linear&quot;).</li>
          <li><strong>Halaman 23 (Latihan 2 &amp; 3d):</strong> Nomor 2 tertulis <code className="font-mono-tabular">f = 5/60 = 1/2 Hz</code> (hasil matematis sebenarnya <code className="font-mono-tabular">1/12 Hz</code>); nomor 3d tertulis <code className="font-mono-tabular">2π × (1/30) = 0,0167 rad/s</code> (seharusnya <code className="font-mono-tabular">≈ 0,209 rad/s</code>).</li>
          <li><strong>Halaman 36–38 (Evaluasi No. 3 &amp; 8):</strong> Kunci hal. 38 tertulis 3.D dan 8.B, namun perhitungan fisika yang konsisten menghasilkan Opsi C (<code className="font-mono-tabular">2π m/s</code> karena <code className="font-mono-tabular">d = 1 m → r = 0,5 m</code>) dan Opsi D (<code className="font-mono-tabular">3/4</code>).</li>
          <li><strong>Halaman 32 (Tabel Rangkuman Roda):</strong> Keterangan pada baris bersinggungan tertulis <code className="font-mono-tabular">R_A</code> dua kali; salah satunya merujuk pada roda B.</li>
        </ul>
      </section>

      {/* Online References from Page 39 */}
      <section className="card-3d-surface rounded-3xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Daftar Tautan Pustaka dalam Modul (Hal. 39)</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {PDF_LINKS.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-sky-800 hover:border-sky-400 hover:bg-sky-50"
            >
              <span className="truncate">{url}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
