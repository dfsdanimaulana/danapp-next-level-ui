import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import useAxios from '../hooks/useAxios'

export default function Profile() {
  const { name } = useParams()
  const { data } = useAxios(`/posts?name=${name}`)
  return (
    <Layout>
      <Box flex={6} p={3}>
        Profile {name}
      </Box>
    </Layout>
  )
}
