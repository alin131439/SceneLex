import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Check, X, ChevronDown } from "lucide-react";
import type { Word } from "@/data/words";

interface WordCardProps {
  word: Word;
  onSwipe: (direction: "left" | "right") => void;
  onTap: () => void;
  isTop: boolean;
  isExpanded: boolean;
  zIndex: number;
}

export default function WordCard({
  word,
  onSwipe,
  onTap,
  isTop,
  isExpanded,
  zIndex,
}: WordCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDragging = useRef(false);

  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacityLeft = useTransform(x, [-200, -50], [1, 0]);
  const opacityRight = useTransform(x, [50, 200], [0, 1]);

  const leftBadgeOpacity = useTransform(x, [-300, -100], [1, 0]);
  const rightBadgeOpacity = useTransform(x, [100, 300], [0, 1]);
  const leftBadgeScale = useTransform(x, [-300, -100], [1, 0.5]);
  const rightBadgeScale = useTransform(x, [100, 300], [0.5, 1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    isDragging.current = false;
    const threshold = 120;
    const velocity = info.velocity.x;

    if (info.offset.x < -threshold || velocity < -500) {
      onSwipe("left");
    } else if (info.offset.x > threshold || velocity > 500) {
      onSwipe("right");
    }
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleClick = () => {
    if (!isDragging.current) {
      onTap();
    }
  };

  return (
    <motion.div
      className="absolute w-full"
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        zIndex,
        cursor: isTop ? "grab" : "default",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Green badge - Left swipe (Mastered) */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        style={{ opacity: leftBadgeOpacity, scale: leftBadgeScale }}
      >
        <div className="flex items-center gap-1.5 bg-success text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
          <Check size={16} strokeWidth={3} />
          认识
        </div>
      </motion.div>

      {/* Red badge - Right swipe (Review) */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        style={{ opacity: rightBadgeOpacity, scale: rightBadgeScale }}
      >
        <div className="flex items-center gap-1.5 bg-warning text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
          <X size={16} strokeWidth={3} />
          不认识
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full bg-white rounded-3xl shadow-card overflow-hidden border border-gray-100"
        animate={{
          boxShadow: isExpanded
            ? "0 20px 60px rgba(79,110,247,0.15)"
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Card Header - Part of speech tag */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
              {word.partOfSpeech}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: word.difficulty }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary-300"
                />
              ))}
              {Array.from({ length: 5 - word.difficulty }).map((_, i) => (
                <div
                  key={`e-${i}`}
                  className="w-1.5 h-1.5 rounded-full bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Word */}
        <div className="px-6 py-4 text-center">
          <h2 className="text-[32px] font-bold text-text-primary tracking-tight leading-tight">
            {word.word}
          </h2>
          <p className="text-sm text-text-secondary mt-2 font-medium">
            {word.phonetic}
          </p>
        </div>

        {/* Expanded details */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-2">
            <div className="border-t border-gray-100 pt-4">
              <p className="text-base font-semibold text-text-primary">
                {word.definition}
              </p>
              <div className="mt-3 bg-surface rounded-xl p-3">
                <p className="text-sm text-text-primary leading-relaxed">
                  {word.example}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {word.exampleTranslation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tap hint */}
        {!isExpanded && isTop && (
          <div className="flex justify-center pb-4">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <span>点击查看释义</span>
              <ChevronDown size={14} className="animate-bounce" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
