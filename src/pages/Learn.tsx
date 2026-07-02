import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import WordCard from "@/components/WordCard";
import StoryCard from "@/components/StoryCard";
import OnboardingGuide from "@/components/OnboardingGuide";

export default function Learn() {
  const navigate = useNavigate();
  const {
    words,
    currentIndex,
    mastered,
    review,
    dailyGoal,
    dailyCompleted,
    hasSeenOnboarding,
    markMastered,
    markReview,
    nextWord,
    resetProgress,
    addToEbbinghaus,
    completeOnboarding,
    resetOnboarding,
    recordStudyTime,
  } = useLearnStore();

  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding);
  const [studyStartTime] = useState(Date.now());

  const isComplete = currentIndex >= words.length;

  // 记录学习时长
  useEffect(() => {
    return () => {
      const elapsed = Math.round((Date.now() - studyStartTime) / 60000);
      if (elapsed > 0) {
        recordStudyTime(elapsed);
      }
    };
  }, [studyStartTime, recordStudyTime]);

  const visibleWords = useMemo(() => {
    if (isComplete) return [];
    const remaining = words.slice(currentIndex);
    return remaining.slice(0, 3).reverse();
  }, [words, currentIndex, isComplete]);

  const currentWord = words[currentIndex];

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (animatingOut || !currentWord) return;
      setAnimatingOut(true);
      setExpandedWordId(null);

      if (direction === "left") {
        // 左滑 = 认识
        markMastered(currentWord.id);
      } else {
        // 右滑 = 不认识
        markReview(currentWord.id);
      }
      // 加入艾宾浩斯复习计划
      addToEbbinghaus(currentWord.id);

      setTimeout(() => {
        nextWord();
        setAnimatingOut(false);
      }, 300);
    },
    [animatingOut, currentWord, markMastered, markReview, addToEbbinghaus, nextWord]
  );

  const handleTap = useCallback(() => {
    if (!currentWord) return;
    setExpandedWordId((prev) =>
      prev === currentWord.id ? null : currentWord.id
    );
  }, [currentWord]);

  // Learning Complete screen
  if (isComplete) {
    return (
      <div className="h-full flex flex-col items-center justify-center pb-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-success" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-text-primary mb-2"
        >
          学习完成！
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary text-sm mb-2"
        >
          本轮学习了 {words.length} 个单词
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex gap-6 text-sm mb-8"
        >
          <span className="text-success font-semibold">
            认识 {mastered.length} 个
          </span>
          <span className="text-warning font-semibold">
            不认识 {review.length} 个
          </span>
        </motion.div>
        <p className="text-xs text-text-secondary mb-4">
          已自动加入艾宾浩斯复习计划，系统会在最佳时间提醒你复习
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <button
            onClick={resetProgress}
            className="flex items-center gap-2 px-6 py-3 bg-surface rounded-2xl text-text-primary font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={18} />
            再来一轮
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary-500 text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors"
          >
            返回首页
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-card hover:shadow-card-hover transition-shadow"
        >
          <ArrowLeft size={20} className="text-text-primary" />
        </button>
        <div className="text-sm font-medium text-text-secondary">
          {currentIndex + 1} / {words.length}
        </div>
        <button
          onClick={() => {
            resetOnboarding();
            setShowOnboarding(true);
          }}
          className="text-xs text-primary-500 font-medium hover:underline"
        >
          操作提示
        </button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 relative">
        <div className="relative w-full max-w-[340px] mx-auto" style={{ height: "380px" }}>
          <AnimatePresence>
            {visibleWords.map((word, i) => {
              const isTopCard = i === visibleWords.length - 1;
              const cardIndex = visibleWords.length - 1 - i;
              const scale = 1 - cardIndex * 0.04;
              const translateY = cardIndex * 8;

              return (
                <motion.div
                  key={word.id}
                  className="absolute w-full"
                  style={{
                    scale,
                    y: translateY,
                    zIndex: 100 - cardIndex,
                    transformOrigin: "top center",
                  }}
                  initial={{ scale: scale - 0.08, opacity: 0, y: translateY - 20 }}
                  animate={{ scale, opacity: 1, y: translateY }}
                  exit={{ opacity: 0, x: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <WordCard
                    word={word}
                    onSwipe={handleSwipe}
                    onTap={handleTap}
                    isTop={isTopCard}
                    isExpanded={expandedWordId === word.id}
                    zIndex={100 - cardIndex}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Story Card */}
        {currentWord && (
          <div className="w-full max-w-[340px] mx-auto mt-4">
            <StoryCard word={currentWord} />
          </div>
        )}
      </div>

      {/* Swipe Hint */}
      <div className="flex items-center justify-center gap-8 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
            <span className="text-success text-sm">←</span>
          </div>
          <span className="text-xs text-text-secondary">认识</span>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">不认识</span>
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
            <span className="text-warning text-sm">→</span>
          </div>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showOnboarding && (
        <OnboardingGuide
          onComplete={() => {
            completeOnboarding();
            setShowOnboarding(false);
          }}
          onDismiss={() => {
            completeOnboarding();
            setShowOnboarding(false);
          }}
        />
      )}
    </div>
  );
}
