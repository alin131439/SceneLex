import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, BookOpen, ChevronRight } from "lucide-react";
import { wordBanks, type WordBank, categories } from "@/data/wordBanks";
import { useLearnStore } from "@/store/learnStore";

interface WordBankSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WordBankSelector({ isOpen, onClose }: WordBankSelectorProps) {
  const { selectedBankId, selectBank, recentBanks } = useLearnStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredBanks = wordBanks.filter((bank) => {
    const matchCategory = activeCategory === "全部" || bank.category === activeCategory;
    const matchSearch =
      !search ||
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const recentBankItems = recentBanks
    .map((id) => wordBanks.find((b) => b.id === id))
    .filter(Boolean) as WordBank[];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[75vh] bg-white rounded-t-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">选择词库</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索词库..."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-primary-500 text-white font-medium"
                        : "bg-surface text-text-secondary hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Banks */}
            {recentBankItems.length > 1 && !search && activeCategory === "全部" && (
              <div className="px-5 mb-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary font-medium">最近使用</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {recentBankItems.slice(0, 3).map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => {
                        selectBank(bank.id);
                        onClose();
                      }}
                      className="flex-shrink-0 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full text-xs font-medium hover:bg-primary-100 transition-colors"
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bank List */}
            <div className="flex-1 overflow-y-auto px-5 pb-8">
              {filteredBanks.length === 0 ? (
                <div className="text-center py-10 text-text-secondary">
                  <p className="text-sm">未找到匹配词库</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredBanks.map((bank) => (
                    <motion.button
                      key={bank.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        selectBank(bank.id);
                        onClose();
                      }}
                      className={`w-full p-4 rounded-2xl text-left transition-all ${
                        bank.id === selectedBankId
                          ? "bg-primary-50 border-2 border-primary-200"
                          : "bg-surface hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              bank.id === selectedBankId
                                ? "bg-primary-500 text-white"
                                : "bg-white text-primary-500"
                            }`}
                          >
                            <BookOpen size={20} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-sm text-text-primary flex items-center gap-2">
                              {bank.name}
                              {bank.id === selectedBankId && (
                                <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                                  当前
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                              {bank.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-text-secondary mt-1 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-3 mt-2 ml-[52px]">
                        <span className="text-xs text-text-secondary">
                          {bank.wordCount} 词
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            bank.difficulty === "beginner"
                              ? "bg-green-50 text-green-600"
                              : bank.difficulty === "intermediate"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {bank.difficulty === "beginner"
                            ? "基础"
                            : bank.difficulty === "intermediate"
                            ? "中级"
                            : "高级"}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
