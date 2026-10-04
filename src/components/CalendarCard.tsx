import { useMemo, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { Link as RouterLink } from 'react-router-dom'
import Panel from './Panel'
import { getPostDates } from '../lib/posts'

const WEEK = ['日', '一', '二', '三', '四', '五', '六']
const pad = (n: number) => String(n).padStart(2, '0')

export default function CalendarCard() {
  const now = new Date()
  const [cur, setCur] = useState({ y: now.getFullYear(), m: now.getMonth() })
  const postDates = useMemo(() => getPostDates(), [])

  const firstDow = new Date(cur.y, cur.m, 1).getDay()
  const total = new Date(cur.y, cur.m + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const shift = (delta: number) =>
    setCur(({ y, m }) => {
      const t = new Date(y, m + delta, 1)
      return { y: t.getFullYear(), m: t.getMonth() }
    })

  return (
    <Panel compact>
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderTop: '3px solid', borderTopColor: 'primary.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 1 }}>
          <IconButton size="small" aria-label="上個月" onClick={() => shift(-1)}>
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ fontWeight: 700, letterSpacing: '.15em' }}>
            {cur.y} 年 {cur.m + 1} 月
          </Typography>
          <IconButton size="small" aria-label="下個月" onClick={() => shift(1)}>
            <ChevronRight />
          </IconButton>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {WEEK.map((w) => (
            <Box key={w} sx={{ bgcolor: '#e6eaee', textAlign: 'center', py: 1, fontWeight: 700 }}>
              {w}
            </Box>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <Box key={i} sx={{ height: 40 }} />
            const key = `${cur.y}-${pad(cur.m + 1)}-${pad(d)}`
            const hasPost = postDates.has(key)
            const isToday = key === todayKey
            const base = {
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '.95rem',
              borderTop: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: isToday ? 700 : 400,
              bgcolor: isToday ? 'rgba(31,166,187,.1)' : 'transparent',
            } as const
            return hasPost ? (
              <Box
                key={i}
                component={RouterLink}
                to={`/?date=${key}`}
                aria-label={`${key} 有文章`}
                sx={{ ...base, textDecoration: 'none', color: 'primary.main', fontWeight: 700, textDecorationLine: 'underline' }}
              >
                {d}
              </Box>
            ) : (
              <Box key={i} sx={base}>
                {d}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Panel>
  )
}
