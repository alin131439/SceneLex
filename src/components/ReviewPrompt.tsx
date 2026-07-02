import { motion } from "framer-motion";
import { AlertCircle, Clock, ChevronRight } from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import {
  getDueWords,
  getReviewPriorityLabel,
  getReviewPriorityColor,
} from "@/utils/ebbinghaus";

interface ReviewPromptProps {
  onStartReview: () => void;
}

export default function ReviewPrompt({ onStartReview }: ReviewPromptProps) {
  const { ebbinghausRecords } = useLearnStore();
  const dueWords = getDueWords(ebbinghausRecords);

  if (dueWords.length === 0) return null;

  const hasHighPriority = dueWords.some((r) => r.stage <= 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-4 border ${
        hasHighPriority
          ? "bg-warning/5 border-warning/20"
          : "bg-primary-50 border-primary-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            hasHighPriority ? "bg-warning/15" : "bg-primary-100"
          }`}
        >
          {hasHighPriority ? (
            <AlertCircle size={20} className="text-warning" />
          ) : (
            <Clock size={20} className="text-primary-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-text-primary">
            {hasHighPriority ? "有词汇需要立即复习" : "复习提醒"}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            基于艾宾浩斯遗忘曲线，{dueWords.length} 个词汇需要复习
          </p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {dueWords.slice(0, 3).map((record) => (
              <span
                key={record.wordId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: getReviewPriorityColor(record.stage) + "18",
                  color: getReviewPriorityColor(record.stage),
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: getReviewPriorityColor(record.stage) }}
                />
                {getReviewPriorityLabel(record.stage)}
              </span>
            ))}
            {dueWords.length > 3 && (
              <span className="text-xs text-text-secondary">+{dueWords.length - 3} 更多</span>
            )}
          </div>
        </div>
        <button
          onClick={onStartReview}
          className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-all ${
            hasHighPriority
              ? "bg-warning text-white hover:bg-warning/90"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }`}
        >
          去复习
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
