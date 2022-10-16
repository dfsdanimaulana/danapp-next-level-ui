import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from '../api/axios'

export const useFetch = (url, method = 'get') => {
  const token = useSelector((state) => state.user.accessToken)
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (data) => {
    setOptions({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token
      },
      data
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)

      try {
        const res = await axios({
          url,
          ...fetchOptions,
          headers: {
            Authorization: `Bearer ` + token
          },
          signal: controller.signal
        })
        setData(res.data)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        } else {
          setError('Could not fetch the data')
        }
      } finally {
        setIsPending(false)
      }
    }

    // invoke the function
    if (method === 'get') {
      fetchData()
    }
    if (method === 'post' && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }
  }, [url, method, options, token])

  return { data, isPending, error, postData }
}
