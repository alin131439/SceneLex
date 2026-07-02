/**
 * 艾宾浩斯遗忘曲线复习算法
 *
 * 复习间隔（天）：1, 2, 4, 7, 15, 30
 * 每个阶段代表：
 *   - Stage 0: 初次学习（当天）
 *   - Stage 1: 1天后复习
 *   - Stage 2: 2天后复习
 *   - Stage 3: 4天后复习
 *   - Stage 4: 7天后复习
 *   - Stage 5: 15天后复习
 *   - Stage 6: 30天后复习（完成）
 */

export const EBBINGHAUS_INTERVALS = [1, 2, 4, 7, 15, 30] as const;

export interface EbbinghausRecord {
  wordId: string;
  stage: number; // 0-6
  lastReviewDate: string; // ISO date string
  nextReviewDate: string;
}

/**
 * 计算下一次复习日期
 * @param stage 当前阶段 (0-5)
 * @param fromDate 起始日期
 */
export function calculateNextReview(stage: number, fromDate: Date = new Date()): Date {
  const interval = EBBINGHAUS_INTERVALS[Math.min(stage, EBBINGHAUS_INTERVALS.length - 1)];
  const next = new Date(fromDate);
  next.setDate(next.getDate() + interval);
  return next;
}

/**
 * 判断指定记录是否需要今天复习
 */
export function isDueForReview(record: EbbinghausRecord): boolean {
  if (record.stage >= EBBINGHAUS_INTERVALS.length) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextReview = new Date(record.nextReviewDate);
  nextReview.setHours(0, 0, 0, 0);
  return nextReview <= today;
}

/**
 * 获取今日待复习的单词 ID 列表
 */
export function getDueWords(records: EbbinghausRecord[]): EbbinghausRecord[] {
  return records.filter(isDueForReview);
}

/**
 * 推进复习阶段并计算下次复习日期
 * @returns 更新后的记录
 */
export function advanceStage(record: EbbinghausRecord): EbbinghausRecord {
  const newStage = Math.min(record.stage + 1, EBBINGHAUS_INTERVALS.length);
  const today = new Date();
  return {
    ...record,
    stage: newStage,
    lastReviewDate: today.toISOString().split("T")[0],
    nextReviewDate: newStage >= EBBINGHAUS_INTERVALS.length
      ? "completed"
      : calculateNextReview(newStage, today).toISOString().split("T")[0],
  };
}

/**
 * 为新学单词创建艾宾浩斯记录
 */
export function createEbbinghausRecord(wordId: string): EbbinghausRecord {
  const today = new Date();
  return {
    wordId,
    stage: 0,
    lastReviewDate: today.toISOString().split("T")[0],
    nextReviewDate: calculateNextReview(0, today).toISOString().split("T")[0],
  };
}

/**
 * 获取复习优先级颜色
 */
export function getReviewPriorityColor(stage: number): string {
  if (stage <= 1) return "#FF6B6B"; // 早期阶段 - 红色高优先级
  if (stage <= 3) return "#FFB347"; // 中期 - 橙色
  if (stage <= 5) return "#4F6EF7"; // 后期 - 蓝色
  return "#34C759"; // 完成 - 绿色
}

/**
 * 获取复习优先级描述
 */
export function getReviewPriorityLabel(stage: number): string {
  if (stage <= 1) return "需立即复习";
  if (stage <= 3) return "建议今日复习";
  if (stage <= 5) return "近期复习";
  return "已掌握";
}
