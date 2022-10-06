import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/user'
import { fetchUser, registerUser, userLogin } from '../redux/user/userActions'

export default function useAuth() {
  const dispatch = useDispatch()

  const { user, status, error } = useSelector((state) => state.user)

  /**
   * get user data in database by id
   * @param {String} id user mongoose ObjectId
   * @returns {Object<User>}
   */
  const getUser = (id) => {
    dispatch(fetchUser(id))
  }

  const register = (data) => {
    dispatch(registerUser(data))
  }

  const login = (data) => {
    dispatch(userLogin(data))
  }

  const logout = () => {
    dispatch(userLogout())
  }

  return { user, status, error, getUser, register, login, logout }
}
