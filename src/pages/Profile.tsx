import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Key,
  BookOpen,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  Check,
  Copy,
  Shield,
  Brain,
} from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import { wordBanks } from "@/data/wordBanks";

const AI_MODELS = [
  { id: "default", name: "默认引擎", desc: "内置小说生成引擎" },
  { id: "gpt-4", name: "GPT-4", desc: "OpenAI 最强大的模型" },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", desc: "快速且经济实惠" },
  { id: "claude", name: "Claude 3", desc: "Anthropic 的 AI 助手" },
];

export default function Profile() {
  const store = useLearnStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"settings" | "ai" | "bank" | "data">("settings");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(store.apiKey);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [importMessage, setImportMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const currentBank = wordBanks.find((b) => b.id === store.selectedBankId);

  const handleSaveApiKey = () => {
    store.setApiKey(apiKeyInput);
  };

  const handleExport = () => {
    const data = store.exportData();
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // Also trigger file download
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ielts-vocab-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = store.importData(text);
      setImportMessage({
        type: success ? "success" : "error",
        text: success ? "数据导入成功！" : "导入失败，请检查文件格式。",
      });
      setTimeout(() => setImportMessage(null), 3000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (!store.selectedBankId) return;
    store.resetBank(store.selectedBankId);
    setShowResetConfirm(false);
  };

  const tabs = [
    { id: "settings" as const, icon: User, label: "学习设置" },
    { id: "ai" as const, icon: Brain, label: "AI 设置" },
    { id: "bank" as const, icon: BookOpen, label: "词库管理" },
    { id: "data" as const, icon: Shield, label: "数据管理" },
  ];

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto px-5 pt-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary">个人中心</h1>
          <p className="text-text-secondary text-sm mt-1">管理你的学习设置和数据</p>
        </motion.div>

        {/* Tab Bar */}
        <div className="flex gap-1 mt-6 bg-white rounded-2xl p-1 shadow-card">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-500 text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-4"
        >
          {/* Learning Settings */}
          {activeTab === "settings" && (
            <>
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">学习设置</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">每日学习目标</span>
                    <select
                      value={store.dailyGoal}
                      onChange={(e) => store.setNovelSettings({ length: store.novelSettings.length })}  // proxy
                      className="bg-surface rounded-lg px-3 py-1.5 text-sm font-medium outline-none"
                    >
                      {[10, 20, 30, 50, 100].map((n) => (
                        <option key={n} value={n}>{n} 词</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">连续打卡</span>
                    <span className="text-sm font-medium text-orange-500">{store.streak} 天</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">已掌握</span>
                    <span className="text-sm font-medium text-success">{store.mastered.length} 词</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* AI Settings */}
          {activeTab === "ai" && (
            <>
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">AI 模型选择</h3>
                </div>
                <div className="space-y-2">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => store.setNovelSettings({ aiModel: model.id })}
                      className={`w-full p-3 rounded-xl text-left transition-all ${
                        store.novelSettings.aiModel === model.id
                          ? "bg-primary-50 border-2 border-primary-200"
                          : "bg-surface border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{model.name}</p>
                          <p className="text-xs text-text-secondary">{model.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            store.novelSettings.aiModel === model.id
                              ? "border-primary-500 bg-primary-500 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {store.novelSettings.aiModel === model.id && <Check size={12} />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* API Key */}
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Key size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">API Key 管理</h3>
                </div>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="输入你的 API Key..."
                    className="w-full px-4 py-2.5 bg-surface rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 pr-16"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary-500 font-medium hover:underline"
                  >
                    {showApiKey ? "隐藏" : "显示"}
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  使用自己的 API Key 调用 AI 服务生成更优质的小说内容。Key 仅保存在本地。
                </p>
                <button
                  onClick={handleSaveApiKey}
                  className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  保存
                </button>
              </div>
            </>
          )}

          {/* Word Bank Management */}
          {activeTab === "bank" && (
            <>
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">词库概览</h3>
                </div>
                {currentBank && (
                  <div className="bg-surface rounded-xl p-3 mb-3">
                    <p className="font-semibold text-sm text-text-primary">{currentBank.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{currentBank.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                      <span>总计 {currentBank.wordCount} 词</span>
                      <span>已掌握 {store.mastered.length} 词</span>
                      <span>进度 {Math.round((store.mastered.length / currentBank.wordCount) * 100)}%</span>
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  {wordBanks.slice(0, 4).map((bank) => (
                    <div
                      key={bank.id}
                      className={`p-2 rounded-xl text-sm ${
                        bank.id === store.selectedBankId ? "bg-primary-50" : "hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-text-primary">{bank.name}</span>
                        <span className="text-xs text-text-secondary">{bank.wordCount} 词</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} className="text-warning" />
                  <h3 className="font-semibold text-sm text-text-primary">重置词库</h3>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  重置将清除当前词库的所有学习记录，此操作不可撤销。
                </p>
                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-4 py-2 bg-warning/10 text-warning rounded-xl text-sm font-medium hover:bg-warning/20 transition-colors"
                  >
                    <RotateCcw size={14} className="inline mr-1.5" />
                    重置 {currentBank?.name || "当前词库"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-warning text-white rounded-xl text-sm font-medium"
                    >
                      确认重置
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-4 py-2 bg-surface rounded-xl text-sm font-medium"
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Data Management */}
          {activeTab === "data" && (
            <>
              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Download size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">导出数据</h3>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  导出你的学习记录，包括掌握词汇、复习记录和学习统计。
                </p>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      已复制到剪贴板
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      复制并下载备份
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Upload size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-sm text-text-primary">导入数据</h3>
                </div>
                <p className="text-xs text-text-secondary mb-3">选择之前导出的 JSON 备份文件进行恢复。</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-surface rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <Upload size={16} />
                  选择文件导入
                </button>
                {importMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 text-xs ${
                      importMessage.type === "success" ? "text-success" : "text-warning"
                    }`}
                  >
                    {importMessage.text}
                  </motion.p>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
