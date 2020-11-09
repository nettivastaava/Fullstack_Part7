import React, { useState } from 'react'
import  { useField } from './hooks'
import {
  Switch, Route, Link, useParams, useRouteMatch, Redirect, useHistory
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  
  return (
      <div>
        <a href='/' style={padding}>anecdotes</a>
        <a href='/create' style={padding}>create new</a>
        <a href='/about' style={padding}>about</a>
      </div>
  )
  
}

const Anecdote = ({ anecdote }) => {
  console.log(anecdote)
  return(
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      has {anecdote.votes} votes
     <br/>
     for more info see {anecdote.info}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({ notification }) => {
  return (
    <div>
      {notification}
    </div>
  )
}

const CreateNew = (props) => {
  const history = useHistory()

  const { reset: contentReset, ...content } = useField('text')
  const {reset: authorReset, ...author} = useField('text')
  const {reset: infoReset, ...info} = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/')
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetField = (e) => {
    e.preventDefault()
    content.contentReset()
    author.contentReset()
    info.contentReset()
  }

  console.log(content)
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content}/> 
        </div>
        <div>
          author:
          <input {...author}/> 
        </div>
        <div>
          url for more info:
          <input {...info}/> 
        </div>
        <button type="submit">create</button><button type="reset" onClick={resetField}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    
    setNotification(`added ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  console.log(match)
  const anecdote = match 
    ? anecdotes.find(a => a.id === match.params.id)
    : null


  return (
    <div>
      <Notification notification={notification}/>
      <h1>Software anecdotes</h1>
      <Menu />    
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
