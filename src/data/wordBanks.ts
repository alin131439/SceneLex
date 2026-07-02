export interface WordBank {
  id: string;
  name: string;
  description: string;
  wordCount: number;
  category: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const wordBanks: WordBank[] = [
  {
    id: "ielts-core",
    name: "雅思核心词汇",
    description: "雅思考试高频核心词汇，覆盖听说读写四大板块",
    wordCount: 39,
    category: "雅思",
    icon: "BookOpen",
    difficulty: "intermediate",
  },
  {
    id: "ielts-academic",
    name: "雅思学术词汇",
    description: "雅思学术类考试专属词汇，适合A类考生",
    wordCount: 39,
    category: "雅思",
    icon: "GraduationCap",
    difficulty: "advanced",
  },
  {
    id: "ielts-listening",
    name: "雅思听力场景词",
    description: "按场景分类的听力高频词，涵盖租房、旅游、校园等",
    wordCount: 39,
    category: "雅思",
    icon: "Headphones",
    difficulty: "beginner",
  },
  {
    id: "ielts-writing",
    name: "雅思写作高分词",
    description: "Task 1 & Task 2 高分替换词，提升写作表达多样性",
    wordCount: 39,
    category: "雅思",
    icon: "PenTool",
    difficulty: "advanced",
  },
  {
    id: "ielts-reading",
    name: "雅思阅读同义替换",
    description: "阅读常见同义词替换，快速定位答案句",
    wordCount: 39,
    category: "雅思",
    icon: "FileText",
    difficulty: "intermediate",
  },
  {
    id: "toefl-core",
    name: "托福核心词汇",
    description: "托福考试核心词汇库，学术词汇为主",
    wordCount: 39,
    category: "托福",
    icon: "Globe",
    difficulty: "intermediate",
  },
  {
    id: "gre-vocab",
    name: "GRE 词汇精选",
    description: "GRE 考试高频词汇，适合进阶学习者",
    wordCount: 39,
    category: "留学",
    icon: "Star",
    difficulty: "advanced",
  },
  {
    id: "daily-english",
    name: "日常英语词汇",
    description: "日常生活高频词汇，适合基础学习",
    wordCount: 39,
    category: "通用",
    icon: "MessageCircle",
    difficulty: "beginner",
  },
];

export type WordBankCategory = "雅思" | "托福" | "留学" | "通用" | "全部";

export const categories: WordBankCategory[] = ["全部", "雅思", "托福", "留学", "通用"];
