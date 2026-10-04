import { Fab, Zoom, useScrollTrigger } from '@mui/material'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

export default function BackToTop() {
  const show = useScrollTrigger({ disableHysteresis: true, threshold: 300 })
  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="medium"
        aria-label="回到頂端"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ position: 'fixed', right: 16, bottom: 16 }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  )
}
