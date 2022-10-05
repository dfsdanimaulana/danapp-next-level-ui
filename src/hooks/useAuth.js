import { useDispatch, useSelector } from 'react-redux'
import { getUserValue, getUserStatus, getUserError, fetchUser } from '../redux/user'

export default function useAuth() {
  const dispatch = useDispatch()

  const user = useSelector(getUserValue)
  const status = useSelector(getUserStatus)
  const error = useSelector(getUserError)

  /**
   * get user data in database by id
   * @param {String} id user mongoose ObjectId
   * @returns {Object<User>}
   */
  const getUser = (id) => {
    dispatch(fetchUser(id))
  }
  return { user, status, error, getUser }
}
