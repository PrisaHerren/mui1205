import { Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import Panel from '../components/Panel'
import PagedPosts from '../components/PagedPosts'
import { formatDate } from '../lib/format'
import { getPosts, searchPosts } from '../lib/posts'

export default function Home() {
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const date = params.get('date') ?? ''

  let list = q ? searchPosts(q) : getPosts()
  if (date) list = list.filter((p) => p.date === date)

  const filters = [q && `搜尋「${q}」`, date && formatDate(date)].filter(Boolean).join('、')

  return (
    <Stack spacing={3}>
      {filters && (
        <Panel compact>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography>
              {filters}，共 {list.length} 篇
            </Typography>
            <Button component={RouterLink} to="/" size="small">
              顯示全部
            </Button>
          </Stack>
        </Panel>
      )}
      {list.length === 0 ? (
        <Panel>
          <Typography color="text.secondary">沒有符合的文章。</Typography>
        </Panel>
      ) : (
        <PagedPosts posts={list} />
      )}
    </Stack>
  )
}
