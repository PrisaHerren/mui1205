import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import BackToTop from './BackToTop'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: '#fff', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: 'primary.main', textDecoration: 'none', fontWeight: 700, letterSpacing: '.08em' }}
          >
            My Blog
          </Typography>
          <Button component={RouterLink} to="/" color="inherit">
            文章
          </Button>
          <Button component={RouterLink} to="/tags" color="inherit">
            標籤
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            alignItems: 'start',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '300px minmax(0, 1fr)' },
          }}
        >
          <Sidebar />
          <Box component="main">{children}</Box>
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 4, textAlign: 'center', color: 'text.secondary', fontSize: '.85rem' }}>
        © {new Date().getFullYear()} My Blog
      </Box>
      <BackToTop />
    </Box>
  )
}
