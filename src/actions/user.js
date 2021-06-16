const RECEIVE_USERS = 'RECEIVE_USERS'

export function receivUSers (users) {
  return {
    RECEIVE_USERS,
    users
  } 
}