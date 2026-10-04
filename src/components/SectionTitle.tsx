import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

// 標題 + 圓點 + 細雙線
export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, letterSpacing: '.08em' }}>
        {children}
      </Typography>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
      <Box
        sx={{
          flex: 1,
          height: 4,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      />
    </Box>
  )
}
