import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
          return action.data
        case 'ADD':
          return [...state, action.data]
        default:
          return state
    }
}

export const newBlog = blog => {
    return async dispatch => {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'ADD',
        data: newBlog,
      })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
          type: 'INIT_BLOGS',
          data: blogs,
        })
    }
}

export default blogReducer