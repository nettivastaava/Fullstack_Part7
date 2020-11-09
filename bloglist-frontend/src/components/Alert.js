import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Alert = () => {
  const notification= useSelector(state => state.alert)

  if (notification === '') {
    return null
  } else if (notification.match('^wrong')) {
    return <div className='failNot'>{notification}</div>
  } else if (notification.match('a new')) {
    return <div className='succNot'>{notification}</div>
  } else if (notification.match('removed')) {
    return <div className='failNot'>{notification}</div>
  }
}

export default Alert