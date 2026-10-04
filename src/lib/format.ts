// "2026-06-10" -> "2026 年 6 月 10 日"
export function formatDate(d: string): string {
  const [y, m, day] = d.split('-').map(Number)
  if (!y || !m || !day) return d
  return `${y} 年 ${m} 月 ${day} 日`
}
