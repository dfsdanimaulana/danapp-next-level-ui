import React from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useFetch } from '../hooks/useFetch'
import { useEffect } from 'react'

export default function Profile() {
  const { name } = useParams()
  const { data: posts } = useFetch(`/posts?name=${name}&populate=user`)

  return (
    <Layout>
      <Box flex={6} p={3}>
        Profile {name}
      </Box>
    </Layout>
  )
}
