import { motion } from "framer-motion";
import { Flame, CheckCircle, AlertCircle, TrendingUp, Clock, Brain, Calendar } from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import { getDueWords } from "@/utils/ebbinghaus";

const dayLabels = ["一", "二", "三", "四", "五", "六", "日"];
const weekLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

export default function Stats() {
  const { streak, mastered, review, weeklyProgress, dailyGoal, ebbinghausRecords, dailyStudyTime } =
    useLearnStore();

  const dueCount = getDueWords(ebbinghausRecords).length;
  const completedEbbinghaus = ebbinghausRecords.filter((r) => r.stage >= 6).length;
  const totalRetention = ebbinghausRecords.length > 0
    ? Math.round((completedEbbinghaus / ebbinghausRecords.length) * 100)
    : 0;

  const maxProgress = Math.max(...weeklyProgress, 1);
  const maxStudyTime = Math.max(...dailyStudyTime, 1);
  const totalStudyTime = dailyStudyTime.reduce((a, b) => a + b, 0);

  // 学习时间分布数据
  const timeDistribution = [
    { label: "清晨 (6-9)", value: 15, color: "bg-primary-200" },
    { label: "上午 (9-12)", value: 30, color: "bg-primary-300" },
    { label: "下午 (12-18)", value: 25, color: "bg-primary-400" },
    { label: "晚上 (18-24)", value: 30, color: "bg-primary-500" },
  ];

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto px-5 pt-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary">学习统计</h1>
          <p className="text-text-secondary text-sm mt-1">数据驱动，高效记忆</p>
        </motion.div>

        {/* Top Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          <div className="bg-white rounded-2xl shadow-card p-4 text-center">
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Flame size={18} className="text-orange-500" />
            </div>
            <p className="text-xl font-bold text-text-primary">{streak}</p>
            <p className="text-xs text-text-secondary mt-0.5">连续打卡</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-4 text-center">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={18} className="text-success" />
            </div>
            <p className="text-xl font-bold text-success">{mastered.length}</p>
            <p className="text-xs text-text-secondary mt-0.5">已掌握</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-4 text-center">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <AlertCircle size={18} className="text-warning" />
            </div>
            <p className="text-xl font-bold text-warning">{review.length}</p>
            <p className="text-xs text-text-secondary mt-0.5">待复习</p>
          </div>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 bg-white rounded-2xl shadow-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-primary-500" />
            <span className="font-semibold text-sm text-text-primary">每日学习量</span>
            <span className="text-xs text-text-secondary ml-auto">每日目标：{dailyGoal} 词</span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-36">
            {weeklyProgress.map((value, index) => {
              const heightPercent = (value / maxProgress) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-medium text-text-primary">{value}</span>
                  <motion.div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary-400 to-primary-300 min-h-[4px]"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(heightPercent, 8)}%` }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                  <span className="text-[10px] text-text-secondary">{dayLabels[index]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Ebbinghaus Retention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-white rounded-2xl shadow-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-primary-500" />
            <span className="font-semibold text-sm text-text-primary">记忆留存率</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#4F6EF7"
                  strokeWidth="8"
                  strokeDasharray={`${(totalRetention / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 213.6" }}
                  animate={{ strokeDasharray: `${(totalRetention / 100) * 213.6} 213.6` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-500">{totalRetention}%</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">已进入长期记忆</span>
                <span className="font-semibold text-success">{completedEbbinghaus} 词</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">复习计划中</span>
                <span className="font-semibold text-primary-500">{ebbinghausRecords.length} 词</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">今日待复习</span>
                <span className={`font-semibold ${dueCount > 0 ? "text-warning" : "text-success"}`}>
                  {dueCount} 词
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Study Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-white rounded-2xl shadow-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-primary-500" />
            <span className="font-semibold text-sm text-text-primary">学习时长分布</span>
            <span className="text-xs text-text-secondary ml-auto">
              本周累计 {totalStudyTime} 分钟
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-28">
            {dailyStudyTime.map((minutes, index) => {
              const heightPercent = (minutes / maxStudyTime) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-medium text-text-primary">
                    {minutes > 0 ? `${minutes}m` : ""}
                  </span>
                  <motion.div
                    className="w-full rounded-t-lg bg-gradient-to-t from-orange-400 to-orange-300 min-h-[4px]"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(heightPercent, 8)}%` }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                  <span className="text-[10px] text-text-secondary">{dayLabels[index]}</span>
                </div>
              );
            })}
          </div>

          {/* Time Distribution by Period */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex gap-1.5 items-end h-14">
              {timeDistribution.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className={`w-full rounded-t-sm ${item.color}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / 30) * 44}px` }}
                    transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                  />
                  <span className="text-[9px] text-text-secondary text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 bg-primary-50 rounded-2xl p-4 mb-4"
        >
          <p className="text-sm text-primary-700">
            <span className="font-semibold">学习建议：</span>
            艾宾浩斯遗忘曲线显示，学习后{" "}
            <span className="font-semibold">20分钟</span> 遗忘42%，{" "}
            <span className="font-semibold">1小时</span> 遗忘56%，{" "}
            <span className="font-semibold">1天</span> 遗忘74%。在最佳时间点复习可将记忆留存率提升至{" "}
            <span className="font-semibold">95%</span>。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
