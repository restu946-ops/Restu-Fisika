import {MateriTopic} from '../types/mpi';

export const MODULE_IDENTITY = {
  title: 'Kinematika Gerak Melingkar',
  subject: 'Fisika',
  grade: 'Kelas X SMA',
  kdKnowledge: '3.6 / 3.1 Menganalisis besaran fisis pada gerak melingkar dengan laju konstan (tetap) dan penerapannya dalam kehidupan sehari-hari',
  kdSkill: '4.1 Melakukan percobaan berikut presentasi hasilnya tentang gerak melingkar, makna fisis dan pemanfaatannya',
  sourceModule: 'Modul Pembelajaran SMA Fisika Kelas X KD 3.6: Gerak Melingkar',
  sourceAuthor: 'Neny Else Josephine, S.Pd, MM (SMAN 2 Surabaya)',
  sourcePublisher: 'Direktorat SMA, Direktorat Jenderal PAUD, DIKDAS dan DIKMEN (2020)',
  developerName: 'Restu Miftahul Jannah, S.Pd.',
  developerSchool: 'SMA Dharma Karya UT',
};

export const LEARNING_OBJECTIVES = {
  kp1: {
    title: 'Kegiatan Pembelajaran 1: Gerak Melingkar Beraturan (Hal. 8)',
    items: [
      'Menjelaskan pengertian gerak melingkar ditinjau dari lintasan benda.',
      'Menganalisis besaran fisis pada gerak melingkar dengan laju konstan (tetap), meliputi periode, frekuensi, perpindahan sudut, kecepatan linear, kecepatan sudut, percepatan sudut, percepatan sentripetal, dan percepatan tangensial.',
      'Menganalisis penerapan gerak melingkar beraturan dalam kehidupan sehari-hari.',
    ],
  },
  kp2: {
    title: 'Kegiatan Pembelajaran 2: Hubungan Roda-Roda (Hal. 26)',
    items: [
      'Menganalisis hubungan roda-roda sepusat (seporos).',
      'Menganalisis hubungan roda-roda yang dihubungkan dengan rantai atau sabuk.',
      'Menganalisis hubungan roda-roda yang bersinggungan.',
    ],
  },
};

export const GLOSSARY_ITEMS = [
  {
    term: 'Frekuensi (f)',
    definition: 'Banyaknya putaran tiap satu satuan waktu (satuan SI: Hertz atau Hz).',
    page: 'Hal. 4, 10',
  },
  {
    term: 'Periode (T)',
    definition: 'Waktu yang dibutuhkan dalam melakukan satu kali putaran lengkap (satuan SI: sekon atau s).',
    page: 'Hal. 4, 10',
  },
  {
    term: 'Radian (rad)',
    definition: 'Salah satu satuan sudut dalam SI; 1 putaran penuh = 360° = 2π rad (1 rad ≈ 57,3°).',
    page: 'Hal. 4, 11–12',
  },
  {
    term: 'Kecepatan Linear (v)',
    definition: 'Kecepatan benda dalam lintasan lurus/tangensial yang arahnya selalu menyinggung lingkaran pada titik tersebut (satuan SI: m/s).',
    page: 'Hal. 4, 10, 13',
  },
  {
    term: 'Kecepatan Sudut (ω)',
    definition: 'Besar sudut yang ditempuh benda dalam lintasan melingkar tiap satu satuan waktu (satuan SI: rad/s, satuan mesin lain: rpm).',
    page: 'Hal. 4, 13',
  },
  {
    term: 'Percepatan Tangensial (aₜ)',
    definition: 'Perubahan kecepatan tangensial dalam selang waktu tertentu di mana arah percepatan tangensial selalu menyinggung lintasan putarnya (satuan SI: m/s²).',
    page: 'Hal. 4, 15',
  },
  {
    term: 'Percepatan Sentripetal (aₛ)',
    definition: 'Percepatan yang dimiliki oleh benda yang bergerak melingkar akibat perubahan arah kecepatan, dengan arah selalu menuju ke pusat putaran (satuan SI: m/s²).',
    page: 'Hal. 4, 14',
  },
];

export const MATERI_TOPICS: MateriTopic[] = [
  {
    id: 'pengertian-gmb',
    partLabel: 'Bagian 1 · Konsep Dasar',
    title: 'Gerak Melingkar & Gerak Melingkar Beraturan (GMB)',
    sourcePages: 'Hal. 6, 8–10',
    summary:
      'Gerak melingkar adalah gerak suatu benda pada lintasan yang berbentuk lingkaran dengan kecepatan tertentu. Contoh nyata di sekitar kita antara lain gerak jarum jam dinding, ujung baling-baling kipas angin atau helikopter, mobil yang menikung, kincir angin, roller coaster, gerak bulan mengelilingi bumi, serta putaran roda sepeda.',
    keyPoints: [
      'Terdapat dua kelompok besaran dalam gerak melingkar: besaran sudut/anguler (periode, frekuensi, posisi sudut, kecepatan sudut, percepatan sudut) dan besaran linear/tangensial (jari-jari, panjang lintasan, kecepatan linear, percepatan tangensial, percepatan sentripetal, percepatan total).',
      'Berdasarkan karakteristik kecepatannya, gerak melingkar dibedakan menjadi Gerak Melingkar Beraturan (GMB) dengan kecepatan sudut (ω) konstan (α = 0), dan Gerak Melingkar Berubah Beraturan (GMBB) dengan percepatan sudut (α) tetap.',
      'Pada GMB, kelajuan linearnya tetap, tetapi vektor kecepatan linearnya tidak konstan karena arahnya selalu berubah menyinggung lingkaran di setiap titik.',
      'Perubahan arah kecepatan ini menghasilkan percepatan sentripetal yang arahnya menuju pusat lingkaran, sehingga benda tetap berada pada lintasan melingkar.',
    ],
    formulas: [
      {
        label: 'Syarat Gerak Melingkar Beraturan (GMB)',
        latex: '\\omega = \\text{konstan}, \\quad \\alpha = 0, \\quad |\\vec{v}| = \\text{tetap}',
        notes: [
          'Pada GMB hanya ada percepatan sentripetal (aₛ).',
          'Pada GMBB dikenal percepatan sentripetal (mengubah arah) dan percepatan tangensial (mengubah besar kelajuan).',
        ],
      },
    ],
    examples: [],
    simulationType: 'gmb',
  },
  {
    id: 'periode-frekuensi',
    partLabel: 'Bagian 2 · Besaran Fisis',
    title: 'Periode (T) dan Frekuensi (f)',
    sourcePages: 'Hal. 10, 19',
    summary:
      'Untuk mendeskripsikan seberapa cepat sebuah benda menyelesaikan putaran penuhnya, kita menggunakan besaran Periode (T) dan Frekuensi (f) yang saling berkebalikan.',
    keyPoints: [
      'Periode (T) adalah waktu yang diperlukan suatu benda untuk melakukan satu kali putaran penuh (satuan SI: sekon / s).',
      'Frekuensi (f) adalah jumlah putaran yang dilakukan benda dalam satu satuan waktu / 1 sekon (satuan SI: Hertz / Hz).',
      'Hubungan keduanya berbanding terbalik: semakin besar frekuensi putaran, semakin singkat waktu periodenya.',
    ],
    formulas: [
      {
        label: 'Persamaan Periode',
        latex: 'T = \\frac{t}{n} = \\frac{1}{f}',
        notes: ['T = periode (s)', 't = waktu tempuh (s)', 'n = jumlah putaran'],
      },
      {
        label: 'Persamaan Frekuensi',
        latex: 'f = \\frac{n}{t} = \\frac{1}{T}',
        notes: ['f = frekuensi (Hz atau putaran/sekon)'],
      },
    ],
    examples: [
      {
        title: 'Contoh Aplikasi (Mengacu Latihan Soal No. 2, Hal. 22–23)',
        problem:
          'Sebuah benda bergerak melingkar dan selama 60 sekon benda berputar sebanyak 5 kali. Hitunglah periode dan frekuensi benda tersebut!',
        steps: [
          'Diketahui: t = 60 s, n = 5 putaran.',
          'Menghitung Periode: T = t / n = 60 s / 5 = 12 s.',
          'Menghitung Frekuensi: f = n / t = 5 / 60 s = 1/12 Hz (≈ 0,083 Hz).',
        ],
        answerLatex: 'T = 12\\text{ s}, \\quad f = \\frac{1}{12}\\text{ Hz}',
        sourcePage: 'Hal. 22–23',
        pedagogicalNote:
          'Catatan jujur atas PDF sumber (hal. 23): Pada pembahasan modul tercetak f = 5/60 s = 1/2 Hz; hasil hitung yang benar secara matematis dari 5/60 adalah 1/12 Hz.',
      },
    ],
  },
  {
    id: 'perpindahan-sudut',
    partLabel: 'Bagian 3 · Besaran Sudut',
    title: 'Perpindahan Sudut (θ) dan Hubungan Linear',
    sourcePages: 'Hal. 10–12, 19',
    summary:
      'Ketika roda berputar terhadap porosnya, setiap bagian roda menyapu sudut tertentu terhadap posisi acuan. Sudut yang disapu oleh garis radial dari posisi awal (θ₀) ke posisi akhir (θ) disebut perpindahan sudut (Δθ).',
    keyPoints: [
      'Arah perpindahan sudut: Δθ > 0 untuk putaran berlawanan arah jarum jam, dan Δθ < 0 untuk putaran searah jarum jam.',
      'Tiga cara mengukur perpindahan sudut: derajat (°), putaran, dan radian (satuan SI). Derajat, putaran, dan radian merupakan besaran yang tidak memiliki dimensi.',
      'Konversi penting: 1 putaran = 360° = 2π rad, sehingga 1 rad = 360° / (2π) ≈ 57,3° atau 1° ≈ 0,01745 rad.',
      'Untuk satu putaran penuh, panjang lintasan adalah keliling lingkaran s = 2πr dan Δθ = 2π rad, sehingga berlaku s = Δθ · r atau x = rθ.',
    ],
    formulas: [
      {
        label: 'Konversi & Definisi Perpindahan Sudut',
        latex: '\\Delta\\theta = \\theta - \\theta_0, \\qquad 1\\text{ putaran} = 360^\\circ = 2\\pi\\text{ rad}',
      },
      {
        label: 'Hubungan Perpindahan Linear (x atau s) dengan Sudut (θ)',
        latex: '\\theta = \\frac{x}{r} \\quad \\text{atau} \\quad x = r\\theta',
        notes: ['x atau s = panjang busur/lintasan (m)', 'r = jari-jari lingkaran (m)', 'θ = perpindahan sudut (rad)'],
      },
    ],
    examples: [
      {
        title: 'Contoh Soal Perpindahan Sudut (Hal. 12)',
        problem:
          'Sebuah benda bergerak melingkar dengan jari-jari lingkaran yang dibentuknya 80 cm. Tentukan posisi sudut dalam satuan radian dan derajat jika benda tersebut menempuh lintasan dengan panjang busur 6 cm.',
        steps: [
          'Diketahui: r = R = 80 cm, s = 6 cm.',
          'Dalam radian: θ = s / R = 6 cm / 80 cm = 0,075 rad.',
          'Dalam derajat: θ = 0,075 × 57,3° = 4,30°.',
        ],
        answerLatex: '\\theta = 0{,}075\\text{ rad} = 4{,}30^\\circ',
        sourcePage: 'Hal. 12',
      },
    ],
  },
  {
    id: 'kecepatan-linear-sudut',
    partLabel: 'Bagian 4 · Kinematika Gerak',
    title: 'Kecepatan Linear (v) dan Kecepatan Sudut (ω)',
    sourcePages: 'Hal. 12–14, 17, 19',
    summary:
      'Kecepatan linear (kecepatan tangensial) menunjukkan seberapa jauh lintasan melingkar yang ditempuh tiap sekon, sedangkan kecepatan sudut (anguler) menunjukkan seberapa besar sudut pusat yang disapu tiap sekon.',
    keyPoints: [
      'Dalam satu periode T, benda menempuh satu keliling lingkaran (2πr) dan sudut satu putaran (2π rad).',
      'Satuan SI kecepatan linear (v) adalah m/s, sedangkan satuan SI kecepatan sudut (ω) adalah rad/s. Pada mesin kendaraan/industri juga sering dipakai satuan rpm (rotation per minute).',
      'Hubungan keduanya dinyatakan oleh v = ω · r. Pada kecepatan sudut ω yang sama, semakin besar jari-jari r (semakin jauh titik dari pusat), semakin besar kecepatan linearnya.',
    ],
    formulas: [
      {
        label: 'Kecepatan Linear (Tangensial)',
        latex: 'v = \\frac{s}{T} = \\frac{2\\pi r}{T} = 2\\pi r f',
      },
      {
        label: 'Kecepatan Sudut (Anguler)',
        latex: '\\omega = \\frac{2\\pi}{T} = 2\\pi f',
      },
      {
        label: 'Hubungan Kecepatan Linear & Kecepatan Sudut',
        latex: 'v = \\omega r',
        notes: [
          'Catatan pada PDF hal. 17: tertulis keterangan "v : kecepatan sudut" (salah cetak pada PDF, seharusnya v adalah kecepatan linear dalam m/s, dan ketika ω tetap maka v ∝ r).',
        ],
      },
    ],
    examples: [
      {
        title: 'Contoh Soal Meja Putar (Hal. 13–14)',
        problem:
          'Sebuah balok kecil berada di tepi meja putar yang berjari-jari 0,4 m. Mula-mula meja berputar dengan kecepatan sudut 20 rad/s. Karena mengalami percepatan maka kecepatan sudutnya berubah menjadi 50 rad/s setelah bergerak selama 15 s. Berapakah kecepatan linear awal dan akhir balok tersebut?',
        steps: [
          'Diketahui: R = 0,4 m, ω₀ = 20 rad/s, ω = 50 rad/s, t = 15 s.',
          'Kecepatan linear awal: v₀ = ω₀ × R = 20 × 0,4 = 8 m/s.',
          'Kecepatan linear akhir: v = ω × R = 50 × 0,4 = 20 m/s.',
        ],
        answerLatex: 'v_0 = 8\\text{ m/s}, \\quad v = 20\\text{ m/s}',
        sourcePage: 'Hal. 13–14',
      },
    ],
  },
  {
    id: 'percepatan-sentripetal-tangensial',
    partLabel: 'Bagian 5 · Percepatan & Gaya',
    title: 'Percepatan Sudut (α), Sentripetal (aₛ), dan Tangensial (aₜ)',
    sourcePages: 'Hal. 14–18, 19',
    summary:
      'Meskipun kelajuan linear pada GMB tetap, arah kecepatan selalu berubah sehingga muncul percepatan sentripetal menuju pusat lingkaran. Jika kecepatan sudutnya juga ikut berubah (GMBB), muncul pula percepatan sudut dan percepatan tangensial.',
    keyPoints: [
      'Percepatan sudut (α) adalah perubahan kecepatan sudut tiap satuan waktu (rad/s²).',
      'Percepatan sentripetal (aₛ) selalu mengarah ke pusat lingkaran dan berfungsi mengubah arah vektor kecepatan agar benda tetap di lintasan melingkar.',
      'Gaya sentripetal (Fₛ) adalah perkalian massa benda dengan percepatan sentripetal.',
      'Percepatan tangensial (aₜ) adalah perubahan besar kecepatan tangensial tiap satuan waktu yang arahnya menyinggung lintasan. Jika searah v benda dipercepat; jika berlawanan benda diperlambat.',
    ],
    formulas: [
      {
        label: 'Percepatan Sudut (α)',
        latex: '\\alpha = \\frac{\\Delta\\omega}{\\Delta t} = \\frac{\\omega_2 - \\omega_1}{t_2 - t_1}',
      },
      {
        label: 'Percepatan Sentripetal (aₛ) & Gaya Sentripetal (Fₛ)',
        latex: 'a_s = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}, \\qquad F_s = m\\frac{v^2}{r} = m\\omega^2 R',
        notes: [
          'Catatan koreksi jujur atas PDF hal. 15: di kotak rumus tertulis Fₛ = 4π²rf/T² (salah cetak); bentuk yang konsisten dengan aₛ = 4π²r/T² adalah Fₛ = m(4π²R)/T² = 4π²mRf².',
        ],
      },
      {
        label: 'Percepatan Tangensial (aₜ) & Hubungannya dengan α',
        latex: 'a_t = \\frac{v - v_0}{\\Delta t} = \\frac{\\Delta v}{\\Delta t} = \\alpha R',
      },
    ],
    examples: [
      {
        title: 'Contoh Soal 1: CD Player — Percepatan Sentripetal (Hal. 15)',
        problem:
          'Sebuah titik berada di tepi sebuah CD yang berjari-jari 4 cm. CD tersebut berputar di dalam CD Player dengan kecepatan sudut 3 rad/s. Tentukan percepatan sentripetal pada titik tersebut!',
        steps: [
          'Diketahui: R = 4 cm = 0,04 m, ω = 3 rad/s.',
          'Gunakan persamaan: aₛ = ω² R.',
          'aₛ = 3² × 0,04 = 9 × 0,04 = 0,36 m/s² (atau 36 cm/s²).',
        ],
        answerLatex: 'a_s = 0{,}36\\text{ m/s}^2',
        sourcePage: 'Hal. 15',
      },
      {
        title: 'Contoh Soal 2: Benda Mula-Mula Diam — Percepatan Tangensial (Hal. 16)',
        problem:
          'Sebuah benda mula-mula diam, kemudian setelah 5 sekon benda tersebut bergerak melingkar dengan kecepatan tangensial sebesar 25 cm/s. Jika diameter lintasan benda adalah 10 cm, tentukan percepatan tangensial benda tersebut!',
        steps: [
          'Diketahui: v₀ = 0, v = 25 cm/s = 0,25 m/s, Δt = 5 s, R = ½ × 10 cm = 0,05 m.',
          'aₜ = (v − v₀) / Δt = (0,25 − 0) / 5 = 0,05 m/s².',
        ],
        answerLatex: 'a_t = 0{,}05\\text{ m/s}^2\\text{ atau } 5\\text{ cm/s}^2',
        sourcePage: 'Hal. 16',
        pedagogicalNote:
          'Catatan jujur: pada PDF hal. 16 tertulis satuannya "0,05 m/s atau 5 cm/s", padahal satuan percepatan yang benar adalah m/s² atau cm/s².',
      },
      {
        title: 'Contoh Soal 3: Hubungan α dan aₜ pada Meja Putar (Hal. 17–18)',
        problem:
          'Sebuah balok kecil berada di tepi meja putar berjari-jari 0,4 m. Kecepatan sudut berubah dari 20 rad/s menjadi 50 rad/s selama 15 s. Berapakah percepatan tangensial balok tersebut?',
        steps: [
          'Hitung percepatan sudut: α = (ω − ω₀)/Δt = (50 − 20)/15 = 2 rad/s².',
          'Hitung percepatan tangensial: aₜ = α R = 2 × 0,4 = 0,8 m/s².',
        ],
        answerLatex: 'a_t = 0{,}8\\text{ m/s}^2',
        sourcePage: 'Hal. 17–18',
      },
    ],
    simulationType: 'calculator',
  },
  {
    id: 'hubungan-lurus-melingkar',
    partLabel: 'Bagian 6 · Sintesis Konsep',
    title: 'Hubungan Gerak Lurus & Gerak Melingkar + Eksperimen Roda',
    sourcePages: 'Hal. 18–21',
    summary:
      'Setiap besaran pada gerak lurus (jarak x, kecepatan v, percepatan tangensial aₜ) memiliki pasangan langsung dengan besaran gerak melingkar (θ, ω, α) melalui faktor pengali jari-jari lintasan r.',
    keyPoints: [
      'Jarak / panjang lintasan (x, satuan m) ↔ Posisi sudut (θ, satuan rad): x = r θ.',
      'Kecepatan linear (v, satuan m/s) ↔ Kecepatan sudut (ω, satuan rad/s): v = r ω.',
      'Percepatan tangensial (aₜ, satuan m/s²) ↔ Percepatan sudut (α, satuan rad/s²): aₜ = r α.',
      'Eksperimen Mandiri Roda (Hal. 20–21): Menggelindingkan roda 5 kali putaran dengan spidol, meteran, dan stopwatch membuktikan bahwa hasil bagi jarak tempuh dengan sudut tempuh (s/θ) maupun v/ω sama dengan jari-jari roda (r), dan ω/f = 2π.',
    ],
    formulas: [
      {
        label: 'Tiga Kesetaraan Gerak Lurus dan Gerak Melingkar (Tabel Hal. 18)',
        latex: 'x = r\\theta \\qquad v = r\\omega \\qquad a_t = r\\alpha',
      },
    ],
    examples: [
      {
        title: 'Panduan Percobaan Mandiri Roda (Hal. 20–21)',
        problem:
          'Alat & bahan: Roda, spidol, meteran, stopwatch. Ukur jari-jari r, tandai titik start dengan spidol, jalankan roda 5 putaran penuh sambil mencatat waktu total t dan panjang lintasan S.',
        steps: [
          'Sudut tempuh untuk 5 putaran penuh adalah θ = 5 × 2π = 10π rad.',
          'Kelajuan linear rata-rata: v = S / t, sedangkan periode T = t / 5 dan frekuensi f = 5 / t.',
          'Hasil bagi jarak tempuh dengan sudut tempuh (S / θ) serta hasil bagi v / ω sama dengan jari-jari roda r!',
          'Hasil bagi kelajuan sudut dengan frekuensi (ω / f) selalu bernilai 2π.',
        ],
        answerLatex: '\\frac{S}{\\theta} = r, \\quad \\frac{v}{\\omega} = r, \\quad \\frac{\\omega}{f} = 2\\pi',
        sourcePage: 'Hal. 20–21',
      },
    ],
  },
  {
    id: 'hubungan-roda-roda',
    partLabel: 'Bagian 7 · Aplikasi Sistem',
    title: 'Hubungan Roda-Roda pada Gerak Melingkar',
    sourcePages: 'Hal. 26–32',
    summary:
      'Dalam kehidupan sehari-hari—seperti sepeda ontel (gir depan, gir belakang, dan roda belakang) maupun mesin jam analog—terdapat tiga jenis hubungan roda-roda: sepusat (seporos), dihubungkan dengan sabuk/rantai, dan bersinggungan.',
    keyPoints: [
      '1. Roda-Roda Sepusat (Seporos): Contoh gir belakang dengan roda belakang sepeda. Arah putar kedua roda SEARAH. Kecepatan sudutnya sama (ωₐ = ω_B), sehingga vₐ / Rₐ = v_B / R_B.',
      '2. Roda-Roda Dihubungkan Sabuk atau Rantai: Contoh gir depan dengan gir belakang sepeda ontel. Arah putar kedua roda SEARAH. Kecepatan linear pada tepi luar sama (vₐ = v_B), sehingga ωₐ Rₐ = ω_B R_B.',
      '3. Roda-Roda Bersinggungan: Contoh roda bergerigi pada jam analog. Arah putar kedua roda BERLAWANAN arah. Pada titik singgung, kelajuan linearnya sama (vₐ = v_B), sehingga ωₐ Rₐ = ω_B R_B (atau sebanding dengan jumlah gigi roda).',
    ],
    formulas: [
      {
        label: '1. Sepusat (Seporos) — Arah Searah',
        latex: '\\omega_A = \\omega_B \\quad \\Longleftrightarrow \\quad \\frac{v_A}{R_A} = \\frac{v_B}{R_B}',
      },
      {
        label: '2. Sabuk / Rantai — Arah Searah',
        latex: 'v_A = v_B \\quad \\Longleftrightarrow \\quad \\omega_A R_A = \\omega_B R_B',
      },
      {
        label: '3. Bersinggungan — Arah Berlawanan',
        latex: 'v_A = v_B \\quad \\Longleftrightarrow \\quad \\omega_A R_A = \\omega_B R_B',
        notes: [
          'Catatan jujur tabel hal. 32 PDF: Di keterangan tertulis "R_A: Jumlah gigi pada roda A, R_A: Jumlah gigi pada roda B" (salah ketik huruf R_A untuk R_B, dan jumlah gigi umumnya dilambangkan N atau n yang sebanding dengan jari-jari R).',
        ],
      },
    ],
    examples: [
      {
        title: 'Contoh 1: Roda Sepusat (Hal. 27–28)',
        problem:
          'Dua buah roda A dan B berada pada satu poros memiliki jari-jari 2 cm dan 8 cm. Jika kecepatan linear roda A adalah 6 m/s, tentukan kecepatan sudut roda A serta kecepatan linear dan kecepatan sudut roda B!',
        steps: [
          'R_A = 0,02 m, R_B = 0,08 m, v_A = 6 m/s.',
          'a) ω_A = v_A / R_A = 6 / 0,02 = 300 rad/s.',
          'b) Karena sepusat: ω_B = ω_A = 300 rad/s.',
          '   v_B = ω_B × R_B = 300 × 0,08 = 24 m/s.',
        ],
        answerLatex: '\\omega_A = \\omega_B = 300\\text{ rad/s}, \\quad v_B = 24\\text{ m/s}',
        sourcePage: 'Hal. 27–28',
      },
      {
        title: 'Contoh 2: Roda dengan Rantai (Hal. 29)',
        problem:
          'Dua buah roda dihubungkan dengan rantai. Roda kecil berjari-jari 8 cm diputar pada 100 rad/s. Jika jari-jari roda besar 15 cm, berapakah kecepatan linear kedua roda dan kecepatan sudut roda besar?',
        steps: [
          'R₁ = 0,08 m, R₂ = 0,15 m, ω₁ = 100 rad/s.',
          'Kecepatan linear roda 1: v₁ = ω₁ × R₁ = 100 × 0,08 = 8 m/s.',
          'Karena dihubungkan rantai: v₂ = v₁ = 8 m/s.',
          'Kecepatan sudut roda 2: ω₂ = v₂ / R₂ = 8 / 0,15 = 53,33 rad/s.',
        ],
        answerLatex: 'v_1 = v_2 = 8\\text{ m/s}, \\quad \\omega_2 = 53{,}33\\text{ rad/s}',
        sourcePage: 'Hal. 29',
      },
      {
        title: 'Contoh 3: Silinder Bersinggungan (Hal. 30–31)',
        problem:
          'Dua buah silinder bersinggungan dengan R_A = 50 cm dan R_B = 30 cm. Silinder B berputar tetap 5 rad/s tanpa slip. Tentukan kecepatan linear A dan B serta kecepatan sudut A!',
        steps: [
          'R_A = 0,5 m, R_B = 0,3 m, ω_B = 5 rad/s.',
          'v_B = ω_B × R_B = 5 × 0,3 = 1,5 m/s.',
          'Karena bersinggungan tanpa slip: v_A = v_B = 1,5 m/s.',
          'ω_A = v_A / R_A = 1,5 / 0,5 = 3 rad/s (arah berlawanan dengan B).',
        ],
        answerLatex: 'v_A = v_B = 1{,}5\\text{ m/s}, \\quad \\omega_A = 3\\text{ rad/s}',
        sourcePage: 'Hal. 30–31',
      },
    ],
    simulationType: 'roda-roda',
  },
];
