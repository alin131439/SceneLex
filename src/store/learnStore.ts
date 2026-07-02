import { create } from "zustand";
import { persist } from "zustand/middleware";
import { words, Word } from "@/data/words";
import {
  EbbinghausRecord,
  createEbbinghausRecord,
  getDueWords,
  advanceStage,
} from "@/utils/ebbinghaus";

interface NovelSettings {
  length: "short" | "medium" | "long";
  theme: string;
  aiModel: string;
}

interface LearnState {
  // --- 基础学习状态 ---
  words: Word[];
  currentIndex: number;
  mastered: string[];
  review: string[];
  streak: number;
  dailyGoal: number;
  dailyCompleted: number;
  weeklyProgress: number[];

  // --- 词库选择 ---
  selectedBankId: string;
  recentBanks: string[];

  // --- 艾宾浩斯 ---
  ebbinghausRecords: EbbinghausRecord[];

  // --- 小说生成 ---
  novelSettings: NovelSettings;
  novelHistory: Array<{ title: string; content: string; date: string; words: string[] }>;

  // --- API Key ---
  apiKey: string;

  // --- 新手引导 ---
  hasSeenOnboarding: boolean;

  // --- 统计增强 ---
  dailyStudyTime: number[]; // minutes per day last 7 days
  reviewCompletionRate: number; // 0-100

  // --- Actions ---
  markMastered: (wordId: string) => void;
  markReview: (wordId: string) => void;
  nextWord: () => void;
  resetProgress: () => void;

  // 词库
  selectBank: (bankId: string) => void;
  loadBankWords: (bankId: string) => void;

  // 艾宾浩斯
  addToEbbinghaus: (wordId: string) => void;
  reviewWord: (wordId: string) => void;
  getDueReviews: () => EbbinghausRecord[];

  // 小说
  setNovelSettings: (settings: Partial<NovelSettings>) => void;
  addNovelToHistory: (entry: { title: string; content: string; date: string; words: string[] }) => void;

  // API Key
  setApiKey: (key: string) => void;

  // 新手引导
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // 统计
  recordStudyTime: (minutes: number) => void;

  // 导入导出
  exportData: () => string;
  importData: (json: string) => boolean;
  resetBank: (bankId: string) => void;
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      // --- 基础状态 ---
      words,
      currentIndex: 0,
      mastered: [],
      review: [],
      streak: 7,
      dailyGoal: 30,
      dailyCompleted: 0,
      weeklyProgress: [5, 12, 18, 8, 15, 22, 0],

      // --- 词库 ---
      selectedBankId: "ielts-core",
      recentBanks: ["ielts-core"],

      // --- 艾宾浩斯 ---
      ebbinghausRecords: [],

      // --- 小说 ---
      novelSettings: {
        length: "short",
        theme: "搞笑",
        aiModel: "default",
      },
      novelHistory: [],

      // --- API Key ---
      apiKey: "",

      // --- 新手引导 ---
      hasSeenOnboarding: false,

      // --- 统计增强 ---
      dailyStudyTime: [0, 0, 0, 0, 0, 0, 0],
      reviewCompletionRate: 0,

      // --- Actions ---
      markMastered: (wordId: string) =>
        set((state) => {
          const newWeekly = [...state.weeklyProgress];
          newWeekly[newWeekly.length - 1] += 1;
          return {
            mastered: [...state.mastered, wordId],
            dailyCompleted: state.dailyCompleted + 1,
            weeklyProgress: newWeekly,
          };
        }),

      markReview: (wordId: string) =>
        set((state) => {
          const newWeekly = [...state.weeklyProgress];
          newWeekly[newWeekly.length - 1] += 1;
          return {
            review: [...state.review, wordId],
            dailyCompleted: state.dailyCompleted + 1,
            weeklyProgress: newWeekly,
          };
        }),

      nextWord: () =>
        set((state) => ({
          currentIndex: state.currentIndex + 1,
        })),

      resetProgress: () =>
        set({
          currentIndex: 0,
          mastered: [],
          review: [],
          dailyCompleted: 0,
          ebbinghausRecords: [],
        }),

      // 词库操作
      selectBank: (bankId: string) =>
        set((state) => {
          const recent = state.recentBanks.filter((id) => id !== bankId);
          recent.unshift(bankId);
          return {
            selectedBankId: bankId,
            recentBanks: recent.slice(0, 5),
          };
        }),

      loadBankWords: (_bankId: string) => {
        // Demo: reload the default words
        set({ words, currentIndex: 0 });
      },

      // 艾宾浩斯
      addToEbbinghaus: (wordId: string) =>
        set((state) => {
          if (state.ebbinghausRecords.find((r) => r.wordId === wordId)) return state;
          return {
            ebbinghausRecords: [...state.ebbinghausRecords, createEbbinghausRecord(wordId)],
          };
        }),

      reviewWord: (wordId: string) =>
        set((state) => ({
          ebbinghausRecords: state.ebbinghausRecords.map((r) =>
            r.wordId === wordId ? advanceStage(r) : r
          ),
        })),

      getDueReviews: () => {
        return getDueWords(get().ebbinghausRecords);
      },

      // 小说
      setNovelSettings: (settings: Partial<NovelSettings>) =>
        set((state) => ({
          novelSettings: { ...state.novelSettings, ...settings },
        })),

      addNovelToHistory: (entry) =>
        set((state) => ({
          novelHistory: [entry, ...state.novelHistory].slice(0, 20),
        })),

      // API Key
      setApiKey: (key: string) => set({ apiKey: key }),

      // 新手引导
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      resetOnboarding: () => set({ hasSeenOnboarding: false }),

      // 统计
      recordStudyTime: (minutes: number) =>
        set((state) => {
          const newTimes = [...state.dailyStudyTime];
          newTimes[newTimes.length - 1] += minutes;
          return { dailyStudyTime: newTimes };
        }),

      // 导入导出
      exportData: () => {
        const state = get();
        return JSON.stringify(
          {
            mastered: state.mastered,
            review: state.review,
            ebbinghausRecords: state.ebbinghausRecords,
            streak: state.streak,
            dailyGoal: state.dailyGoal,
            weeklyProgress: state.weeklyProgress,
            dailyStudyTime: state.dailyStudyTime,
            novelHistory: state.novelHistory,
            selectedBankId: state.selectedBankId,
          },
          null,
          2
        );
      },

      importData: (json: string) => {
        try {
          const data = JSON.parse(json);
          set((state) => ({
            ...state,
            mastered: data.mastered || state.mastered,
            review: data.review || state.review,
            ebbinghausRecords: data.ebbinghausRecords || state.ebbinghausRecords,
            streak: data.streak || state.streak,
            dailyGoal: data.dailyGoal || state.dailyGoal,
            weeklyProgress: data.weeklyProgress || state.weeklyProgress,
            dailyStudyTime: data.dailyStudyTime || state.dailyStudyTime,
            novelHistory: data.novelHistory || state.novelHistory,
            selectedBankId: data.selectedBankId || state.selectedBankId,
          }));
          return true;
        } catch {
          return false;
        }
      },

      resetBank: (bankId: string) =>
        set((state) => {
          if (bankId !== state.selectedBankId) return state;
          return {
            currentIndex: 0,
            mastered: [],
            review: [],
            dailyCompleted: 0,
            ebbinghausRecords: [],
            weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
          };
        }),
    }),
    {
      name: "ielts-vocab-storage",
      partialize: (state) => ({
        selectedBankId: state.selectedBankId,
        recentBanks: state.recentBanks,
        mastered: state.mastered,
        review: state.review,
        ebbinghausRecords: state.ebbinghausRecords,
        streak: state.streak,
        dailyGoal: state.dailyGoal,
        weeklyProgress: state.weeklyProgress,
        dailyStudyTime: state.dailyStudyTime,
        novelSettings: state.novelSettings,
        novelHistory: state.novelHistory,
        apiKey: state.apiKey,
        hasSeenOnboarding: state.hasSeenOnboarding,
        reviewCompletionRate: state.reviewCompletionRate,
      }),
    }
  )
);
