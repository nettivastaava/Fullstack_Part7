let time

const alertReducer = (state='', action) => {
    switch (action.type) {
      case 'SET_ALERT':
        return action.data
      default:
        return state
    }
  }
  
  export const alertChange = (alert) => {
    return async dispatch => {
      if(time) {
        clearTimeout(time)
      }
      dispatch({
        type: 'SET_ALERT',
        data: alert
      })
      time = setTimeout(() => {
        dispatch(alertChange(''))
      }, 5000)
    }
      
  }
  

export default alertReducer