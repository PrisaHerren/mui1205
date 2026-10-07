import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Box, ButtonBase, IconButton, Stack, Typography } from '@mui/material'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'

// 文章結尾的相簿：大圖 + 左右切換 + 縮圖列，支援鍵盤左右鍵
export default function Gallery({ images }: { images: string[] }) {
  const [i, setI] = useState(0)
  const n = images.length
  if (n === 0) return null

  const go = (d: number) => setI((x) => (x + d + n) % n)
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  const arrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    bgcolor: 'rgba(255,255,255,.85)',
    '&:hover': { bgcolor: '#fff' },
  } as const

  return (
    <Box
      role="region"
      aria-label="相簿"
      tabIndex={0}
      onKeyDown={onKeyDown}
      sx={{ my: 3, outlineOffset: 4 }}
    >
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#111',
          borderRadius: '4px',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
        }}
      >
        <Box
          component="img"
          src={images[i]}
          alt={`照片 ${i + 1} / ${n}`}
          referrerPolicy="no-referrer"
          sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {n > 1 && (
          <>
            <IconButton aria-label="上一張" onClick={() => go(-1)} sx={{ ...arrow, left: 8 }}>
              <ChevronLeft />
            </IconButton>
            <IconButton aria-label="下一張" onClick={() => go(1)} sx={{ ...arrow, right: 8 }}>
              <ChevronRight />
            </IconButton>
          </>
        )}
        <Typography
          variant="caption"
          sx={{ position: 'absolute', right: 10, bottom: 8, color: '#fff', bgcolor: 'rgba(0,0,0,.5)', px: 1, borderRadius: 1 }}
        >
          {i + 1} / {n}
        </Typography>
      </Box>

      {n > 1 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: 'auto', pb: 0.5 }}>
          {images.map((src, idx) => (
            <ButtonBase
              key={src}
              onClick={() => setI(idx)}
              aria-label={`第 ${idx + 1} 張`}
              aria-current={idx === i}
              sx={{
                flex: '0 0 auto',
                width: 96,
                height: 54,
                borderRadius: '4px',
                overflow: 'hidden',
                border: '2px solid',
                borderColor: idx === i ? 'primary.main' : 'transparent',
                opacity: idx === i ? 1 : 0.7,
              }}
            >
              <Box component="img" src={src} alt="" referrerPolicy="no-referrer" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ButtonBase>
          ))}
        </Stack>
      )}
    </Box>
  )
}
