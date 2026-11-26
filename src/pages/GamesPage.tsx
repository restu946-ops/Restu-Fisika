import {Award, CheckCircle2} from 'lucide-react';
import {EducationalGames} from '../components/EducationalGames';
import {GameScores} from '../types/mpi';

interface GamesPageProps {
  gameScores: GameScores;
  onRecordScore: (
    gameKey: 'dragDropBest' | 'wordSearchBest' | 'orderingBest' | 'boardGameBest' | 'phetExplored',
    value: number | boolean,
  ) => void;
  onLogHistory: (title: string, score: number, maxScore: number) => void;
}

export function GamesPage({gameScores, onRecordScore, onLogHistory}: GamesPageProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <div className="text-xs font-semibold text-sky-700">Halaman 06 · Gim Edukasi &amp; PhET</div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Arena Bermain &amp; Eksplorasi Sains Interaktif
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Asah pemahamanmu tentang Kinematika Gerak Melingkar melalui 4 gim interaktif dan 1 laboratorium simulasi PhET resmi dari University of Colorado Boulder.
        </p>
      </header>

      {/* Compact Best Score Summary Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
          <div className="text-[11px] font-medium text-slate-500">Pasangkan Konsep</div>
          <div className="mt-1 font-mono-tabular text-base font-bold text-slate-900">
            {gameScores.dragDropBest !== null ? `${gameScores.dragDropBest}%` : 'Belum dimainkan'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
          <div className="text-[11px] font-medium text-slate-500">Cari Kata Fisika</div>
          <div className="mt-1 font-mono-tabular text-base font-bold text-slate-900">
            {gameScores.wordSearchBest !== null ? `${gameScores.wordSearchBest}%` : 'Belum dimainkan'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
          <div className="text-[11px] font-medium text-slate-500">Susun Langkah</div>
          <div className="mt-1 font-mono-tabular text-base font-bold text-slate-900">
            {gameScores.orderingBest !== null ? `${gameScores.orderingBest}%` : 'Belum dimainkan'}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
          <div className="text-[11px] font-medium text-slate-500">Papan Lintasan 2π</div>
          <div className="mt-1 font-mono-tabular text-base font-bold text-slate-900">
            {gameScores.boardGameBest !== null ? `${gameScores.boardGameBest} poin` : 'Belum dimainkan'}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200 bg-white p-3.5">
          <div className="text-[11px] font-medium text-slate-500">Eksplorasi PhET</div>
          <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
            {gameScores.phetExplored ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700">Sudah Dicoba</span>
              </>
            ) : (
              <>
                <Award className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">Belum Dicoba</span>
              </>
            )}
          </div>
        </div>
      </div>

      <EducationalGames onRecordScore={onRecordScore} onLogHistory={onLogHistory} />
    </div>
  );
}
