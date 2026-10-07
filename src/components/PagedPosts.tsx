import { Box, Pagination, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import PostCard from './PostCard'
import type { PostMeta } from '../lib/posts'

// 每頁幾張卡片
export const PAGE_SIZE = 12

// 依網址的 ?page=N 分頁；其他參數（q、date）會保留
export default function PagedPosts({ posts }: { posts: PostMeta[] }) {
  const [params, setParams] = useSearchParams()

  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const requested = Number(params.get('page') ?? 1)
  const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1
  const visible = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const onChange = (_: unknown, next: number) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next === 1) p.delete('page')
      else p.set('page', String(next))
      return p
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Stack spacing={3}>
      {visible.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={onChange}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Stack>
  )
}
