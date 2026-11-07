interface TagColor {
  bg: string
  fg: string
}

const PALETTE: TagColor[] = [
  { bg: '#d9e6f7', fg: '#3a5f94' }, // 藍
  { bg: '#d5f5dd', fg: '#2f8f4e' }, // 綠
  { bg: '#fde5d4', fg: '#b3571f' }, // 橘
  { bg: '#f1ddf7', fg: '#8a3fa3' }, // 紫
  { bg: '#fff3c4', fg: '#8a6d00' }, // 黃
  { bg: '#ffd9e0', fg: '#b03a56' }, // 粉
]

// 想固定某個標籤的顏色，在這裡指定（key 用小寫，value 是 PALETTE 的索引）
const OVERRIDES: Record<string, number> = {
  lifestyle: 0,
  office: 1,
  travel: 2,
  illness: 3,
  thought: 4,
  student: 5,
  family: 6,
  
}

export function tagColor(tag: string): TagColor {
  const fixed = OVERRIDES[tag.toLowerCase()]
  // 指定的編號超出 PALETTE 範圍時（例如寫了 6 但只有 0–5），改用自動配色，避免整站白畫面
  const preset = fixed === undefined ? undefined : PALETTE[fixed]
  if (preset) return preset
  let h = 0
  for (const ch of tag) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return PALETTE[h % PALETTE.length]
}
