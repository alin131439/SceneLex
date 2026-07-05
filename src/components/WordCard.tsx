import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Check, X, BookOpen } from "lucide-react";
import type { Word } from "@/data/words";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,gif,webp}", { eager: true });
const imagePaths = Object.values(images).map((img: any) => img.default);

function getRandomImage(): string {
  if (imagePaths.length === 0) return "";
  return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

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
  zIndex,
}: WordCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDragging = useRef(false);
  const randomImage = getRandomImage();

  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

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
      className="absolute w-full flex items-center justify-center"
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
      <motion.div
        className="w-full max-w-[360px] h-[90vh] max-h-[92vh] rounded-3xl shadow-card overflow-hidden mx-auto relative"
        style={{
          backgroundImage: randomImage ? `url(${randomImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="absolute top-6 left-6 z-30"
          style={{ opacity: leftBadgeOpacity, scale: leftBadgeScale }}
        >
          <div className="flex items-center gap-1.5 bg-success text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
            <Check size={16} strokeWidth={3} />
            认识
          </div>
        </motion.div>

        <motion.div
          className="absolute top-6 right-6 z-30"
          style={{ opacity: rightBadgeOpacity, scale: rightBadgeScale }}
        >
          <div className="flex items-center gap-1.5 bg-warning text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
            <X size={16} strokeWidth={3} />
            不认识
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col overflow-y-auto">
          <div className="relative px-6 pt-8 pb-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-primary-300 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
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
                    className="w-1.5 h-1.5 rounded-full bg-white/30"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative px-6 py-4 text-center">
            <h2 className="text-[36px] font-bold text-white tracking-tight leading-tight">
              {word.word}
            </h2>
            <p className="text-sm text-white/70 mt-2 font-medium">
              {word.phonetic}
            </p>
            <p className="text-lg text-white/90 mt-3">{word.definition}</p>
          </div>

          <div className="relative px-6 py-3">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-[10px] text-white/60 mb-2">例句</p>
              <p className="text-sm text-white/90 leading-relaxed">
                {word.example}
              </p>
              <p className="text-xs text-white/60 mt-2">
                {word.exampleTranslation}
              </p>
            </div>
          </div>

          <div className="relative px-6 py-3 pb-28">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={14} className="text-primary-400" />
              <span className="text-xs font-semibold text-white/90">
                小说记忆 · {word.story.title}
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm text-white/90 leading-relaxed">
                {word.story.content.split(new RegExp(`(${word.word})`, "gi")).map((part, i) =>
                  part.toLowerCase() === word.word.toLowerCase() ? (
                    <span
                      key={i}
                      className="font-bold text-primary-300 bg-white/20 px-1 rounded"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
              <p className="text-xs text-white/60 mt-3 pt-3 border-t border-white/10">
                {word.story.translation}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 px-6 py-6 bg-gradient-to-t from-black/80 to-transparent">
          <button
            onClick={() => isTop && onSwipe("left")}
            disabled={!isTop}
            className="flex items-center gap-2 px-8 py-4 bg-success/90 text-white rounded-2xl font-semibold shadow-lg hover:bg-success disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Check size={20} />
            认识
          </button>
          <button
            onClick={() => isTop && onSwipe("right")}
            disabled={!isTop}
            className="flex items-center gap-2 px-8 py-4 bg-warning/90 text-white rounded-2xl font-semibold shadow-lg hover:bg-warning disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <X size={20} />
            不认识
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}