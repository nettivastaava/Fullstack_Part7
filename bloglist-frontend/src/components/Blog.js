import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, giveLike }) => {
  const [comment, setComment] = useState('')

  const addNewComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: comment,
      id: Math.floor(Math.random() * 100000)
    }
    console.log('comment:', commentObject)
    blogService.commentBlog(blog.id, commentObject)
    setComment('')
  }
  
  

  return(
    <div>
          <h2>{blog.title} {blog.author}</h2>
        <br/>
          {blog.url}
        <br/>
          {blog.likes} likes<button id='like' onClick={() => giveLike(blog)}>like</button>
        <br/>
          Added by {blog.user.name}
        <br/>
        <form onSubmit={addNewComment}>
          <input
            id='comment'
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button id='createComment' type="submit">add comment</button>
        </form>
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment => 
            <li key={comment.id}>
              {comment.content}
            </li>
          )}
        </ul>     
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  giveLike: PropTypes.func.isRequired,

}

export default Blog
