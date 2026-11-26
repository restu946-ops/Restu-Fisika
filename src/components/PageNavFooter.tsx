import {ArrowLeft, ArrowRight, Home, LayoutGrid} from 'lucide-react';
import {PageId} from '../types/mpi';

interface PageNavFooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMenu: () => void;
}

const ORDERED_PAGES: {id: PageId; label: string}[] = [
  {id: 'beranda', label: 'Beranda'},
  {id: 'panduan', label: 'Panduan'},
  {id: 'tujuan', label: 'Tujuan Pembelajaran'},
  {id: 'materi', label: 'Materi'},
  {id: 'latihan', label: 'Latihan HOTS'},
  {id: 'gim', label: 'Gim Edukasi'},
  {id: 'evaluasi', label: 'Evaluasi & Refleksi'},
  {id: 'referensi', label: 'Referensi'},
  {id: 'pengembang', label: 'Pengembang'},
];

export function PageNavFooter({currentPage, onNavigate, onOpenMenu}: PageNavFooterProps) {
  const idx = ORDERED_PAGES.findIndex((p) => p.id === currentPage);
  const prevPage = idx > 0 ? ORDERED_PAGES[idx - 1] : null;
  const nextPage = idx < ORDERED_PAGES.length - 1 ? ORDERED_PAGES[idx + 1] : null;

  return (
    <div className="mt-12 border-t border-slate-200 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('beranda')}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <Home className="h-4 w-4 text-sky-600" />
            <span>Beranda</span>
          </button>
          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <LayoutGrid className="h-4 w-4 text-sky-600" />
            <span>Menu Utama</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {prevPage && (
            <button
              type="button"
              onClick={() => onNavigate(prevPage.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali: {prevPage.label}</span>
            </button>
          )}
          {nextPage && (
            <button
              type="button"
              onClick={() => onNavigate(nextPage.id)}
              className="btn-tactile-primary inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0"
            >
              <span>Lanjut: {nextPage.label}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
