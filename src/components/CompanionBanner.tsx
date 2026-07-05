import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,gif,webp}", { eager: true });
const imagePaths = Object.values(images).map((img: any) => img.default);

function getRandomImage(): string {
  if (imagePaths.length === 0) {
    return "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cristiano%20Ronaldo%20CR7%20Real%20Madrid%20white%20jersey%20football%20stadium%20background%20professional%20photography&image_size=portrait_4_3";
  }
  return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

const ipThemes = [
  { id: "cr7", name: "C罗", tag: "CR7" },
  { id: "oubing", name: "藕饼", tag: "哪吒×敖丙" },
  { id: "pingxie", name: "瓶邪", tag: "张起灵×吴邪" },
];

export default function CompanionBanner() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "上午好" : hour < 18 ? "下午好" : "晚上好";
  const [currentIP, setCurrentIP] = useState(0);
  const [showIPMenu, setShowIPMenu] = useState(false);

  const theme = ipThemes[currentIP];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      className="mt-4 rounded-3xl shadow-card overflow-hidden bg-white"
    >
      <div className="flex h-[200px]">
        <div className="flex-1 p-5 flex flex-col justify-center bg-gradient-to-br from-primary-50 to-white">
          <p className="text-text-secondary text-xs mb-1">你好</p>
          <h1 className="text-xl font-bold text-text-primary mb-3">
            {greeting}，
            <span className="text-primary-500">继续加油</span>
          </h1>
          
          <div className="mb-4">
            <p className="text-xs text-text-secondary mb-1.5">今日进度</p>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-text-primary">{theme.name}陪你背单词</span>
              <span className="text-yellow-500">⭐</span>
            </div>
            <p className="text-xs text-text-secondary">坚持，就是胜利的开始！</p>
          </div>
        </div>

        <div className="w-1/2 relative bg-gray-100">
          <img
            src={getRandomImage()}
            alt={theme.name}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-white text-xs font-medium">{theme.tag}</span>
          </div>

          <div className="absolute top-3 right-3">
            <div className="relative">
              <button
                onClick={() => setShowIPMenu(!showIPMenu)}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronDown size={14} className={`text-text-primary transition-transform ${showIPMenu ? "rotate-180" : ""}`} />
              </button>
              
              {showIPMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-24 bg-white rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {ipThemes.map((ip, index) => (
                    <button
                      key={ip.id}
                      onClick={() => {
                        setCurrentIP(index);
                        setShowIPMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-xs text-left hover:bg-primary-50 transition-colors ${
                        index === currentIP ? "bg-primary-50 text-primary-600 font-medium" : "text-text-secondary"
                      }`}
                    >
                      {ip.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}