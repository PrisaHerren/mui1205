import { Box } from '@mui/material'

interface Props {
  src: string
  alt: string
  caption?: string // 可用 \n 換行
  icon?: string
}

// 封面圖 + 左下角疊字與天氣圖示（對應 WordPress 的 cover block）
export default function CoverImage({ src, alt, caption, icon }: Props) {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', lineHeight: 0 }}>
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{ display: 'block', width: '100%', aspectRatio: '1.9 / 1', objectFit: 'cover' }}
      />
      {(caption || icon) && (
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 12, md: 20 },
            bottom: { xs: 12, md: 20 },
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          {caption && (
            <Box
              component="p"
              sx={{
                m: 0,
                color: '#33cccc',
                fontWeight: 700,
                fontSize: { xs: '14px', md: '18px' },
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                textShadow: '0 1px 3px rgba(0,0,0,.35)',
              }}
            >
              {caption}
            </Box>
          )}
          {icon && (
            <Box component="img" src={icon} alt="" sx={{ width: { xs: 44, md: 65 }, height: 'auto' }} />
          )}
        </Box>
      )}
    </Box>
  )
}
