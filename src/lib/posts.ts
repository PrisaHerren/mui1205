import fm from 'front-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  excerpt: string
  tags: string[]
  cover?: string
  coverCaption?: string
  coverIcon?: string
}

export interface Post extends PostMeta {
  content: string
  gallery: string[]
  updated?: string
}

interface Attrs {
  title?: string
  date?: string | Date
  updated?: string | Date
  summary?: string
  tags?: string[]
  cover?: string
  coverCaption?: string
  coverIcon?: string
  gallery?: string[]
}

// 文章：content/posts/*.md
const postModules = import.meta.glob('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// 圖片：content/images/**，frontmatter 與內文只要寫相對於 images 的路徑
const imageModules = import.meta.glob(
  '../../content/images/**/*.{jpg,jpeg,png,webp,gif,svg,avif}',
  { query: '?url', import: 'default', eager: true },
) as Record<string, string>

const imageMap = new Map<string, string>()
for (const [path, url] of Object.entries(imageModules)) {
  imageMap.set(path.split('/content/images/')[1], url)
}

export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src
  return imageMap.get(src.replace(/^\.?\//, '')) ?? src
}

const normalizeDate = (d?: string | Date): string => {
  if (d instanceof Date) return d.toISOString().slice(0, 10)
  return String(d ?? '')
}

// 內文用 <!--more--> 分隔：之前的部分當列表摘要（同 WordPress）
const MORE = /<!--\s*more\s*-->/

const stripMarkdown = (md: string): string =>
  md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const makeExcerpt = (md: string, max = 120): string => {
  if (MORE.test(md)) return stripMarkdown(md.split(MORE)[0])
  const text = stripMarkdown(md)
  return text.length > max ? `${text.slice(0, max)}…` : text
}

const posts: Post[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { attributes, body } = fm<Attrs>(raw)
    const summary = attributes.summary ?? ''
    return {
      slug,
      title: attributes.title ?? slug,
      date: normalizeDate(attributes.date),
      updated: attributes.updated ? normalizeDate(attributes.updated) : undefined,
      summary,
      excerpt: summary || makeExcerpt(body),
      tags: attributes.tags ?? [],
      cover: resolveImage(attributes.cover),
      coverCaption: attributes.coverCaption,
      coverIcon: resolveImage(attributes.coverIcon),
      gallery: (attributes.gallery ?? []).map((g) => resolveImage(g) ?? g),
      content: body.replace(MORE, ''),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

const toMeta = ({
  content: _content,
  gallery: _gallery,
  updated: _updated,
  ...meta
}: Post): PostMeta => meta

export const getPosts = (): PostMeta[] => posts.map(toMeta)

export const getRecentPosts = (n = 5): PostMeta[] => getPosts().slice(0, n)

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug)

// 上一篇 = 較舊、下一篇 = 較新（同 WordPress）
export const getAdjacentPosts = (
  slug: string,
): { older?: PostMeta; newer?: PostMeta } => {
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) return {}
  const at = (n: number): PostMeta | undefined => (posts[n] ? toMeta(posts[n]) : undefined)
  return { newer: at(i - 1), older: at(i + 1) }
}

export const searchPosts = (query: string): PostMeta[] => {
  const k = query.trim().toLowerCase()
  if (!k) return getPosts()
  return posts
    .filter((p) =>
      [p.title, p.summary, p.tags.join(' '), p.content].join('\n').toLowerCase().includes(k),
    )
    .map(toMeta)
}

export const getPostsByTag = (tag: string): PostMeta[] =>
  getPosts().filter((p) => p.tags.includes(tag))

export interface TagCount {
  tag: string
  count: number
}

export const getTags = (): TagCount[] => {
  const map = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

// 有發文的日期集合（給日曆標記用）
export const getPostDates = (): Set<string> => new Set(posts.map((p) => p.date))
