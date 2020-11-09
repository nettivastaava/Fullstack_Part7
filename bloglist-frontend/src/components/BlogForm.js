import React, { useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: title,
      author: author,
      url: url,
      id: Math.floor(Math.random() * 100000)
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
      <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
             id='title'
             type="text"
             value={title}
             name="Title"
             onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id="createBlog" variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default BlogForm