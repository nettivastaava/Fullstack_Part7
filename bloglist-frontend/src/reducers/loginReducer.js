import loginService from '../services/login'
import blogService from '../services/blogs'
import { alertChange } from '../reducers/alertReducer'




const loginReducer = (state=null, action) => {

    switch (action.type) {
        case 'LOGIN':
          return action.data.user
        case 'LOGOUT':
          return null
        default:
          return state
      }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export const isLoggedIn = () => {
  return async dispatch => {
    if (window.localStorage.getItem('loggedBlogappUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: { user }
      })
    }
  }
}

export const login = (loginCredentials) => {
  console.log('kyrpa')
  return async dispatch => {
      try {

        const user = await loginService.login(loginCredentials)
        console.log(user)
        dispatch({
          type: 'LOGIN',
          data: { user }
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )    

        blogService.setToken(user.token)
      } catch (error) {
        dispatch(alertChange('wrong credentials'))
      }
        
  }    
}

export default loginReducer