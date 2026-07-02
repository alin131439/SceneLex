import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, X, Check } from "lucide-react";

interface OnboardingGuideProps {
  onComplete: () => void;
  onDismiss: () => void;
}

const steps = [
  {
    title: "欢迎来到雅思单词学习！",
    description: "通过滑动卡片的方式轻松记忆单词。让我来教你怎么操作吧。",
    illustration: "wave",
  },
  {
    title: "左滑 = 认识",
    description: "如果你已经认识这个单词 ，将卡片向左滑动。点击卡片可以展开查看单词详情。",
    illustration: "left",
  },
  {
    title: "右滑 = 不认识",
    description: "如果还不认识这个单词，将卡片向右滑动。它会自动加入你的复习列表。",
    illustration: "right",
  },
  {
    title: "小说场景记忆",
    description: "每张卡片下方都有小说场景卡片，把单词融入故事中，记忆更深！",
    illustration: "story",
  },
];

export default function OnboardingGuide({ onComplete, onDismiss }: OnboardingGuideProps) {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const renderIllustration = () => {
    switch (currentStep.illustration) {
      case "wave":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto"
          >
            <span className="text-4xl">👋</span>
          </motion.div>
        );
      case "left":
        return (
          <div className="relative w-48 h-32 mx-auto">
            <motion.div
              animate={{ x: [0, -60, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-28 h-20 bg-white rounded-2xl shadow-card flex items-center justify-center border-2 border-success"
            >
              <Check size={28} className="text-success" />
            </motion.div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-success font-semibold text-sm">
              ← 认识
            </div>
          </div>
        );
      case "right":
        return (
          <div className="relative w-48 h-32 mx-auto">
            <motion.div
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-20 bg-white rounded-2xl shadow-card flex items-center justify-center border-2 border-warning"
            >
              <X size={28} className="text-warning" />
            </motion.div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-warning font-semibold text-sm">
              不认识 →
            </div>
          </div>
        );
      case "story":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 h-32 mx-auto bg-white rounded-2xl shadow-card p-3 border border-primary-100"
          >
            <p className="text-[10px] text-text-primary leading-relaxed">
              In the{" "}
              <span className="font-bold text-primary-500 bg-primary-50 px-0.5 rounded">
                story
              </span>
              , words come alive...
            </p>
            <div className="mt-2 h-px bg-gray-100" />
            <p className="text-[10px] text-text-secondary mt-1">
              在故事中，单词变得生动...
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm bg-white rounded-3xl p-6 relative"
        >
          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-gray-200 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-primary-500" : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Illustration */}
          <div className="mb-6">{renderIllustration()}</div>

          {/* Text */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h3 className="text-lg font-bold text-text-primary mb-2">
              {currentStep.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {currentStep.description}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={onDismiss}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              不再显示
            </button>

            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-500 text-white rounded-xl font-medium text-sm hover:bg-primary-600 transition-colors"
                >
                  下一步
                  <ArrowRight size={16} />
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-500 text-white rounded-xl font-medium text-sm hover:bg-primary-600 transition-colors animate-pulse-glow"
                >
                  开始学习
                  <Check size={16} />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
