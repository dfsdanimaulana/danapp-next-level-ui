import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ children, redirectPath = '/login', admin }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  if (admin && !user.role.includes('admin')) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
