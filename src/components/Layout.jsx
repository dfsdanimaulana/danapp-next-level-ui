import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <Box bgcolor={'background.default'} color={'text.primary'} sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        {children}
      </Stack>
    </Box>
  )
}
