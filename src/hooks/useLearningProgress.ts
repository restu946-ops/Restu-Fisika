import {useState, useEffect, useCallback} from 'react';
import {LearningHistoryItem, LearningProgressState, PageId} from '../types/mpi';

const STORAGE_KEY = 'mpi_kinematika_gerak_melingkar_v1';

const DEFAULT_PROGRESS: LearningProgressState = {
  studentName: 'Peserta Didik Kelas X',
  visitedPages: ['beranda'],
  completedTopics: [],
  hotsAnswers: {},
  evalAnswers: {},
  selfAssessment: {},
  reflectionNote: '',
  gameScores: {
    dragDropBest: null,
    wordSearchBest: null,
    orderingBest: null,
    boardGameBest: null,
    phetExplored: false,
  },
  history: [],
};

export const PAGE_ORDER: PageId[] = [
  'beranda',
  'panduan',
  'tujuan',
  'materi',
  'latihan',
  'gim',
  'evaluasi',
  'referensi',
  'pengembang',
];

function loadInitialProgress(): LearningProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LearningProgressState>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      gameScores: {
        ...DEFAULT_PROGRESS.gameScores,
        ...(parsed.gameScores ?? {}),
      },
      visitedPages: Array.isArray(parsed.visitedPages) && parsed.visitedPages.length > 0
        ? parsed.visitedPages
        : ['beranda'],
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgressState>(loadInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors silently
    }
  }, [progress]);

  const markPageVisited = useCallback((pageId: PageId) => {
    setProgress((prev) => {
      if (prev.visitedPages.includes(pageId)) return prev;
      return {
        ...prev,
        visitedPages: [...prev.visitedPages, pageId],
      };
    });
  }, []);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: exists
          ? prev.completedTopics.filter((id) => id !== topicId)
          : [...prev.completedTopics, topicId],
      };
    });
  }, []);

  const markTopicCompleted = useCallback((topicId: string) => {
    setProgress((prev) => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
      };
    });
  }, []);

  const setHotsAnswer = useCallback((questionId: number, optionIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      hotsAnswers: {
        ...prev.hotsAnswers,
        [questionId]: optionIndex,
      },
    }));
  }, []);

  const resetHotsAnswers = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      hotsAnswers: {},
    }));
  }, []);

  const setEvalAnswer = useCallback((questionId: number, optionIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      evalAnswers: {
        ...prev.evalAnswers,
        [questionId]: optionIndex,
      },
    }));
  }, []);

  const resetEvalAnswers = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      evalAnswers: {},
    }));
  }, []);

  const setSelfAssessmentValue = useCallback((itemKey: string, value: 'Ya' | 'Tidak') => {
    setProgress((prev) => ({
      ...prev,
      selfAssessment: {
        ...prev.selfAssessment,
        [itemKey]: value,
      },
    }));
  }, []);

  const setReflectionNote = useCallback((note: string) => {
    setProgress((prev) => ({
      ...prev,
      reflectionNote: note,
    }));
  }, []);

  const setStudentName = useCallback((name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
    }));
  }, []);

  const recordGameScore = useCallback(
    (gameKey: keyof LearningProgressState['gameScores'], value: number | boolean) => {
      setProgress((prev) => {
        const nextScores = {...prev.gameScores};
        if (gameKey === 'phetExplored') {
          nextScores.phetExplored = Boolean(value);
        } else if (typeof value === 'number') {
          const current = nextScores[gameKey];
          nextScores[gameKey] = current === null ? value : Math.max(current, value);
        }
        return {
          ...prev,
          gameScores: nextScores,
        };
      });
    },
    [],
  );

  const addHistoryEntry = useCallback(
    (entry: Omit<LearningHistoryItem, 'id' | 'timestamp' | 'percentage'>) => {
      const percentage = entry.maxScore > 0 ? Math.round((entry.score / entry.maxScore) * 100) : 0;
      const item: LearningHistoryItem = {
        ...entry,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        percentage,
      };
      setProgress((prev) => ({
        ...prev,
        history: [item, ...prev.history].slice(0, 20),
      }));
    },
    [],
  );

  const resetAllProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Compute overall learning progress percentage (topics 40%, HOTS 25%, Eval 20%, Games 15%)
  const topicRatio = Math.min(1, progress.completedTopics.length / 7);
  const hotsRatio = Math.min(1, Object.keys(progress.hotsAnswers).length / 10);
  const evalRatio = Math.min(1, Object.keys(progress.evalAnswers).length / 10);
  const gamesDoneCount = [
    progress.gameScores.dragDropBest !== null,
    progress.gameScores.wordSearchBest !== null,
    progress.gameScores.orderingBest !== null,
    progress.gameScores.boardGameBest !== null,
    progress.gameScores.phetExplored,
  ].filter(Boolean).length;
  const gameRatio = gamesDoneCount / 5;

  const overallPercent = Math.round(
    topicRatio * 40 + hotsRatio * 25 + evalRatio * 20 + gameRatio * 15,
  );

  return {
    progress,
    overallPercent,
    markPageVisited,
    toggleTopicCompleted,
    markTopicCompleted,
    setHotsAnswer,
    resetHotsAnswers,
    setEvalAnswer,
    resetEvalAnswers,
    setSelfAssessmentValue,
    setReflectionNote,
    setStudentName,
    recordGameScore,
    addHistoryEntry,
    resetAllProgress,
  };
}
