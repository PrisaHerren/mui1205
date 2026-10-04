import { useState } from 'react'
import type { FormEvent } from 'react'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useMatch, useNavigate, useSearchParams } from 'react-router-dom'
import Panel from './Panel'
import SectionTitle from './SectionTitle'
import { formatDate } from '../lib/format'
import { getPosts, searchPosts } from '../lib/posts'

function SearchCard() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const k = q.trim()
    navigate(k ? `/?q=${encodeURIComponent(k)}` : '/')
  }

  return (
    <Panel compact>
      <SectionTitle>搜尋</SectionTitle>
      <Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          slotProps={{ htmlInput: { 'aria-label': '搜尋文章' } }}
        />
        <Button type="submit" variant="contained" sx={{ flexShrink: 0, whiteSpace: 'nowrap', px: 2.5 }}>
          搜尋
        </Button>
      </Box>
    </Panel>
  )
}

// 全部文章列表；有搜尋關鍵字時只列出符合的，目前正在讀的文章會標示出來
function PostListCard() {
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const current = useMatch('/posts/:slug')?.params.slug
  const posts = q ? searchPosts(q) : getPosts()

  return (
    <Panel compact>
      <SectionTitle>文章列表</SectionTitle>
      {posts.length === 0 ? (
        <Typography color="text.secondary">沒有符合的文章。</Typography>
      ) : (
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            overflowY: 'auto',
            maxHeight: { xs: 280, md: 'calc(100vh - 320px)' },
          }}
        >
          {posts.map((p, i) => {
            const active = p.slug === current
            return (
              <Box
                component="li"
                key={p.slug}
                sx={{
                  py: 1.5,
                  borderBottom: i < posts.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Link
                  component={RouterLink}
                  to={`/posts/${p.slug}`}
                  underline="hover"
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    display: 'block',
                    fontSize: '.95rem',
                    fontWeight: active ? 700 : 400,
                    color: active ? 'primary.main' : 'text.primary',
                  }}
                >
                  {p.title}
                </Link>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(p.date)}
                </Typography>
              </Box>
            )
          })}
        </Box>
      )}
    </Panel>
  )
}

export default function Sidebar() {
  return (
    <Stack
      spacing={3}
      component="aside"
      sx={{ position: { xs: 'static', md: 'sticky' }, top: 16 }}
    >
      <SearchCard />
      <PostListCard />
    </Stack>
  )
}
