import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../action/tweets'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = 'sarah_edo'

export function handleInitialData (d) {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(user))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUSer(AUTHED_ID))
      })
  }
}