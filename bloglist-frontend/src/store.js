import React from 'react'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import alertReducer from './reducers/alertReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    alert: alertReducer,
    blogs: blogReducer,
    login: loginReducer
})


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store