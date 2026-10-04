import { Box, Link, Stack, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Link as RouterLink } from 'react-router-dom'
import Panel from './Panel'
import TagChip from './TagChip'
import CoverImage from './CoverImage'
import { formatDate } from '../lib/format'
import type { PostMeta } from '../lib/posts'

// 列表卡片：標籤 → 標題 → 封面 → 摘要 → 日期（點標題或封面進入文章頁）
export default function PostCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.slug}`
  return (
    <Panel>
      <Box component="article">
        {post.tags.length > 0 && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </Stack>
        )}

        <Link
          component={RouterLink}
          to={href}
          underline="none"
          sx={{
            display: 'inline-block',
            fontSize: { xs: '1.35rem', md: '1.7rem' },
            fontWeight: 500,
            lineHeight: 1.4,
            color: 'primary.main',
            borderBottom: '1px solid',
            borderColor: 'primary.main',
            mb: 2.5,
          }}
        >
          {post.title}
        </Link>

        {post.cover && (
          <Box component={RouterLink} to={href} aria-label={post.title} sx={{ display: 'block', mb: 2.5 }}>
            <CoverImage src={post.cover} alt={post.title} caption={post.coverCaption} icon={post.coverIcon} />
          </Box>
        )}

        <Typography sx={{ lineHeight: 1.9, mb: 2.5 }}>{post.excerpt}</Typography>

        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ color: 'text.secondary', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2">{formatDate(post.date)}</Typography>
        </Stack>
      </Box>
    </Panel>
  )
}
