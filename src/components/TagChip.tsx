import { Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { tagColor } from '../lib/tagColors'

export default function TagChip({ tag, count }: { tag: string; count?: number }) {
  const c = tagColor(tag)
  return (
    <Chip
      label={count === undefined ? tag : `${tag} (${count})`}
      size="small"
      component={RouterLink}
      to={`/tags/${encodeURIComponent(tag)}`}
      clickable
      sx={{
        bgcolor: c.bg,
        color: c.fg,
        fontWeight: 700,
        letterSpacing: '.06em',
        '&:hover': { bgcolor: c.bg, filter: 'brightness(0.96)' },
      }}
    />
  )
}
