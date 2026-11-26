import {EvalQuestion, HotsQuestion} from '../types/mpi';

export const HOTS_QUESTIONS: HotsQuestion[] = [
  {
    id: 1,
    title: 'Bianglala Taman Kota',
    contextTag: 'Periode, Frekuensi & Kecepatan Sudut',
    stimulusNarrative:
      'Pada malam Minggu, Rina dan keluarganya menaiki bianglala raksasa di alun-alun kota. Bianglala tersebut memiliki diameter 20 meter dan berputar secara beraturan. Rina mencatat menggunakan stopwatch bahwa bianglala menyelesaikan 12 putaran penuh dalam waktu 4 menit (gunakan π = 3,14).',
    diagramType: 'gmb-vectors',
    question:
      'Berdasarkan pengamatan Rina, nilai periode, frekuensi, dan kecepatan sudut bianglala berturut-turut adalah ....',
    options: [
      'T = 20 s, f = 0,05 Hz, dan ω = 0,314 rad/s',
      'T = 0,05 s, f = 20 Hz, dan ω = 0,314 rad/s',
      'T = 20 s, f = 0,05 Hz, dan ω = 3,14 rad/s',
      'T = 12 s, f = 0,083 Hz, dan ω = 0,52 rad/s',
      'T = 3 s, f = 0,33 Hz, dan ω = 2,09 rad/s',
    ],
    correctIndex: 0,
    explanation:
      'Konversi waktu t = 4 menit = 4 × 60 = 240 s dengan n = 12 putaran. Periode T = t/n = 240/12 = 20 s. Frekuensi f = n/t = 12/240 = 0,05 Hz. Kecepatan sudut ω = 2πf = 2 × 3,14 × 0,05 = 0,314 rad/s.',
    explanationLatex:
      'T = \\frac{240}{12} = 20\\text{ s}, \\quad f = \\frac{12}{240} = 0{,}05\\text{ Hz}, \\quad \\omega = 2\\pi f = 2(3{,}14)(0{,}05) = 0{,}314\\text{ rad/s}',
    distractorAnalysis: [
      {optionLabel: 'Opsi A (Benar)', reason: 'Seluruh langkah konversi menit ke sekon dan rumus T, f, ω tepat.'},
      {optionLabel: 'Opsi B', reason: 'Terbalik antara rumus periode (t/n) dan frekuensi (n/t).'},
      {optionLabel: 'Opsi C', reason: 'Salah hitung pada ω = 2πf, keliru mengalikan 2 × 0,05 menjadi 1 bukan 0,1.'},
      {optionLabel: 'Opsi D', reason: 'Lupa mengonversi 4 menit menjadi 240 s atau salah membagi jumlah putaran.'},
      {optionLabel: 'Opsi E', reason: 'Menghitung n/t secara keliru tanpa konversi waktu ke sekon (12/4 = 3).'},
    ],
    sourceAlignment: 'Modul Hal. 10 & 13 (Periode, Frekuensi, Kecepatan Sudut)',
  },
  {
    id: 2,
    title: 'Dua Penumpang Komidi Putar',
    contextTag: 'Perbandingan Besaran Linear & Sudut',
    stimulusNarrative:
      'Dita dan Bima menaiki wahana komidi putar yang berputar dengan kecepatan sudut konstan. Dita memilih kuda mainan di lintasan luar yang berjarak 3,0 m dari pusat putaran, sedangkan Bima memilih kuda mainan di lintasan dalam yang berjarak 1,5 m dari pusat putaran yang sama.',
    diagramType: 'roda-sepusat',
    question:
      'Pernyataan analisis yang paling tepat mengenai perbandingan besaran gerak antara Dita dan Bima adalah ....',
    options: [
      'Kecepatan sudut Dita dua kali kecepatan sudut Bima, sedangkan kecepatan linearnya sama',
      'Kecepatan sudut Dita sama dengan Bima, sedangkan kecepatan linear dan percepatan sentripetal Dita dua kali Bima',
      'Kecepatan sudut dan kecepatan linear Dita sama dengan Bima karena berada pada satu wahana',
      'Kecepatan linear Dita setengah kali Bima, sedangkan percepatan sentripetalnya empat kali Bima',
      'Percepatan sentripetal Dita empat kali percepatan sentripetal Bima karena jari-jarinya dua kali lebih besar',
    ],
    correctIndex: 1,
    explanation:
      'Karena Dita dan Bima berada pada piringan komidi putar yang satu poros (sepusat), maka kecepatan sudut keduanya sama (ω_Dita = ω_Bima). Dengan v = ωr dan r_Dita = 2 r_Bima, diperoleh v_Dita = 2 v_Bima. Demikian pula aₛ = ω²r menghasilkan aₛ,Dita = 2 aₛ,Bima.',
    explanationLatex:
      '\\omega_{\\text{Dita}} = \\omega_{\\text{Bima}} \\implies \\frac{v_{\\text{Dita}}}{v_{\\text{Bima}}} = \\frac{r_{\\text{Dita}}}{r_{\\text{Bima}}} = 2, \\quad \\frac{a_{s,\\text{Dita}}}{a_{s,\\text{Bima}}} = \\frac{\\omega^2 r_{\\text{Dita}}}{\\omega^2 r_{\\text{Bima}}} = 2',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Salah mengira benda seporos memiliki v sama bukan ω sama.'},
      {optionLabel: 'Opsi B (Benar)', reason: 'Tepat menerapkan prinsip seporos (ω sama) serta hubungan v = ωr dan aₛ = ω²r.'},
      {optionLabel: 'Opsi C', reason: 'Mengabaikan pengaruh jari-jari r terhadap kecepatan linear v.'},
      {optionLabel: 'Opsi D', reason: 'Terbalik membandingkan jari-jari dan mengira aₛ ∝ r².'},
      {optionLabel: 'Opsi E', reason: 'Keliru menggunakan aₛ = v²/r dengan menganggap v sama, padahal pada ω tetap berlaku aₛ = ω²r (sebanding lurus dengan r).'},
    ],
    sourceAlignment: 'Modul Hal. 14, 17, 27 (Hubungan v = ωr & Sepusat)',
  },
  {
    id: 3,
    title: 'Lintasan Lari Stadion',
    contextTag: 'Perpindahan Sudut & Konversi Satuan',
    stimulusNarrative:
      'Seorang pelari SMA Dharma Karya UT berlatih di lintasan lari melingkar dengan jari-jari 35 meter. Dari garis start, pelari tersebut menempuh panjang lintasan busur sejauh 110 meter (gunakan π = 22/7 dan 1 rad = 57,3°).',
    diagramType: 'none',
    question:
      'Perpindahan sudut yang ditempuh pelari tersebut dalam satuan radian dan derajat adalah ....',
    options: [
      '0,32 rad dan 18,3°',
      '1,57 rad dan 90°',
      '3,14 rad dan 180°',
      '6,28 rad dan 360°',
      '3,85 rad dan 220,6°',
    ],
    correctIndex: 2,
    explanation:
      'Gunakan hubungan perpindahan linear dan sudut θ = x / r = 110 m / 35 m = 22/7 rad = π rad ≈ 3,14 rad. Karena π rad = 180° (atau 3,14 × 57,3° ≈ 180°), pelari telah menempuh setengah putaran penuh.',
    explanationLatex:
      '\\theta = \\frac{x}{r} = \\frac{110}{35} = \\frac{22}{7}\\text{ rad} \\approx 3{,}14\\text{ rad} = 180^\\circ',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Terbalik membagi r/x (35/110 = 0,32 rad).'},
      {optionLabel: 'Opsi B', reason: 'Menggunakan diameter 70 m bukan jari-jari 35 m (110/70 = 1,57 rad).'},
      {optionLabel: 'Opsi C (Benar)', reason: 'Tepat menghitung θ = x/r = 110/35 = 3,14 rad = 180°.'},
      {optionLabel: 'Opsi D', reason: 'Nilai satu putaran penuh (keliling = 220 m), bukan jarak tempuh 110 m.'},
      {optionLabel: 'Opsi E', reason: 'Kesalahan aritmetika mengalikan 110 × 35 / 1000.'},
    ],
    sourceAlignment: 'Modul Hal. 11–12 (Perpindahan Sudut & Contoh Soal Hal. 12)',
  },
  {
    id: 4,
    title: 'Analisis Data Eksperimen Roda Mandiri',
    contextTag: 'Literasi Data & Tabel Percobaan',
    stimulusNarrative:
      'Sekelompok siswa melakukan percobaan gerak roda sesuai panduan Penugasan Mandiri modul. Mereka menggelindingkan tiga roda berbeda masing-masing sebanyak 5 putaran penuh (θ = 10π rad) dan mencatat hasilnya pada tabel berikut:',
    diagramType: 'table-data',
    tableHeaders: ['Roda', 'Jari-Jari r (m)', 'Jumlah Putaran (n)', 'Waktu Total t (s)', 'Panjang Lintasan S (m)'],
    tableRows: [
      ['Roda A', '0,10', '5', '5,0', 'π (≈ 3,14)'],
      ['Roda B', '0,20', '5', '10,0', '2π (≈ 6,28)'],
      ['Roda C', '0,15', '5', '5,0', '1,5π (≈ 4,71)'],
    ],
    question:
      'Berdasarkan analisis tabel data di atas, kesimpulan fisis manakah yang paling tepat?',
    options: [
      'Roda A dan Roda B memiliki kecepatan sudut yang sama besar karena jumlah putarannya sama',
      'Roda A dan Roda B memiliki kelajuan linear yang sama, tetapi kecepatan sudut Roda A dua kali Roda B',
      'Roda C memiliki kelajuan linear paling kecil karena waktu tempuhnya lebih singkat daripada Roda B',
      'Periode Roda B lebih kecil daripada periode Roda A karena jari-jari Roda B lebih besar',
      'Hasil bagi S/θ untuk ketiga roda bernilai sama karena semuanya berputar 5 kali',
    ],
    correctIndex: 1,
    explanation:
      'Hitung untuk tiap roda: Roda A: v_A = π/5 = 0,2π m/s, ω_A = 10π/5 = 2π rad/s. Roda B: v_B = 2π/10 = 0,2π m/s, ω_B = 10π/10 = π rad/s. Roda C: v_C = 1,5π/5 = 0,3π m/s, ω_C = 2π rad/s. Jadi v_A = v_B dan ω_A = 2ω_B.',
    explanationLatex:
      'v_A = \\frac{\\pi}{5} = 0{,}2\\pi\\text{ m/s}, \\quad v_B = \\frac{2\\pi}{10} = 0{,}2\\pi\\text{ m/s}, \\quad \\omega_A = 2\\pi\\text{ rad/s} = 2\\omega_B',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Mengabaikan waktu tempuh t yang berbeda antara Roda A (5 s) dan B (10 s).'},
      {optionLabel: 'Opsi B (Benar)', reason: 'Analisis rasio S/t dan θ/t dari tabel data tepat.'},
      {optionLabel: 'Opsi C', reason: 'Sebaliknya, Roda C justru memiliki v paling besar (0,3π m/s).'},
      {optionLabel: 'Opsi D', reason: 'T_B = 10/5 = 2 s justru lebih besar dari T_A = 5/5 = 1 s.'},
      {optionLabel: 'Opsi E', reason: 'Hasil bagi S/θ sama dengan jari-jari r masing-masing roda, sehingga nilainya berbeda (0,10 m; 0,20 m; 0,15 m).'},
    ],
    sourceAlignment: 'Modul Hal. 20–21 (Penugasan Mandiri Analisis Data Roda)',
  },
  {
    id: 5,
    title: 'Keselamatan Tikungan Jalan Tol',
    contextTag: 'Penerapan Percepatan & Gaya Sentripetal',
    stimulusNarrative:
      'Sebuah tikungan jalan layang berbentuk busur lingkaran dengan jari-jari kelengkungan 40 m. Berdasarkan kondisi permukaan aspal kering, batas percepatan sentripetal aman agar kendaraan tidak tergelincir keluar lintasan adalah 2,5 m/s². Sebuah mobil bermassa 1.200 kg melintasi tikungan tersebut.',
    diagramType: 'none',
    question:
      'Kelajuan maksimum yang aman bagi mobil tersebut dan gaya sentripetal yang bekerja saat melaju pada batas aman adalah ....',
    options: [
      'v = 10 m/s (36 km/jam) dan Fₛ = 3.000 N',
      'v = 100 m/s (360 km/jam) dan Fₛ = 3.000 N',
      'v = 10 m/s (36 km/jam) dan Fₛ = 480 N',
      'v = 16 m/s (57,6 km/jam) dan Fₛ = 3.000 N',
      'v = 8 m/s (28,8 km/jam) dan Fₛ = 1.920 N',
    ],
    correctIndex: 0,
    explanation:
      'Dari persamaan percepatan sentripetal aₛ = v²/r, diperoleh v = √(aₛ · r) = √(2,5 × 40) = √100 = 10 m/s (= 36 km/jam). Gaya sentripetalnya Fₛ = m · aₛ = 1.200 × 2,5 = 3.000 N.',
    explanationLatex:
      'v = \\sqrt{a_s \\cdot r} = \\sqrt{2{,}5 \\times 40} = 10\\text{ m/s} = 36\\text{ km/jam}, \\qquad F_s = m a_s = 1200 \\times 2{,}5 = 3000\\text{ N}',
    distractorAnalysis: [
      {optionLabel: 'Opsi A (Benar)', reason: 'Tepat mengakarkan aₛ·r dan menghitung Fₛ = m·aₛ.'},
      {optionLabel: 'Opsi B', reason: 'Lupa mengakarkan hasil v² = 100.'},
      {optionLabel: 'Opsi C', reason: 'Keliru membagi massa dengan percepatan sentripetal (1200/2,5 = 480).'},
      {optionLabel: 'Opsi D', reason: 'Keliru membagi r/aₛ (40/2,5 = 16).'},
      {optionLabel: 'Opsi E', reason: 'Kesalahan penentuan akar dan substitusi gaya sentripetal.'},
    ],
    sourceAlignment: 'Modul Hal. 14–15 (Percepatan & Gaya Sentripetal)',
  },
  {
    id: 6,
    title: 'Percepatan Bilah Kincir Angin',
    contextTag: 'Percepatan Sudut & Percepatan Tangensial',
    stimulusNarrative:
      'Sebuah turbin kincir angin pembangkit listrik memiliki panjang bilah 2,0 meter dari poros putarnya. Mula-mula angin bertiup pelan sehingga kincir berputar dengan kecepatan sudut 4 rad/s. Ketika angin bertiup lebih kencang selama 6 sekon, kecepatan sudut kincir meningkat secara teratur menjadi 16 rad/s.',
    diagramType: 'gmb-vectors',
    question:
      'Besar percepatan sudut kincir dan percepatan tangensial pada titik ujung bilah selama selang waktu tersebut berturut-turut adalah ....',
    options: [
      '2 rad/s² dan 1 m/s²',
      '2 rad/s² dan 4 m/s²',
      '4 rad/s² dan 8 m/s²',
      '3,33 rad/s² dan 6,67 m/s²',
      '12 rad/s² dan 24 m/s²',
    ],
    correctIndex: 1,
    explanation:
      'Percepatan sudut α = (ω₂ − ω₁)/Δt = (16 − 4)/6 = 12/6 = 2 rad/s². Percepatan tangensial di ujung bilah (R = 2,0 m) adalah aₜ = α · R = 2 × 2,0 = 4 m/s².',
    explanationLatex:
      '\\alpha = \\frac{16 - 4}{6} = 2\\text{ rad/s}^2, \\qquad a_t = \\alpha R = 2 \\times 2{,}0 = 4\\text{ m/s}^2',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Keliru membagi α dengan R (2/2 = 1) bukan mengalikan α·R.'},
      {optionLabel: 'Opsi B (Benar)', reason: 'Tepat menghitung α = Δω/Δt dan aₜ = αR.'},
      {optionLabel: 'Opsi C', reason: 'Mengambil nilai ω₁ = 4 rad/s sebagai nilai α.'},
      {optionLabel: 'Opsi D', reason: 'Menjumlahkan ω₂ + ω₁ = 20 lalu dibagi 6.'},
      {optionLabel: 'Opsi E', reason: 'Lupa membagi Δω = 12 dengan selang waktu 6 sekon.'},
    ],
    sourceAlignment: 'Modul Hal. 14–18 (Percepatan Sudut & Tangensial)',
  },
  {
    id: 7,
    title: 'Transmisi Sepeda Ontel',
    contextTag: 'Gabungan Hubungan Rantai & Sepusat',
    stimulusNarrative:
      'Pak Budi mengendarai sepeda ontel menuju sekolah. Sistem penggerak sepeda terdiri atas gir depan berjari-jari R₁ = 12 cm yang dihubungkan rantai ke gir belakang berjari-jari R₂ = 4 cm. Gir belakang terpasang seporos dengan roda belakang yang berjari-jari R₃ = 32 cm. Jika Pak Budi mengayuh sehingga gir depan berputar dengan kecepatan sudut 5 rad/s,',
    diagramType: 'tiga-roda-kombinasi',
    question:
      'Kelajuan linear sepeda di jalan raya adalah ....',
    options: [
      '0,6 m/s',
      '1,6 m/s',
      '3,2 m/s',
      '4,8 m/s',
      '9,6 m/s',
    ],
    correctIndex: 3,
    explanation:
      'Gir 1 dan gir 2 dihubungkan rantai sehingga v₂ = v₁ = ω₁ R₁ = 5 × 0,12 = 0,6 m/s. Kecepatan sudut gir belakang adalah ω₂ = v₂ / R₂ = 0,6 / 0,04 = 15 rad/s. Karena gir 2 dan roda 3 seporos, maka ω₃ = ω₂ = 15 rad/s. Kelajuan sepeda sama dengan kelajuan linear tepi roda 3: v₃ = ω₃ R₃ = 15 × 0,32 = 4,8 m/s.',
    explanationLatex:
      'v_1 = v_2 = 5(0{,}12) = 0{,}6\\text{ m/s} \\implies \\omega_2 = \\omega_3 = \\frac{0{,}6}{0{,}04} = 15\\text{ rad/s} \\implies v_3 = 15(0{,}32) = 4{,}8\\text{ m/s}',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Baru menghitung kecepatan linear gir depan/belakang (0,6 m/s), belum ke roda belakang.'},
      {optionLabel: 'Opsi B', reason: 'Menganggap kecepatan sudut roda 3 sama dengan gir depan (5 × 0,32 = 1,6 m/s).'},
      {optionLabel: 'Opsi C', reason: 'Salah rasio jari-jari gir 1 dan gir 2 (menganggap rasio 2:1 bukan 3:1).'},
      {optionLabel: 'Opsi D (Benar)', reason: 'Analisis dua tahap (rantai lalu seporos) akurat sepenuhnya.'},
      {optionLabel: 'Opsi E', reason: 'Menggunakan diameter 64 cm sebagai jari-jari R₃.'},
    ],
    sourceAlignment: 'Modul Hal. 26–29 (Sistem Sepeda Ontel, Sepusat & Rantai)',
  },
  {
    id: 8,
    title: 'Roda Gigi Jam Dinding Analog',
    contextTag: 'Hubungan Roda Bersinggungan',
    stimulusNarrative:
      'Di dalam mekanisme jam dinding analog terdapat dua roda bergerigi yang saling bersinggungan langsung tanpa slip. Roda A memiliki 20 gigi dan digerakkan oleh motor kecil searah jarum jam dengan kecepatan sudut 18 rad/s, sedangkan roda B memiliki 60 gigi.',
    diagramType: 'roda-singgung',
    question:
      'Besar dan arah kecepatan sudut roda B adalah ....',
    options: [
      '6 rad/s searah jarum jam',
      '6 rad/s berlawanan arah jarum jam',
      '18 rad/s berlawanan arah jarum jam',
      '54 rad/s searah jarum jam',
      '54 rad/s berlawanan arah jarum jam',
    ],
    correctIndex: 1,
    explanation:
      'Pada dua roda bersinggungan, arah putarnya selalu berlawanan (karena roda A searah jarum jam, maka roda B berlawanan arah jarum jam). Kelajuan linear titik singgung sama (v_A = v_B), dan karena jari-jari sebanding dengan jumlah gigi (N), berlaku ω_A N_A = ω_B N_B → 18 × 20 = ω_B × 60 → ω_B = 6 rad/s.',
    explanationLatex:
      '\\omega_A N_A = \\omega_B N_B \\implies 18 \\times 20 = \\omega_B \\times 60 \\implies \\omega_B = 6\\text{ rad/s (berlawanan arah jarum jam)}',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Nilai besar ω_B benar, namun keliru menentukan arah putar roda bersinggungan (seharusnya berlawanan).'},
      {optionLabel: 'Opsi B (Benar)', reason: 'Besar kecepatan sudut (6 rad/s) dan arah putar berlawanan tepat.'},
      {optionLabel: 'Opsi C', reason: 'Mengira kecepatan sudut roda bersinggungan sama (18 rad/s).'},
      {optionLabel: 'Opsi D', reason: 'Terbalik mengalikan perbandingan 60/20 × 18 = 54 dan arah salah.'},
      {optionLabel: 'Opsi E', reason: 'Terbalik membandingkan jumlah gigi sehingga menghasilkan 54 rad/s.'},
    ],
    sourceAlignment: 'Modul Hal. 30–32 (Roda-Roda Bersinggungan & Jumlah Gigi)',
  },
  {
    id: 9,
    title: 'Konsep Vektor pada Gerak Melingkar Beraturan',
    contextTag: 'Pemecahan Miskonsepsi Konseptual',
    stimulusNarrative:
      'Siti memutar seutas tali yang ujungnya diikat batu kecil secara horizontal di atas kepalanya dengan kelajuan linear tetap 4 m/s. Temannya berpendapat bahwa karena kelajuannya tetap 4 m/s, maka percepatan batu pasti bernilai nol seperti pada Gerak Lurus Beraturan (GLB).',
    diagramType: 'gmb-vectors',
    question:
      'Evaluasi fisika yang paling tepat untuk meluruskan pendapat teman Siti tersebut adalah ....',
    options: [
      'Pendapat tersebut benar karena pada kelajuan tetap tidak ada perubahan kecepatan sama sekali',
      'Pendapat tersebut keliru karena pada GMB terdapat percepatan tangensial yang selalu menuju pusat lingkaran',
      'Pendapat tersebut keliru karena arah vektor kecepatan linear terus berubah setiap saat sehingga muncul percepatan sentripetal menuju pusat lingkaran',
      'Pendapat tersebut benar hanya jika tali diputar searah jarum jam dengan periode kurang dari 1 sekon',
      'Pendapat tersebut keliru karena percepatan sudut (α) pada GMB selalu lebih besar daripada nol',
    ],
    correctIndex: 2,
    explanation:
      'Pada GMB, kelajuan linear (besar kecepatan) memang konstan, namun kecepatan linear adalah besaran vektor yang arahnya selalu berubah menyinggung lintasan di tiap titik. Perubahan arah vektor kecepatan inilah yang menimbulkan percepatan sentripetal (aₛ = v²/r) menuju pusat lingkaran. Sementara percepatan sudut dan percepatan tangensial bernilai nol.',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Miskonsepsi umum yang menyamakan kelajuan skalar dengan vektor kecepatan.'},
      {optionLabel: 'Opsi B', reason: 'Tertukar istilah: yang mengarah ke pusat adalah percepatan sentripetal, bukan tangensial.'},
      {optionLabel: 'Opsi C (Benar)', reason: 'Membedakan dengan tepat antara kelajuan tetap, perubahan arah vektor v, dan munculnya aₛ.'},
      {optionLabel: 'Opsi D', reason: 'Arah putaran dan periode tidak menghilangkan percepatan sentripetal.'},
      {optionLabel: 'Opsi E', reason: 'Pada GMB, percepatan sudut α justru sama dengan nol (ω konstan).'},
    ],
    sourceAlignment: 'Modul Hal. 6, 9, 10, 14 (Ciri Khas GMB)',
  },
  {
    id: 10,
    title: 'Rekayasa Sistem Transmisi Pabrik',
    contextTag: 'Analisis Sistem Tiga Roda',
    stimulusNarrative:
      'Sebuah mesin pengaduk di pabrik menggunakan tiga roda transmisi. Roda A (R_A = 10 cm) dan Roda B (R_B = 30 cm) dipasang pada satu poros yang sama. Roda B bersinggungan langsung dengan Roda C (R_C = 15 cm). Motor penggerak memutar Roda A searah jarum jam dengan kecepatan sudut 6 rad/s.',
    diagramType: 'none',
    question:
      'Frekuensi dan arah putar Roda C yang dihasilkan oleh sistem transmisi tersebut adalah ....',
    options: [
      '3/π Hz searah jarum jam',
      '6/π Hz searah jarum jam',
      '6/π Hz berlawanan arah jarum jam',
      '12/π Hz berlawanan arah jarum jam',
      '2/π Hz berlawanan arah jarum jam',
    ],
    correctIndex: 2,
    explanation:
      'Langkah 1 (A dan B seporos): ω_B = ω_A = 6 rad/s dengan arah sama (searah jarum jam). Langkah 2 (B dan C bersinggungan): arah C berlawanan jarum jam, dan v_C = v_B → ω_C R_C = ω_B R_B → ω_C (15) = 6 (30) → ω_C = 12 rad/s. Langkah 3 (Frekuensi C): f_C = ω_C / (2π) = 12 / (2π) = 6/π Hz.',
    explanationLatex:
      '\\omega_B = \\omega_A = 6\\text{ rad/s} \\implies \\omega_C = \\frac{6 \\times 30}{15} = 12\\text{ rad/s} \\implies f_C = \\frac{\\omega_C}{2\\pi} = \\frac{6}{\\pi}\\text{ Hz}',
    distractorAnalysis: [
      {optionLabel: 'Opsi A', reason: 'Mengambil ω_A = 6 rad/s langsung sebagai ω_C lalu dibagi 2π.'},
      {optionLabel: 'Opsi B', reason: 'Besar frekuensi benar, namun lupa bahwa roda bersinggungan membalik arah putaran.'},
      {optionLabel: 'Opsi C (Benar)', reason: 'Menghitung ω_B, ω_C, f_C dan arah putar berlawanan dengan tepat.'},
      {optionLabel: 'Opsi D', reason: 'Lupa membagi ω_C = 12 dengan angka 2 pada rumus ω = 2πf.'},
      {optionLabel: 'Opsi E', reason: 'Salah menggunakan persamaan sepusat untuk B dan C.'},
    ],
    sourceAlignment: 'Modul Hal. 27–34 (Kombinasi Hubungan Roda-Roda)',
  },
];

export const EVAL_QUESTIONS: EvalQuestion[] = [
  {
    id: 1,
    question:
      'Jika sebuah roda katrol berputar 60 putaran tiap dua menit, maka frekuensi dan kecepatan sudut roda adalah ....',
    diagramType: 'none',
    options: [
      '0,5 Hz dan 6,28 rad/s',
      '0,5 Hz dan 3,14 rad/s',
      '0,8 Hz dan 6,28 rad/s',
      '0,8 Hz dan 3,14 rad/s',
      '1 Hz dan 3,14 rad/s',
    ],
    correctIndex: 1,
    explanation:
      'n = 60 putaran, t = 2 menit = 120 s. Frekuensi f = n/t = 60/120 = 0,5 Hz. Kecepatan sudut ω = 2πf = 2 × 3,14 × 0,5 = 3,14 rad/s.',
    explanationLatex: 'f = \\frac{60}{120} = 0{,}5\\text{ Hz}, \\quad \\omega = 2(3{,}14)(0{,}5) = 3{,}14\\text{ rad/s}',
    sourcePage: 'Evaluasi No. 1 (Hal. 36, Kunci: B)',
  },
  {
    id: 2,
    question:
      'Arus sungai dengan kelajuan 18,94 m/s digunakan untuk memutar kincir air. Diameter kincir air tersebut adalah 120 cm. Dalam 1 menit, kincir air akan berputar sebanyak ... kali.',
    diagramType: 'none',
    options: ['108,1', '201,8', '301,6', '310,6', '312,6'],
    correctIndex: 2,
    explanation:
      'Diameter d = 120 cm = 1,2 m, waktu t = 1 menit = 60 s, v = 18,94 m/s. Jarak tempuh s = v × t = 18,94 × 60 = 1.136,4 m. Banyak putaran n = s / (πd) = 1.136,4 / (3,14 × 1,2) = 1.136,4 / 3,768 = 301,59 ≈ 301,6 kali.',
    explanationLatex: 'n = \\frac{v \\cdot t}{\\pi d} = \\frac{18{,}94 \\times 60}{3{,}14 \\times 1{,}2} \\approx 301{,}6\\text{ kali}',
    sourcePage: 'Evaluasi No. 2 (Hal. 36, Kunci: C)',
  },
  {
    id: 3,
    question:
      'Sebuah roda berdiameter 1 m melakukan 120 putaran per menit. Kecepatan linier suatu titik pada roda tersebut adalah ....',
    diagramType: 'none',
    options: ['½ π m/s', 'π m/s', '2 π m/s', '4 π m/s', '6 π m/s'],
    correctIndex: 2,
    explanation:
      'd = 1 m → r = 0,5 m. f = 120 putaran / 60 s = 2 Hz. Kecepatan linear v = 2πrf = 2 × π × 0,5 × 2 = 2π m/s.',
    explanationLatex: 'v = 2\\pi r f = 2\\pi(0{,}5)(2) = 2\\pi\\text{ m/s}',
    sourcePage: 'Evaluasi No. 3 (Hal. 36, Kunci: PDF tertulis D, hitungan fisika = C)',
    pdfNote:
      'Catatan jujur atas PDF sumber (hal. 38): Kunci jawaban pada modul tertulis 3.D (4π m/s) kemungkinan karena menggunakan r = 1 m, padahal soal menyebut diameter 1 m (r = 0,5 m) sehingga nilai fisika yang tepat adalah 2π m/s (Opsi C).',
  },
  {
    id: 4,
    question:
      'Sebuah titik bergerak melingkar beraturan dengan jari-jari lingkaran 50 cm dan melakukan 12 putaran dalam 6 menit. Frekuensi dan kecepatan linear titik tersebut adalah ....',
    diagramType: 'none',
    options: [
      '1/30 Hz dan (1/30)π m/s',
      '1/30 Hz dan (1/40)π m/s',
      '1/40 Hz dan (1/30)π m/s',
      '1/40 Hz dan (1/40)π m/s',
      '1/20 Hz dan (1/30)π m/s',
    ],
    correctIndex: 0,
    explanation:
      'r = 50 cm = 0,5 m; n = 12 putaran; t = 6 menit = 360 s. Frekuensi f = 12/360 = 1/30 Hz. Kecepatan linear v = 2πrf = 2π(0,5)(1/30) = (1/30)π m/s.',
    explanationLatex: 'f = \\frac{12}{360} = \\frac{1}{30}\\text{ Hz}, \\quad v = 2\\pi(0{,}5)\\left(\\frac{1}{30}\\right) = \\frac{1}{30}\\pi\\text{ m/s}',
    sourcePage: 'Evaluasi No. 4 (Hal. 36, Kunci: A)',
  },
  {
    id: 5,
    question:
      'Benda yang bergerak melingkar memiliki kecepatan sudut tetap 120 rpm. Dalam 10 detik benda tersebut telah menempuh sudut sebesar ....',
    diagramType: 'none',
    options: ['4π rad', '4 rad', '40π rad', '120 rad', '1200 rad'],
    correctIndex: 2,
    explanation:
      'ω = 120 rpm = (120 × 2π) / 60 rad/s = 4π rad/s. Dalam t = 10 s, perpindahan sudut θ = ω × t = 4π × 10 = 40π rad.',
    explanationLatex: '\\omega = \\frac{120 \\times 2\\pi}{60} = 4\\pi\\text{ rad/s} \\implies \\theta = \\omega t = 4\\pi(10) = 40\\pi\\text{ rad}',
    sourcePage: 'Evaluasi No. 5 (Hal. 36, Kunci: C)',
  },
  {
    id: 6,
    question:
      'Tali melilit pada roda berjari-jari R = 25 cm seperti gambar. Jika suatu titik pada tali itu (titik A) mempunyai kecepatan 5 m/s, maka kecepatan rotasi roda adalah ....',
    diagramType: 'tali-lilit',
    options: ['0,2 rad/s', '5 rad/s', '50 rad/s', '20 rad/s', '200 rad/s'],
    correctIndex: 3,
    explanation:
      'R = 25 cm = 0,25 m dan kecepatan linear tali v = 5 m/s. Kecepatan rotasi (kecepatan sudut) roda adalah ω = v / R = 5 / 0,25 = 20 rad/s.',
    explanationLatex: '\\omega = \\frac{v}{R} = \\frac{5}{0{,}25} = 20\\text{ rad/s}',
    sourcePage: 'Evaluasi No. 6 (Hal. 37, Kunci: D)',
  },
  {
    id: 7,
    question:
      'Untuk sistem roda seperti pada gambar di bawah, R_A = 50 cm, R_B = 20 cm, R_C = 10 cm. Jika roda A memiliki kelajuan linier 1 m/s maka kecepatan sudut roda C dalam rad/s adalah ....',
    diagramType: 'tiga-roda-kombinasi',
    options: ['0,25', '1,5', '25', '4', '8'],
    correctIndex: 3,
    explanation:
      'Roda A dan B sepusat: ω_B = ω_A = v_A / R_A = 1 / 0,5 = 2 rad/s. Kelajuan linear roda B: v_B = ω_B × R_B = 2 × 0,2 = 0,4 m/s. Roda B dan C dihubungkan sabuk: v_C = v_B = 0,4 m/s, sehingga ω_C = v_C / R_C = 0,4 / 0,1 = 4 rad/s.',
    explanationLatex: '\\omega_A = \\omega_B = \\frac{1}{0{,}5} = 2\\text{ rad/s} \\implies v_B = v_C = 2(0{,}2) = 0{,}4\\text{ m/s} \\implies \\omega_C = \\frac{0{,}4}{0{,}1} = 4\\text{ rad/s}',
    sourcePage: 'Evaluasi No. 7 (Hal. 37, Kunci: D)',
  },
  {
    id: 8,
    question:
      'Benda A dan B bermassa sama 0,5 kg, diikatkan pada tali secara berurutan seperti gambar, lalu diputar sehingga melakukan gerak melingkar beraturan secara horizontal dengan kecepatan di ujung luar tali 3 m/s. Bila OA = 1 m dan AB = 2 m, maka perbandingan tegangan tali yang terjadi pada tali AB dengan OA adalah ....',
    diagramType: 'tali-dua-benda',
    options: ['1', '½', '2/3', '¾', '3/2'],
    correctIndex: 3,
    explanation:
      'Benda A (R_A = OA = 1 m) dan B (R_B = OA + AB = 3 m) berputar seporos sehingga ω_A = ω_B = ω. Gaya sentripetal pada B hanya berasal dari T_AB: T_AB = m ω² R_B = 3 m ω². Pada A, resultan gaya menuju pusat O adalah T_OA − T_AB = m ω² R_A = 1 m ω², sehingga T_OA = 4 m ω². Maka T_AB : T_OA = 3 : 4 (3/4).',
    explanationLatex: 'T_{AB} = m\\omega^2(3), \\quad T_{OA} - T_{AB} = m\\omega^2(1) \\implies T_{OA} = 4m\\omega^2 \\implies \\frac{T_{AB}}{T_{OA}} = \\frac{3}{4}',
    sourcePage: 'Evaluasi No. 8 (Hal. 37, Kunci PDF: B, hitungan fisika = D)',
    pdfNote:
      'Catatan jujur atas PDF sumber (hal. 38): Kunci jawaban pada PDF tertulis 8.B (½), namun secara hukum II Newton untuk gerak melingkar dua benda seporos, T_AB = 3mω² dan T_OA = T_AB + mω² = 4mω² sehingga T_AB/T_OA = 3/4 (Opsi D).',
  },
  {
    id: 9,
    question:
      'Jika roda A (R_A = 10 cm) berputar dengan kecepatan sudut 8 rad/s dan dihubungkan rantai ke roda B (R_B = 20 cm), kecepatan sudut roda B adalah ....',
    diagramType: 'roda-rantai',
    options: ['16 rad/s', '8 rad/s', '8 m/s', '4 rad/s', '4 m/s'],
    correctIndex: 3,
    explanation:
      'Roda A dan B dihubungkan rantai sehingga kelajuan linearnya sama: v_A = v_B → ω_A R_A = ω_B R_B → 8 × 10 = ω_B × 20 → ω_B = 4 rad/s.',
    explanationLatex: '\\omega_A R_A = \\omega_B R_B \\implies 8(10) = \\omega_B(20) \\implies \\omega_B = 4\\text{ rad/s}',
    sourcePage: 'Evaluasi No. 9 (Hal. 37, Kunci: D)',
  },
  {
    id: 10,
    question:
      'Empat buah roda disusun seperti gambar (roda I dan II sepusat; roda II dihubungkan sabuk dengan roda III; roda II bersinggungan dengan roda IV). Pernyataan yang benar adalah ....',
    diagramType: 'empat-roda',
    options: [
      'kecepatan sudut roda I dan II sama',
      'kecepatan sudut roda II dan IV sama',
      'kecepatan sudut roda I dan III sama',
      'kecepatan linear roda III dan IV sama',
      'kecepatan linear roda II dan III sama',
    ],
    correctIndex: 0,
    explanation:
      'Roda I dan roda II berada pada satu poros (sepusat), sehingga kecepatan sudut keduanya sama (ω_I = ω_II). Catatan: pada gambar modul hal. 37, sabuk terhubung pada tepi roda II dan III serta roda II bersinggungan dengan IV, maka v_II = v_III = v_IV juga berlaku sehingga opsi A (ω_I = ω_II) dan E (v_II = v_III) sama-sama konsisten dengan gambar, namun kunci resmi modul menetapkan A.',
    explanationLatex: '\\text{Roda I dan II sepusat } \\implies \\omega_{\\text{I}} = \\omega_{\\text{II}}',
    sourcePage: 'Evaluasi No. 10 (Hal. 37, Kunci: A)',
  },
];

export const SELF_ASSESSMENT_KP1 = [
  {id: 'kp1-1', text: 'Saya mampu menyebutkan definisi dan contoh gerak melingkar dalam kehidupan sehari-hari'},
  {id: 'kp1-2', text: 'Saya mampu menentukan periode dan frekuensi gerak melingkar'},
  {id: 'kp1-3', text: 'Saya mampu menentukan kecepatan linear dan kecepatan sudut gerak melingkar'},
  {id: 'kp1-4', text: 'Saya mampu menentukan percepatan sentripetal dan gaya sentripetal'},
  {id: 'kp1-5', text: 'Saya mampu menentukan percepatan tangensial gerak melingkar'},
  {id: 'kp1-6', text: 'Saya mampu menganalisis hubungan antara gerak lurus dengan gerak melingkar'},
];

export const SELF_ASSESSMENT_KP2 = [
  {id: 'kp2-1', text: 'Saya dapat menganalisis sistem gerak melingkar beraturan pada hubungan antar roda sepusat'},
  {id: 'kp2-2', text: 'Saya dapat menganalisis sistem gerak melingkar beraturan pada hubungan antar roda dihubungkan dengan rantai'},
  {id: 'kp2-3', text: 'Saya dapat menganalisis sistem gerak melingkar beraturan pada hubungan antar roda yang bersinggungan'},
];
