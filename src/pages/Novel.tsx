import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, RotateCcw, Download, Copy, Check, Upload, FileText, Trash2 } from "lucide-react";
import { useLearnStore } from "@/store/learnStore";
import { generateNovel, getNovelThemes, getThemeWords, parseHighlightedText } from "@/utils/novelGenerator";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,gif,webp}", { eager: true });
const imagePaths = Object.values(images).map((img: any) => img.default);

function getRandomImage(): string {
  if (imagePaths.length === 0) return "";
  return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

export default function NovelGenerator() {
  const store = useLearnStore();
  const { novelSettings, setNovelSettings, addNovelToHistory } = store;

  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWordSelector, setShowWordSelector] = useState(false);
  const [selectedWordNames, setSelectedWordNames] = useState<string[]>([]);
  const [novelImage, setNovelImage] = useState("");

  const [fictionLibrary, setFictionLibrary] = useState<{ id: string; title: string; content: string; date: string }[]>(() => {
    const saved = localStorage.getItem("fictionLibrary");
    return saved ? JSON.parse(saved) : [];
  });
  const [newFictionContent, setNewFictionContent] = useState("");
  const [newFictionTitle, setNewFictionTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("fictionLibrary", JSON.stringify(fictionLibrary));
  }, [fictionLibrary]);

  const handlePaste = () => {
    if (!newFictionContent.trim() || !newFictionTitle.trim()) return;
    const newFiction = {
      id: Date.now().toString(),
      title: newFictionTitle,
      content: newFictionContent,
      date: new Date().toLocaleDateString(),
    };
    setFictionLibrary((prev) => [newFiction, ...prev]);
    setNewFictionTitle("");
    setNewFictionContent("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      alert("只支持 .txt 和 .md 文件");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const title = file.name.replace(/\.(txt|md)$/, "");
      const newFiction = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      setFictionLibrary((prev) => [newFiction, ...prev]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleDelete = (id: string) => {
    setFictionLibrary((prev) => prev.filter((item) => item.id !== id));
  };

  const themes = getNovelThemes();
  const lengthOptions = [
    { value: "short" as const, label: "短篇", desc: "约200字" },
    { value: "medium" as const, label: "中篇", desc: "约400字" },
    { value: "long" as const, label: "长篇", desc: "约600字" },
  ];

  const themeWords = getThemeWords(novelSettings.theme);

  const toggleWordSelection = (word: string) => {
    if (selectedWordNames.includes(word)) {
      setSelectedWordNames(selectedWordNames.filter((w) => w !== word));
    } else if (selectedWordNames.length < 20) {
      setSelectedWordNames([...selectedWordNames, word]);
    }
  };

  const selectAllWords = () => {
    const allNames = themeWords.slice(0, 20).map((w) => w.word);
    setSelectedWordNames(allNames);
  };

  const clearAllSelection = () => {
    setSelectedWordNames([]);
  };

  const wordsToUse = selectedWordNames.length > 0 ? selectedWordNames : undefined;

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const result = generateNovel({
        length: novelSettings.length,
        theme: novelSettings.theme,
        selectedWords: wordsToUse,
      });

      setGeneratedTitle(result.title);
      setGeneratedContent(result.content);
      setUsedWords(result.usedWords);
      setNovelImage(getRandomImage());
      setIsGenerating(false);

      addNovelToHistory({
        title: result.title,
        content: result.content,
        date: new Date().toISOString().split("T")[0],
        words: result.usedWords,
      });
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={false}
        animate={{ height: showSettings ? "auto" : 0, opacity: showSettings ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-3 max-w-2xl mx-auto">
          <h3 className="font-semibold text-sm text-text-primary">生成设置</h3>

          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">主题风格</label>
            <div className="flex gap-2 flex-wrap">
              {themes.map((theme) => {
                const icons: Record<string, string> = {
                  "搞笑": "😝",
                  "恐怖": "👻",
                  "奇幻": "🪄",
                  "暧昧": "🌿",
                  "治愈": "❤️‍🩹",
                };
                return (
                  <button
                    key={theme}
                    onClick={() => setNovelSettings({ theme })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      novelSettings.theme === theme
                        ? "bg-primary-500 text-white"
                        : "bg-surface text-text-secondary hover:bg-gray-200"
                    }`}
                  >
                    {icons[theme] || ""} {theme}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">篇幅</label>
            <div className="flex gap-2">
              {lengthOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setNovelSettings({ length: opt.value })}
                  className={`flex-1 px-3 py-2 rounded-xl text-center transition-all ${
                    novelSettings.length === opt.value
                      ? "bg-primary-500 text-white"
                      : "bg-surface text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  <div className="text-sm font-medium">{opt.label}</div>
                  <div className="text-[10px] opacity-70">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-text-secondary">选择词汇（共 {themeWords.length} 个）</div>
              <div className="flex gap-2">
                <button
                  onClick={selectAllWords}
                  className="text-xs text-primary-500 font-medium hover:underline"
                >
                  全选
                </button>
                <button
                  onClick={clearAllSelection}
                  className="text-xs text-text-secondary font-medium hover:underline"
                >
                  清空
                </button>
              </div>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {themeWords.map((w) => (
                <div
                  key={w.word}
                  onClick={() => toggleWordSelection(w.word)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    selectedWordNames.includes(w.word)
                      ? "bg-primary-50 border border-primary-200"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-text-primary truncate">{w.word}</div>
                    <div className="text-[10px] text-text-secondary truncate">{w.definition}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    selectedWordNames.includes(w.word) ? "bg-primary-500" : "bg-gray-200"
                  }`}>
                    {selectedWordNames.includes(w.word) && (
                      <Check size={10} className="text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              已选择 {selectedWordNames.length} / 20 个单词
            </div>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-3xl shadow-card p-5 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
              <Sparkles size={16} className="text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-text-primary">AI 小说生成</h3>
              <p className="text-xs text-text-secondary">
                基于《五篇风格文档》创作故事
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-xs text-primary-500 font-medium hover:underline"
          >
            {showSettings ? "收起设置" : "展开设置"}
          </button>
        </div>

        {!generatedContent && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-primary-500 text-white rounded-2xl font-medium text-sm hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={16} />
                </motion.div>
                生成中...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                生成我的小说
              </>
            )}
          </button>
        )}

        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="relative w-full h-[70vh] min-h-[500px] rounded-2xl overflow-hidden shadow-lg">
              {novelImage && (
                <img
                  src={novelImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
              
              <div className="absolute inset-0 flex flex-col p-6 md:p-8 lg:p-12 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-xl md:text-2xl text-white drop-shadow-lg">
                    <BookOpen size={20} className="inline mr-2 text-primary-400" />
                    {generatedTitle}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  {generatedContent.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-base md:text-lg text-white leading-relaxed drop-shadow-md">
                      {parseHighlightedText(paragraph).map((part, i) =>
                        part.type === "highlight" ? (
                          <span
                            key={i}
                            className="font-bold text-primary-300 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm"
                          >
                            {part.text}
                          </span>
                        ) : (
                          <span key={i}>{part.text}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {usedWords.map((word) => (
                    <span
                      key={word}
                      className="px-3 py-1 bg-primary-500/80 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                    >
                      {word}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                    共 {usedWords.length} 个词汇
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {store.novelHistory.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-4 max-w-2xl mx-auto">
          <h3 className="font-semibold text-sm text-text-primary mb-3">生成历史</h3>
          <div className="space-y-2">
            {store.novelHistory.slice(0, 5).map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen size={14} className="text-primary-500 flex-shrink-0" />
                  <span className="text-sm text-text-primary truncate">{entry.title}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-text-secondary">{entry.words.length}词</span>
                  <span className="text-xs text-text-secondary">{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-card p-4 max-w-2xl mx-auto mt-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-purple-500" />
          <h3 className="font-semibold text-sm text-text-primary">同人文上传</h3>
        </div>

        <div className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="输入同人文标题"
              value={newFictionTitle}
              onChange={(e) => setNewFictionTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>

          <div>
            <textarea
              placeholder="粘贴同人文内容..."
              value={newFictionContent}
              onChange={(e) => setNewFictionContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
              style={{ maxHeight: "120px", overflowY: "auto" }}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-text-primary rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Upload size={14} />
              上传文件
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handlePaste}
              disabled={!newFictionContent.trim() || !newFictionTitle.trim()}
              className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              保存同人文
            </button>
          </div>
        </div>

        {fictionLibrary.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs text-text-secondary mb-2">我的同人文库</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {fictionLibrary.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-text-primary truncate">{item.title}</div>
                    <div className="text-[10px] text-text-secondary">{item.date}</div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
