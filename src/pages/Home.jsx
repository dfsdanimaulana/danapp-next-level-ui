import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import Navbar from '../components/Navbar'
import Add from '../components/Add'

export default function Home({ setMode, mode }) {
  return (
    <Box bgcolor={'background.default'} color={'text.primary'}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
      <Add />
    </Box>
  )
}
