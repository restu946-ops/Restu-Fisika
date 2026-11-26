import {useMemo, useState} from 'react';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Dices,
  ExternalLink,
  Gamepad2,
  GripVertical,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import {MathFormula} from './MathFormula';

interface EducationalGamesProps {
  onRecordScore: (
    gameKey: 'dragDropBest' | 'wordSearchBest' | 'orderingBest' | 'boardGameBest' | 'phetExplored',
    value: number | boolean,
  ) => void;
  onLogHistory: (title: string, score: number, maxScore: number) => void;
}

// ==========================================
// GAME 1: DRAG & DROP / CLICK-TO-MATCH
// ==========================================
interface MatchItem {
  id: string;
  label: string;
  targetId: string;
}

interface MatchTarget {
  id: string;
  prompt: string;
  hint: string;
}

const MATCH_TARGETS: MatchTarget[] = [
  {id: 't-periode', prompt: 'Periode (T)', hint: 'Waktu 1 putaran penuh (satuan s)'},
  {id: 't-omega', prompt: 'Kecepatan Sudut (ω)', hint: 'Sudut tempuh tiap sekon (rad/s)'},
  {id: 't-sentripetal', prompt: 'Percepatan Sentripetal (aₛ)', hint: 'Mengarah ke pusat lingkaran'},
  {id: 't-sepusat', prompt: 'Roda-Roda Sepusat', hint: 'Arah putar searah, poros sama'},
  {id: 't-rantai', prompt: 'Roda-Roda Sabuk / Rantai', hint: 'Arah putar searah, kelajuan tepi sama'},
  {id: 't-singgung', prompt: 'Roda-Roda Bersinggungan', hint: 'Arah putar berlawanan, v sama'},
];

const INITIAL_MATCH_ITEMS: MatchItem[] = [
  {id: 'm1', label: 'T = t / n = 1 / f', targetId: 't-periode'},
  {id: 'm2', label: 'ω = 2π / T = 2π f', targetId: 't-omega'},
  {id: 'm3', label: 'aₛ = v² / r = ω² r', targetId: 't-sentripetal'},
  {id: 'm4', label: 'ωₐ = ωᵦ  (vₐ/Rₐ = vᵦ/Rᵦ)', targetId: 't-sepusat'},
  {id: 'm5', label: 'vₐ = vᵦ  (searah jarum jam)', targetId: 't-rantai'},
  {id: 'm6', label: 'vₐ = vᵦ  (arah putar berlawanan)', targetId: 't-singgung'},
];

function DragDropMatchGame({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const [shuffledItems] = useState<MatchItem[]>(() =>
    [...INITIAL_MATCH_ITEMS].sort((a, b) => a.label.localeCompare(b.label)),
  );
  const [placements, setPlacements] = useState<Record<string, string | null>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const placedItemIds = new Set(Object.values(placements).filter(Boolean) as string[]);
  const availableItems = shuffledItems.filter((item) => !placedItemIds.has(item.id));

  const placeItemOnTarget = (targetId: string, itemId: string) => {
    setChecked(false);
    setPlacements((prev) => {
      const next = {...prev};
      // Remove item from any previous target
      Object.keys(next).forEach((k) => {
        if (next[k] === itemId) next[k] = null;
      });
      next[targetId] = itemId;
      return next;
    });
    setSelectedItemId(null);
  };

  const handleCheck = () => {
    setChecked(true);
    let correct = 0;
    MATCH_TARGETS.forEach((t) => {
      const placed = placements[t.id];
      const item = INITIAL_MATCH_ITEMS.find((i) => i.id === placed);
      if (item && item.targetId === t.id) correct += 1;
    });
    onComplete(correct, MATCH_TARGETS.length);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedItemId(null);
    setChecked(false);
  };

  const correctCount = MATCH_TARGETS.filter((t) => {
    const item = INITIAL_MATCH_ITEMS.find((i) => i.id === placements[t.id]);
    return item && item.targetId === t.id;
  }).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Pasangkan Konsep & Rumus Gerak Melingkar
          </h4>
          <p className="text-sm text-slate-600">
            Seret kartu rumus ke kotak konsep yang tepat, atau klik kartu lalu klik kotak tujuannya.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulangi</span>
          </button>
          <button
            type="button"
            onClick={handleCheck}
            disabled={placedItemIds.size < MATCH_TARGETS.length}
            className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Periksa Jawaban</span>
          </button>
        </div>
      </div>

      {/* Draggable bank */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 text-xs font-semibold text-slate-600">
          Kartu Rumus Tersedia ({availableItems.length} tersisa):
        </div>
        {availableItems.length === 0 ? (
          <p className="text-xs text-emerald-700 font-medium">
            Semua kartu sudah ditempatkan. Tekan &quot;Periksa Jawaban&quot; untuk melihat hasilmu!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={() => setDraggingId(item.id)}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-sky-400'
                  }`}
                >
                  <GripVertical className="h-3.5 w-3.5 opacity-60" />
                  <span className="font-mono-tabular">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Target drop zones */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MATCH_TARGETS.map((target) => {
          const placedId = placements[target.id];
          const placedItem = INITIAL_MATCH_ITEMS.find((i) => i.id === placedId);
          const isCorrect = checked && placedItem?.targetId === target.id;
          const isWrong = checked && (!placedItem || placedItem.targetId !== target.id);

          return (
            <div
              key={target.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggingId) placeItemOnTarget(target.id, draggingId);
              }}
              onClick={() => {
                if (selectedItemId) {
                  placeItemOnTarget(target.id, selectedItemId);
                } else if (placedId && !checked) {
                  setPlacements((prev) => ({...prev, [target.id]: null}));
                }
              }}
              className={`rounded-2xl border-2 p-4 transition cursor-pointer ${
                isCorrect
                  ? 'border-emerald-500 bg-emerald-50/70'
                  : isWrong
                  ? 'border-rose-400 bg-rose-50/70'
                  : selectedItemId
                  ? 'border-dashed border-sky-500 bg-sky-50/40'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-slate-900">{target.prompt}</div>
                  <div className="text-xs text-slate-500">{target.hint}</div>
                </div>
                {checked && (
                  isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Benar
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                      <XCircle className="h-4 w-4" /> Keliru
                    </span>
                  )
                )}
              </div>

              <div className="mt-3 min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center justify-between">
                {placedItem ? (
                  <>
                    <span className="font-mono-tabular text-xs font-bold text-slate-900">
                      {placedItem.label}
                    </span>
                    {!checked && (
                      <span className="text-[11px] text-slate-500">Klik untuk lepas</span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-slate-400">
                    {selectedItemId ? 'Klik di sini untuk meletakkan kartu' : 'Letakkan kartu rumus di sini'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {checked && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-sky-950">
            Skor Pasangkan Konsep: <span className="font-mono-tabular font-bold">{correctCount} / {MATCH_TARGETS.length}</span> benar!
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
          >
            Main Lagi
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// GAME 2: WORD SEARCH (CARI KATA FISIKA)
// ==========================================
const WS_WORDS = [
  'SENTRIPETAL',
  'TANGENSIAL',
  'FREKUENSI',
  'PERIODE',
  'SEPOROS',
  'RADIAN',
  'ANGULER',
  'RANTAI',
];

// Carefully verified 12x12 grid with zero letter collisions
const WS_GRID: string[][] = [
  ['S', 'E', 'N', 'T', 'R', 'I', 'P', 'E', 'T', 'A', 'L', 'K'],
  ['M', 'B', 'C', 'D', 'G', 'H', 'J', 'L', 'Q', 'W', 'Z', 'A'],
  ['P', 'T', 'A', 'N', 'G', 'E', 'N', 'S', 'I', 'A', 'L', 'N'],
  ['V', 'X', 'Y', 'K', 'M', 'O', 'P', 'R', 'T', 'U', 'B', 'G'],
  ['F', 'R', 'E', 'K', 'U', 'E', 'N', 'S', 'I', 'D', 'C', 'U'],
  ['H', 'J', 'L', 'N', 'Q', 'V', 'W', 'X', 'Y', 'Z', 'M', 'L'],
  ['A', 'B', 'D', 'P', 'E', 'R', 'I', 'O', 'D', 'E', 'G', 'E'],
  ['K', 'M', 'O', 'Q', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'R'],
  ['S', 'E', 'P', 'O', 'R', 'O', 'S', 'Z', 'A', 'B', 'C', 'D'],
  ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'T'],
  ['U', 'V', 'R', 'A', 'D', 'I', 'A', 'N', 'W', 'X', 'Y', 'Z'],
  ['C', 'E', 'G', 'I', 'R', 'A', 'N', 'T', 'A', 'I', 'K', 'M'],
];

function getLineCells(r1: number, c1: number, r2: number, c2: number): [number, number][] | null {
  const dr = r2 - r1;
  const dc = c2 - c1;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [[r1, c1]];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
  const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([r1 + i * stepR, c1 + i * stepC]);
  }
  return cells;
}

function WordSearchGame({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCellKeys, setFoundCellKeys] = useState<Set<string>>(new Set());
  const [statusMsg, setStatusMsg] = useState<string>(
    'Klik huruf PERTAMA lalu klik huruf TERAKHIR suatu kata (mendatar atau menurun).',
  );

  const handleCellClick = (r: number, c: number) => {
    if (!startCell) {
      setStartCell([r, c]);
      setStatusMsg(`Titik awal dipilih (${WS_GRID[r][c]}). Sekarang klik huruf terakhir kata tersebut!`);
      return;
    }

    const [sr, sc] = startCell;
    if (sr === r && sc === c) {
      setStartCell(null);
      setStatusMsg('Pilihan dibatalkan. Klik huruf pertama kata yang ingin dicari.');
      return;
    }

    const line = getLineCells(sr, sc, r, c);
    if (!line) {
      setStartCell(null);
      setStatusMsg('Garis harus lurus (mendatar, menurun, atau diagonal). Coba lagi!');
      return;
    }

    const wordForward = line.map(([lr, lc]) => WS_GRID[lr][lc]).join('');
    const wordBackward = wordForward.split('').reverse().join('');
    const matched = WS_WORDS.find((w) => w === wordForward || w === wordBackward);

    if (matched && !foundWords.includes(matched)) {
      const nextFound = [...foundWords, matched];
      const nextKeys = new Set(foundCellKeys);
      line.forEach(([lr, lc]) => nextKeys.add(`${lr}-${lc}`));
      setFoundWords(nextFound);
      setFoundCellKeys(nextKeys);
      setStartCell(null);
      setStatusMsg(`Hebat! Kamu menemukan kata "${matched}" (${nextFound.length}/${WS_WORDS.length}).`);
      if (nextFound.length === WS_WORDS.length) {
        onComplete(WS_WORDS.length, WS_WORDS.length);
      } else {
        onComplete(nextFound.length, WS_WORDS.length);
      }
    } else if (matched && foundWords.includes(matched)) {
      setStartCell(null);
      setStatusMsg(`Kata "${matched}" sudah ditemukan sebelumnya!`);
    } else {
      setStartCell(null);
      setStatusMsg(`Rangkaian "${wordForward}" belum sesuai daftar istilah. Coba periksa kembali!`);
    }
  };

  const resetGame = () => {
    setStartCell(null);
    setFoundWords([]);
    setFoundCellKeys(new Set());
    setStatusMsg('Permainan diulang. Klik huruf pertama lalu huruf terakhir kata!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">Cari Kata Istilah Gerak Melingkar</h4>
          <p className="text-sm text-slate-600">{statusMsg}</p>
        </div>
        <button
          type="button"
          onClick={resetGame}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Papan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 overflow-x-auto">
          <div className="inline-grid grid-cols-12 gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-2.5">
            {WS_GRID.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const key = `${rIdx}-${cIdx}`;
                const isStart = startCell?.[0] === rIdx && startCell?.[1] === cIdx;
                const isFound = foundCellKeys.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg font-mono-tabular text-xs sm:text-sm font-bold transition ${
                      isStart
                        ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                        : isFound
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-800 hover:bg-sky-100'
                    }`}
                  >
                    {letter}
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Daftar Kata Target</span>
            <span className="font-mono-tabular text-xs font-bold text-sky-700">
              {foundWords.length} / {WS_WORDS.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {WS_WORDS.map((word) => {
              const done = foundWords.includes(word);
              return (
                <div
                  key={word}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                    done
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 line-through'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {word}
                </div>
              );
            })}
          </div>
          {foundWords.length === WS_WORDS.length && (
            <div className="mt-4 rounded-xl bg-emerald-600 p-3 text-xs font-bold text-white text-center">
              Luar biasa! Semua 8 istilah gerak melingkar telah ditemukan!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// GAME 3: MENGURUTKAN LANGKAH PENYELESAIAN
// ==========================================
interface OrderingLevel {
  id: string;
  title: string;
  problem: string;
  correctSteps: string[];
}

const ORDERING_LEVELS: OrderingLevel[] = [
  {
    id: 'lvl-1',
    title: 'Kasus 1: Meja Putar (Hal. 13–14)',
    problem:
      'Balok kecil berada di tepi meja putar berjari-jari R = 0,4 m. Kecepatan sudut awal ω₀ = 20 rad/s berubah menjadi ω = 50 rad/s selama 15 s. Tentukan kecepatan linear akhir balok!',
    correctSteps: [
      'Identifikasi besaran diketahui: R = 0,4 m, ω₀ = 20 rad/s, ω = 50 rad/s, t = 15 s.',
      'Tentukan besaran yang ditanyakan: kecepatan linear akhir (v).',
      'Pilih rumus hubungan besaran sudut dengan linear: v = ω × R.',
      'Substitusikan nilai ke dalam persamaan: v = 50 rad/s × 0,4 m.',
      'Diperoleh hasil akhir kecepatan linear balok: v = 20 m/s.',
    ],
  },
  {
    id: 'lvl-2',
    title: 'Kasus 2: Roda dengan Rantai (Hal. 29)',
    problem:
      'Dua roda dihubungkan rantai. Roda kecil R₁ = 8 cm berputar ω₁ = 100 rad/s. Jika R₂ = 15 cm, tentukan kecepatan sudut roda besar (ω₂)!',
    correctSteps: [
      'Konversi satuan ke SI: R₁ = 8 cm = 0,08 m dan R₂ = 15 cm = 0,15 m; ω₁ = 100 rad/s.',
      'Hitung kecepatan linear roda 1: v₁ = ω₁ × R₁ = 100 × 0,08 = 8 m/s.',
      'Terapkan prinsip roda berantai: kecepatan linear kedua roda sama (v₂ = v₁ = 8 m/s).',
      'Gunakan hubungan v₂ = ω₂ × R₂ sehingga ω₂ = v₂ / R₂ = 8 / 0,15.',
      'Diperoleh kecepatan sudut roda besar: ω₂ = 53,33 rad/s.',
    ],
  },
  {
    id: 'lvl-3',
    title: 'Kasus 3: Percepatan Sentripetal CD (Hal. 15)',
    problem:
      'Titik di tepi CD berjari-jari 4 cm berputar dengan kecepatan sudut 3 rad/s. Hitung percepatan sentripetal titik tersebut!',
    correctSteps: [
      'Catat data dan ubah ke satuan SI: R = 4 cm = 0,04 m dan ω = 3 rad/s.',
      'Tentukan rumus percepatan sentripetal berdasarkan ω dan R: aₛ = ω² × R.',
      'Masukkan angka ke dalam rumus: aₛ = 3² × 0,04.',
      'Hitung kuadrat dan perkaliannya: aₛ = 9 × 0,04.',
      'Simpulkan hasil akhir: aₛ = 0,36 m/s² (atau 36 cm/s²).',
    ],
  },
];

function shuffleDeterministic(arr: string[], seedShift: number): string[] {
  const copy = [...arr];
  // Rotate and swap deterministically so it is never already in solved order
  return [copy[2], copy[0], copy[4], copy[1], copy[3]].map((_, i, a) => a[(i + seedShift) % a.length]);
}

function StepOrderingGame({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const [levelIdx, setLevelIdx] = useState(0);
  const level = ORDERING_LEVELS[levelIdx];

  const [steps, setSteps] = useState<string[]>(() => shuffleDeterministic(level.correctSteps, 0));
  const [checked, setChecked] = useState(false);
  const [solvedLevels, setSolvedLevels] = useState<Record<string, boolean>>({});

  const selectLevel = (idx: number) => {
    setLevelIdx(idx);
    setSteps(shuffleDeterministic(ORDERING_LEVELS[idx].correctSteps, idx));
    setChecked(false);
  };

  const moveStep = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= steps.length) return;
    setChecked(false);
    setSteps((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleCheck = () => {
    setChecked(true);
    const allMatch = steps.every((s, idx) => s === level.correctSteps[idx]);
    const nextSolved = {...solvedLevels, [level.id]: allMatch};
    setSolvedLevels(nextSolved);
    const totalSolved = Object.values(nextSolved).filter(Boolean).length;
    onComplete(totalSolved, ORDERING_LEVELS.length);
  };

  const exactMatchCount = steps.filter((s, i) => s === level.correctSteps[i]).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {ORDERING_LEVELS.map((lv, idx) => (
            <button
              key={lv.id}
              type="button"
              onClick={() => selectLevel(idx)}
              className={`min-h-10 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                idx === levelIdx
                  ? 'bg-sky-600 text-white'
                  : solvedLevels[lv.id]
                  ? 'border border-emerald-400 bg-emerald-50 text-emerald-800'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lv.title} {solvedLevels[lv.id] ? '✓' : ''}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCheck}
          className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Periksa Urutan</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold text-sky-700 mb-1">Soal Tantangan</div>
        <p className="text-sm font-medium text-slate-900">{level.problem}</p>
      </div>

      <div className="space-y-2.5">
        {steps.map((stepText, idx) => {
          const isPositionRight = checked && stepText === level.correctSteps[idx];
          const isPositionWrong = checked && stepText !== level.correctSteps[idx];

          return (
            <div
              key={stepText}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition ${
                isPositionRight
                  ? 'border-emerald-400 bg-emerald-50'
                  : isPositionWrong
                  ? 'border-rose-300 bg-rose-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono-tabular text-xs font-bold text-slate-700">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-800">{stepText}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveStep(idx, -1)}
                  disabled={idx === 0}
                  aria-label="Naikkan langkah"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-200 disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(idx, 1)}
                  disabled={idx === steps.length - 1}
                  aria-label="Turunkan langkah"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-200 disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {checked && (
        <div
          className={`rounded-2xl border p-4 text-sm font-semibold ${
            exactMatchCount === steps.length
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
              : 'border-amber-300 bg-amber-50 text-amber-900'
          }`}
        >
          {exactMatchCount === steps.length
            ? 'Sempurna! Urutan penyelesaian soalmu 100% runtut secara fisika.'
            : `${exactMatchCount} dari ${steps.length} langkah sudah berada di posisi yang tepat. Geser langkah yang bertanda merah lalu periksa kembali!`}
        </div>
      )}
    </div>
  );
}

// ==========================================
// GAME 4: PAPAN PERMAINAN DIGITAL (ORBIT TRACK)
// ==========================================
interface BoardTile {
  index: number;
  label: string;
  type: 'start' | 'quiz' | 'bonus' | 'trap' | 'finish';
}

const BOARD_TILES: BoardTile[] = [
  {index: 0, label: 'Start 0°', type: 'start'},
  {index: 1, label: 'Tantangan θ', type: 'quiz'},
  {index: 2, label: 'Bonus +15', type: 'bonus'},
  {index: 3, label: 'Tantangan T', type: 'quiz'},
  {index: 4, label: 'π/2 rad', type: 'quiz'},
  {index: 5, label: 'Slip -1', type: 'trap'},
  {index: 6, label: 'Tantangan f', type: 'quiz'},
  {index: 7, label: 'Bonus +20', type: 'bonus'},
  {index: 8, label: 'π rad', type: 'quiz'},
  {index: 9, label: 'Tantangan ω', type: 'quiz'},
  {index: 10, label: 'Bonus +15', type: 'bonus'},
  {index: 11, label: 'Tantangan aₛ', type: 'quiz'},
  {index: 12, label: '3π/2 rad', type: 'quiz'},
  {index: 13, label: 'Slip -1', type: 'trap'},
  {index: 14, label: 'Roda-Roda', type: 'quiz'},
  {index: 15, label: 'Finis 2π', type: 'finish'},
];

const BOARD_QUIZZES = [
  {
    q: '1 putaran penuh sama dengan berapa radian?',
    opts: ['π rad', '2π rad', '4π rad'],
    ans: 1,
  },
  {
    q: 'Benda berputar 10 kali dalam 5 sekon. Berapa frekuensinya?',
    opts: ['0,5 Hz', '2 Hz', '50 Hz'],
    ans: 1,
  },
  {
    q: 'Ke arah mana percepatan sentripetal selalu menuju?',
    opts: ['Menyinggung lingkaran', 'Menjauhi pusat', 'Menuju pusat lingkaran'],
    ans: 2,
  },
  {
    q: 'Pada dua roda sepusat (seporos), besaran mana yang nilainya sama?',
    opts: ['Kecepatan sudut (ω)', 'Kecepatan linear (v)', 'Jari-jari (R)'],
    ans: 0,
  },
  {
    q: 'Jika dua roda bersinggungan, bagaimana arah putar kedua roda?',
    opts: ['Selalu searah', 'Berlawanan arah', 'Diam tidak berputar'],
    ans: 1,
  },
  {
    q: 'Diketahui ω = 10 rad/s dan r = 0,5 m. Berapa kecepatan linear v?',
    opts: ['5 m/s', '20 m/s', '0,05 m/s'],
    ans: 0,
  },
];

function CircularBoardGame({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const [pos, setPos] = useState(0);
  const [score, setScore] = useState(0);
  const [diceVal, setDiceVal] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<(typeof BOARD_QUIZZES)[number] | null>(null);
  const [log, setLog] = useState('Tekan "Lempar Dadu" untuk memulai petualangan satu putaran (2π rad)!');
  const [finished, setFinished] = useState(false);

  const rollDice = () => {
    if (rolling || activeQuiz || finished) return;
    setRolling(true);
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 4) + 1; // 1..4 so player experiences more tiles
      setDiceVal(rolled);
      setRolling(false);

      const nextPos = Math.min(15, pos + rolled);
      setPos(nextPos);
      const tile = BOARD_TILES[nextPos];

      if (nextPos === 15) {
        const finalScore = score + 30;
        setScore(finalScore);
        setFinished(true);
        setLog('Selamat! Kamu menyelesaikan 1 putaran penuh (2π rad) dan meraih bonus finis +30 poin!');
        onComplete(finalScore, 120);
      } else if (tile.type === 'bonus') {
        const pts = tile.label.includes('20') ? 20 : 15;
        setScore((s) => s + pts);
        setLog(`Mendarat di petak ${tile.label}! Kamu mendapat +${pts} poin energi rotasi.`);
      } else if (tile.type === 'trap') {
        const backPos = Math.max(0, nextPos - 1);
        setPos(backPos);
        setLog('Ups, lintasan licin! Kamu mundur 1 petak karena gaya gesek berkurang.');
      } else {
        const q = BOARD_QUIZZES[(nextPos + rolled) % BOARD_QUIZZES.length];
        setActiveQuiz(q);
        setLog(`Mendarat di petak ${tile.label}. Jawab tantangan fisika untuk meraih +20 poin!`);
      }
    }, 350);
  };

  const answerBoardQuiz = (idx: number) => {
    if (!activeQuiz) return;
    if (idx === activeQuiz.ans) {
      setScore((s) => s + 20);
      setLog('Jawaban tepat! +20 poin ditambahkan. Silakan lempar dadu lagi.');
    } else {
      setLog('Belum tepat, tetap semangat! Lempar dadu lagi untuk melanjutkan putaran.');
    }
    setActiveQuiz(null);
  };

  const resetBoard = () => {
    setPos(0);
    setScore(0);
    setDiceVal(null);
    setActiveQuiz(null);
    setFinished(false);
    setLog('Permainan baru dimulai dari posisi sudut 0°. Lempar dadu untuk melaju!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Papan Permainan Digital: Petualangan Lintasan 2π Radian
          </h4>
          <p className="text-sm text-slate-600">{log}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 font-mono-tabular">
            Skor: {score} Poin
          </div>
          <button
            type="button"
            onClick={resetBoard}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulang</span>
          </button>
        </div>
      </div>

      {/* Circular Loop Board Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
        {BOARD_TILES.map((tile) => {
          const isHere = pos === tile.index;
          const isPassed = pos > tile.index;
          return (
            <div
              key={tile.index}
              className={`relative flex min-h-20 flex-col justify-between rounded-2xl border p-2.5 transition ${
                isHere
                  ? 'border-sky-600 bg-sky-600 text-white shadow-md scale-[1.03]'
                  : isPassed
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : tile.type === 'bonus'
                  ? 'border-amber-200 bg-amber-50 text-amber-900'
                  : tile.type === 'trap'
                  ? 'border-rose-200 bg-rose-50 text-rose-900'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                <span className="font-mono-tabular">#{tile.index + 1}</span>
                {isHere && <Sparkles className="h-3.5 w-3.5" />}
              </div>
              <div className="text-xs font-bold leading-tight">{tile.label}</div>
            </div>
          );
        })}
      </div>

      {/* Control / Active Challenge Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {activeQuiz ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
              <HelpCircle className="h-4 w-4" />
              <span>Kartu Tantangan Fisika (+20 Poin)</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{activeQuiz.q}</p>
            <div className="flex flex-wrap gap-2">
              {activeQuiz.opts.map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => answerBoardQuiz(idx)}
                  className="min-h-10 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-sky-500 hover:bg-sky-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : finished ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>Putaran selesai dengan total {score} poin!</span>
            </div>
            <button
              type="button"
              onClick={resetBoard}
              className="btn-tactile-primary rounded-xl px-4 py-2 text-xs font-semibold text-white"
            >
              Mainkan Putaran Baru
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-white font-mono-tabular text-xl font-extrabold text-sky-700 shadow-sm">
                {rolling ? '...' : diceVal ?? '—'}
              </div>
              <div className="text-xs text-slate-600">
                Posisi saat ini: <strong className="text-slate-900">Petak {pos + 1} / 16</strong>
                <div>Sudut lintasan: <strong className="font-mono-tabular">{((pos / 15) * 360).toFixed(0)}°</strong></div>
              </div>
            </div>
            <button
              type="button"
              onClick={rollDice}
              disabled={rolling}
              className="btn-tactile-amber inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white"
            >
              <Dices className="h-5 w-5" />
              <span>{rolling ? 'Mengocok Dadu...' : 'Lempar Dadu'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// GAME 5: INTEGRASI PhET INTERACTIVE SIMULATIONS
// ==========================================
function PhetIntegrationPanel({onExplored}: {onExplored: () => void}) {
  const [showEmbed, setShowEmbed] = useState(false);

  const phetHtmlUrl =
    'https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation';
  const phetPortalUrl = 'https://phet.colorado.edu/en/simulations/rotation';

  const handleOpenEmbed = () => {
    setShowEmbed(true);
    onExplored();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Integrasi PhET Interactive Simulations (University of Colorado Boulder)
          </h4>
          <p className="mt-1 text-sm text-slate-600">
            Simulasi resmi <strong>Ladybug Revolution / Rotation</strong> untuk mengeksplorasi posisi sudut, kecepatan sudut (<MathFormula latex="\omega" />), percepatan sentripetal, dan hubungan gerak melingkar secara langsung.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleOpenEmbed}
            className="btn-tactile-primary inline-flex min-h-10 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white whitespace-nowrap"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>{showEmbed ? 'Muat Ulang Simulasi PhET' : 'Jalankan Simulasi PhET di Sini'}</span>
          </button>
          <a
            href={phetPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onExplored}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap"
          >
            <span>Buka Halaman Resmi PhET</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 3 Guided Missions */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold text-sky-700 mb-1">Misi 1 · Posisi Radial</div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Letakkan kepik di dekat pusat piringan, lalu geser menjauhi pusat. Amati bahwa <MathFormula latex="\omega" /> tetap sama tetapi vektor kecepatan linear (<MathFormula latex="v" />) semakin panjang!
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold text-orange-700 mb-1">Misi 2 · Vektor Sentripetal</div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Aktifkan centang vektor kecepatan &amp; percepatan pada menu PhET. Perhatikan bahwa panah percepatan sentripetal selalu mengarah tegak lurus ke pusat putaran.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold text-emerald-700 mb-1">Misi 3 · Hubungan Grafik</div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Ubah kecepatan sudut menjadi konstan (GMB) dan amati grafik <MathFormula latex="\theta(t)" /> yang berbentuk garis lurus serta <MathFormula latex="\alpha = 0" />.
          </p>
        </div>
      </div>

      {showEmbed ? (
        <div className="rounded-2xl border border-slate-300 bg-slate-900/5 p-2">
          <iframe
            title="PhET Ladybug Revolution Simulation"
            src={phetHtmlUrl}
            className="h-[480px] w-full rounded-xl bg-white"
            allowFullScreen
          />
          <p className="mt-2 px-2 text-xs text-slate-600">
            Catatan teknis: Simulasi PhET Ladybug Revolution menggunakan teknologi CheerpJ dari University of Colorado Boulder dan memerlukan beberapa detik untuk inisialisasi. Jika jaringan sekolah memblokir iframe eksternal, gunakan tombol &quot;Buka Halaman Resmi PhET&quot; di atas.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-600">
            Klik tombol <strong>Jalankan Simulasi PhET di Sini</strong> atau buka langsung melalui tautan resmi University of Colorado Boulder di atas untuk memulai eksperimen virtual.
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MAIN GAME ARCADE CONTAINER
// ==========================================
export function EducationalGames({onRecordScore, onLogHistory}: EducationalGamesProps) {
  const [activeGame, setActiveGame] = useState<'match' | 'word' | 'order' | 'board' | 'phet'>('match');

  const tabs = useMemo(
    () => [
      {id: 'match' as const, label: '1. Pasangkan Konsep'},
      {id: 'word' as const, label: '2. Cari Kata Fisika'},
      {id: 'order' as const, label: '3. Susun Langkah Soal'},
      {id: 'board' as const, label: '4. Papan Lintasan 2π'},
      {id: 'phet' as const, label: '5. Simulasi PhET'},
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveGame(tab.id)}
            className={`flex-1 min-h-11 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeGame === tab.id
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card-3d-surface rounded-3xl p-5 md:p-6">
        {activeGame === 'match' && (
          <DragDropMatchGame
            onComplete={(score, max) => {
              const pct = Math.round((score / max) * 100);
              onRecordScore('dragDropBest', pct);
              onLogHistory('Gim Pasangkan Konsep', score, max);
            }}
          />
        )}
        {activeGame === 'word' && (
          <WordSearchGame
            onComplete={(score, max) => {
              const pct = Math.round((score / max) * 100);
              onRecordScore('wordSearchBest', pct);
              if (score === max) onLogHistory('Gim Cari Kata Fisika', score, max);
            }}
          />
        )}
        {activeGame === 'order' && (
          <StepOrderingGame
            onComplete={(score, max) => {
              const pct = Math.round((score / max) * 100);
              onRecordScore('orderingBest', pct);
              onLogHistory('Gim Susun Langkah Soal', score, max);
            }}
          />
        )}
        {activeGame === 'board' && (
          <CircularBoardGame
            onComplete={(score, max) => {
              onRecordScore('boardGameBest', score);
              onLogHistory('Papan Permainan Lintasan 2π', score, max);
            }}
          />
        )}
        {activeGame === 'phet' && (
          <PhetIntegrationPanel
            onExplored={() => {
              onRecordScore('phetExplored', true);
            }}
          />
        )}
      </div>
    </div>
  );
}
