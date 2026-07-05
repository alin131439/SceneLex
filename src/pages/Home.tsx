import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Target, Flame, Library, ChevronDown } from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import { wordBanks } from "@/data/wordBanks";
import ProgressBar from "@/components/ProgressBar";
import ReviewPrompt from "@/components/ReviewPrompt";
import WordBankSelector from "@/components/WordBankSelector";
import CompanionBanner from "@/components/CompanionBanner";

export default function Home() {
  const navigate = useNavigate();
  const { dailyGoal, dailyCompleted, streak, mastered, review, selectedBankId } = useLearnStore();
  const [showBankSelector, setShowBankSelector] = useState(false);

  const currentBank = wordBanks.find((b) => b.id === selectedBankId);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "上午好";
    if (hour < 18) return "下午好";
    return "晚上好";
  };

  const totalStudied = mastered.length + review.length;

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="flex items-center justify-between mb-2">
          <h1 
            className="text-lg font-bold tracking-[0.3em] bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"
            style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
          >
            SCENELEX
          </h1>
          <button
            onClick={() => setShowBankSelector(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-card text-xs font-medium text-text-primary hover:shadow-card-hover transition-all"
          >
            <Library size={14} className="text-primary-500" />
            <span className="max-w-[80px] truncate">{currentBank?.name || "选择词库"}</span>
            <ChevronDown size={12} className="text-text-secondary" />
          </button>
        </div>

        <CompanionBanner />

        {/* Ebbinghaus Review Prompt */}
        <div className="mt-4">
          <ReviewPrompt onStartReview={() => navigate("/learn")} />
        </div>

        {/* Daily Goal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 bg-white rounded-3xl shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
                <Target size={18} className="text-primary-500" />
              </div>
              <span className="font-semibold text-text-primary">今日目标</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame size={16} className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">
                已连续打卡 {streak} 天
              </span>
            </div>
          </div>
          <ProgressBar
            value={dailyCompleted}
            max={dailyGoal}
            color="bg-gradient-to-r from-primary-400 to-primary-500"
            size="lg"
          />
          <p className="text-xs text-text-secondary mt-2">
            今日已学习 {dailyCompleted} 个单词
            {dailyGoal - dailyCompleted > 0 && `，还差 ${dailyGoal - dailyCompleted} 个目标`}
            {dailyGoal - dailyCompleted <= 0 && "，目标已完成！"}
          </p>
        </motion.div>

        {/* Mode Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-shadow"
            onClick={() => navigate("/learn")}
          >
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
              <BookOpen size={20} className="text-primary-500" />
            </div>
            <h3 className="font-semibold text-text-primary text-sm">小说模式</h3>
            <p className="text-xs text-text-secondary mt-1">在故事中记忆</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/novel")}
            className="bg-white rounded-2xl shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
              <Library size={20} className="text-purple-500" />
            </div>
            <h3 className="font-semibold text-text-primary text-sm">AI 小说</h3>
            <p className="text-xs text-text-secondary mt-1">用词汇创作故事</p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        {totalStudied > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 flex gap-3"
          >
            <div className="flex-1 bg-white rounded-2xl shadow-card p-4 text-center">
              <p className="text-2xl font-bold text-success">{mastered.length}</p>
              <p className="text-xs text-text-secondary mt-1">已掌握</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-card p-4 text-center">
              <p className="text-2xl font-bold text-warning">{review.length}</p>
              <p className="text-xs text-text-secondary mt-1">待复习</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Start Button */}
      <div className="max-w-lg mx-auto px-5 mt-8 mb-8">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/learn")}
          className="w-full py-4 bg-primary-500 text-white font-semibold text-lg rounded-2xl animate-pulse-glow hover:shadow-glow transition-all"
        >
          开始今日学习
        </motion.button>
      </div>

      {/* Bank Selector Modal */}
      <WordBankSelector
        isOpen={showBankSelector}
        onClose={() => setShowBankSelector(false)}
      />
    </div>
  );
}
