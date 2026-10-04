import { Box, Button, Link, Stack, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Link as RouterLink, useParams } from 'react-router-dom'
import CoverImage from '../components/CoverImage'
import Gallery from '../components/Gallery'
import MarkdownView from '../components/MarkdownView'
import Panel from '../components/Panel'
import TagChip from '../components/TagChip'
import NotFound from './NotFound'
import { formatDate } from '../lib/format'
import { getAdjacentPosts, getPost } from '../lib/posts'
import type { PostMeta } from '../lib/posts'

function NavItem({ label, post, align }: { label: string; post: PostMeta; align: 'left' | 'right' }) {
  return (
    <Link
      component={RouterLink}
      to={`/posts/${post.slug}`}
      underline="none"
      sx={{ display: 'block', textAlign: align, color: 'text.primary', '&:hover .nav-title': { color: 'primary.main' } }}
    >
      <Typography variant="caption" color="text.secondary" component="div">
        {label}
      </Typography>
      <Typography className="nav-title" sx={{ fontWeight: 700 }}>
        {post.title}
      </Typography>
    </Link>
  )
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post || !slug) return <NotFound />

  const { older, newer } = getAdjacentPosts(slug)

  return (
    <Panel>
      <article>
        <Button component={RouterLink} to="/" sx={{ mb: 2, ml: -1 }}>
          ← 回文章列表
        </Button>

        {post.tags.length > 0 && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </Stack>
        )}

        <Typography variant="h3" component="h1" sx={{ fontWeight: 500, mb: 1.5 }}>
          {post.title}
        </Typography>

        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: 'text.secondary', mb: 3 }}>
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2">{formatDate(post.date)}</Typography>
        </Stack>

        {post.cover && (
          <CoverImage src={post.cover} alt={post.title} caption={post.coverCaption} icon={post.coverIcon} />
        )}

        <MarkdownView source={post.content} />

        <Gallery images={post.gallery} />

        {post.updated && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            最後更新於 {formatDate(post.updated)}
          </Typography>
        )}

        {(older || newer) && (
          <Box
            component="nav"
            aria-label="文章導覽"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mt: 3,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {older ? <NavItem label="上一篇" post={older} align="left" /> : <span />}
            {newer ? <NavItem label="下一篇" post={newer} align="right" /> : <span />}
          </Box>
        )}
      </article>
    </Panel>
  )
}
