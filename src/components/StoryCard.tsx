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
      className="relative w-full h-[200px] rounded-2xl shadow-card overflow-hidden"
      style={{
        backgroundImage: randomImage ? `url(${randomImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={14} className="text-primary-400" />
          <span className="text-xs font-semibold text-white/90">
            小说记忆 · {word.story.title}
          </span>
        </div>

        <div className="mb-3">
          <span className="text-xl font-bold text-white">{word.word}</span>
          <span className="text-xs text-white/70 ml-2">{word.definition}</span>
        </div>

        <div className="mb-2">
          <p className="text-[10px] text-white/60 mb-1">英文例句</p>
          <p className="text-xs text-white/90 leading-relaxed">
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
        </div>

        <div className="pt-2 border-t border-white/10">
          <p className="text-[10px] text-white/60 mb-1">中文翻译</p>
          <p className="text-xs text-white/70 leading-relaxed">
            {word.story.translation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}