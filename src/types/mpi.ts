export type PageId =
  | 'beranda'
  | 'panduan'
  | 'tujuan'
  | 'materi'
  | 'latihan'
  | 'gim'
  | 'evaluasi'
  | 'referensi'
  | 'pengembang';

export interface PageMeta {
  id: PageId;
  order: number;
  label: string;
  shortLabel: string;
  description: string;
}

export interface LearningHistoryItem {
  id: string;
  timestamp: string;
  category: 'Latihan HOTS' | 'Evaluasi Akhir' | 'Gim Edukasi';
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface GameScores {
  dragDropBest: number | null;
  wordSearchBest: number | null;
  orderingBest: number | null;
  boardGameBest: number | null;
  phetExplored: boolean;
}

export interface LearningProgressState {
  studentName: string;
  visitedPages: PageId[];
  completedTopics: string[];
  hotsAnswers: Record<number, number>;
  evalAnswers: Record<number, number>;
  selfAssessment: Record<string, 'Ya' | 'Tidak' | null>;
  reflectionNote: string;
  gameScores: GameScores;
  history: LearningHistoryItem[];
}

export interface FormulaItem {
  label: string;
  latex: string;
  notes?: string[];
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  answerLatex: string;
  sourcePage: string;
  pedagogicalNote?: string;
}

export interface MateriTopic {
  id: string;
  partLabel: string;
  title: string;
  sourcePages: string;
  summary: string;
  keyPoints: string[];
  formulas: FormulaItem[];
  examples: WorkedExample[];
  simulationType?: 'gmb' | 'roda-roda' | 'calculator';
  honestNote?: string;
}

export type StimulusDiagramType =
  | 'none'
  | 'gmb-vectors'
  | 'table-data'
  | 'roda-sepusat'
  | 'roda-rantai'
  | 'roda-singgung'
  | 'tiga-roda-kombinasi'
  | 'tali-lilit'
  | 'tali-dua-benda'
  | 'empat-roda';

export interface HotsQuestion {
  id: number;
  title: string;
  contextTag: string;
  stimulusNarrative: string;
  diagramType: StimulusDiagramType;
  tableHeaders?: string[];
  tableRows?: string[][];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationLatex?: string;
  distractorAnalysis: {
    optionLabel: string;
    reason: string;
  }[];
  sourceAlignment: string;
}

export interface EvalQuestion {
  id: number;
  question: string;
  diagramType: StimulusDiagramType;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationLatex?: string;
  sourcePage: string;
  pdfNote?: string;
}
