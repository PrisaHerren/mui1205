import { Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Panel from '../components/Panel'

export default function NotFound() {
  return (
    <Panel>
      <Typography variant="h5" component="h1" gutterBottom>
        找不到這個頁面
      </Typography>
      <Button component={RouterLink} to="/">
        回到文章列表
      </Button>
    </Panel>
  )
}
