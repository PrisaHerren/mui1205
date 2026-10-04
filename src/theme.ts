import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1fa6bb', contrastText: '#ffffff' },
    text: { primary: '#2d3748', secondary: '#6b7785' },
    background: { default: '#f4f7fa', paper: '#ffffff' },
    divider: '#e3e8ee',
  },
  typography: {
    fontFamily:
      '"Quicksand","PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif',
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '.08em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12 } } },
  },
})
