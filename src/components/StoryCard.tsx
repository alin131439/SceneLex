import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { Word } from "@/data/words";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,gif,webp}", { eager: true });
const imagePaths = Object.values(images).map((img: any) => img.default);

function getRandomImage(): string {
  if (imagePaths.length === 0) return "";
  return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

interface StoryCardProps {
  word: Word;
}

export default function StoryCard({ word }: StoryCardProps) {
  const randomImage = getRandomImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-card border border-primary-100 overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="bg-primary-50 px-5 py-3 flex items-center gap-2">
        <BookOpen size={16} className="text-primary-500" />
        <span className="text-sm font-semibold text-primary-600">
          小说记忆 · {word.story.title}
        </span>
      </div>

      {/* Image */}
      {randomImage && (
        <div className="w-full h-[28vh] bg-gray-100 flex items-center justify-center">
          <img
            src={randomImage}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Story content - scrollable */}
      <div className="flex-1 min-h-[150px] max-h-[calc(100vh-400px)] overflow-y-auto px-5 py-4">
        {/* Word */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-text-primary">{word.word}</span>
          <span className="text-sm text-text-secondary ml-2">{word.definition}</span>
        </div>

        {/* English Example */}
        <div className="mb-3">
          <p className="text-xs text-text-secondary mb-1">英文例句</p>
          <p className="text-sm text-text-primary leading-relaxed">
            {word.story.content.split(new RegExp(`(${word.word})`, "gi")).map((part, i) =>
              part.toLowerCase() === word.word.toLowerCase() ? (
                <span
                  key={i}
                  className="font-bold text-primary-500 bg-primary-50 px-1 rounded"
                >
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>

        {/* Chinese Translation */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-text-secondary mb-1">中文翻译</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {word.story.translation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
