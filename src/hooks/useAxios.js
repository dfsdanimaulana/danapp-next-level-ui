import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from '../api/axios'

const useAxios = (url, method = 'get', payload = {}) => {
  const token = useSelector((state) => state.user.accessToken)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const controllerRef = useRef(new AbortController())
  const cancel = () => {
    controllerRef.current.abort()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })

        console.log(response)

        setData(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoaded(true)
      }
    }

    fetchData()
  }, [])

  return { cancel, data, error, loaded }
}

export default useAxios
