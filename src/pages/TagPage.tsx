import { Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Panel from '../components/Panel'
import PagedPosts from '../components/PagedPosts'
import { getPostsByTag } from '../lib/posts'

export default function TagPage() {
  const { tag = '' } = useParams<{ tag: string }>()
  const posts = getPostsByTag(tag)

  return (
    <Stack spacing={3}>
      <Panel compact>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography>
            標籤「{tag}」，共 {posts.length} 篇
          </Typography>
          <Button component={RouterLink} to="/tags" size="small">
            所有標籤
          </Button>
        </Stack>
      </Panel>
      {posts.length === 0 ? (
        <Panel>
          <Typography color="text.secondary">這個標籤下還沒有文章。</Typography>
        </Panel>
      ) : (
        <PagedPosts posts={posts} />
      )}
    </Stack>
  )
}
