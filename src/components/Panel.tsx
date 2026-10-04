import type { ReactNode } from 'react'
import { Paper } from '@mui/material'

// 白色大圓角卡片（文章、側欄共用）
export default function Panel({
  children,
  compact = false,
}: {
  children: ReactNode
  compact?: boolean
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '24px',
        p: compact ? { xs: 2.5, md: 3.5 } : { xs: 2.5, md: 4.5 },
        boxShadow: '0 6px 28px rgba(20, 50, 80, 0.06)',
      }}
    >
      {children}
    </Paper>
  )
}
