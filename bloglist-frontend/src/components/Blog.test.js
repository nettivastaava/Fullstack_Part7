import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author only', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Tarkastaja Mutteri',
    url: '/.../',
    likes: 2,
    user: { 
        name: 'Jonne',
        username: 'Mutter'},
    id: 'jf39rj33'
  }

  const user = {
      user: { username: 'Mutter'}
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
})

test('clicking the button shows blog url and likes aswell', async () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Tarkastaja Mutteri',
        url: '/.../',
        likes: 2,
        user: { username: 'Mutter'},
        id: 'jf39rj33'
      }
    
      const user = {
          user: { username: 'Mutter'}
      }

      const mockHandler = jest.fn()
    
      const component = render(
        <Blog blog={blog} user={user} showInfo={mockHandler}/>
      )

      const button = component.getByText('view')
      fireEvent.click(button)

      expect(component.container).toHaveTextContent(blog.title)
      expect(component.container).toHaveTextContent(blog.author)
      expect(component.container).toHaveTextContent(blog.url)
      expect(component.container).toHaveTextContent(blog.likes)    
})

test('clicking the button twice calls event handler twice', async () => {

    const blog = {
        title: 'Testi blogi',
        author: 'Tarkastaja Mutteri',
        url: '/.../',
        likes: 2,
        user: { username: 'Mutter'},
        id: 'jf39rj33'
      }
    
      const user = {
          user: { username: 'Mutter'}
      }

      const mockHandler = jest.fn()
    
      const component = render(
        <Blog blog={blog} user={user} giveLike={mockHandler}/>
      )

      const button = component.getByText('like')
      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> test', () => {
    const createBlog = jest.fn()
  
    const component = render(
      <BlogForm createBlog={createBlog} />
    )
  
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
  
    fireEvent.change(title, { 
      target: { value: 'Harjulan taistelu II' } 
    })
    fireEvent.change(author, { 
        target: { value: 'Heimo Huima' } 
    })
    fireEvent.change(url, { 
        target: { value: 'www.ducktales.net' } 
    })
    fireEvent.submit(form)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Harjulan taistelu II' )
    expect(createBlog.mock.calls[0][0].author).toBe('Heimo Huima' )
    expect(createBlog.mock.calls[0][0].url).toBe('www.ducktales.net' )
})