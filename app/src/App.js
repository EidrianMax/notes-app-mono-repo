import { useState, useEffect } from 'react'

import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

import { postNote, getAllNotes } from './services/services'
import Notification from './components/Notificacion'

export default function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const tokenLocalStorage = window.localStorage.getItem('token')

    if (tokenLocalStorage) {
      setToken(tokenLocalStorage)

      setLoading(true)
      getAllNotes().then(data => {
        setNotes(data)
        setLoading(false)
      })
    }
  }, [])

  const createNote = (token, note) => {
    return postNote(token, note).then(returnedNote => {
      setNotes([...notes, returnedNote])
    })
  }

  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem('token')
  }

  return (
    <div>
      <h1>Mis Notas</h1>

      <Notification message={errorMessage} />

      {token
        ? (
          <NoteForm
            notes={notes}
            createNote={createNote}
            handleLogout={handleLogout}
          />
          )
        : (
          <LoginForm setToken={setToken} setErrorMessage={setErrorMessage} />
          )}

      {loading && 'Cargando'}

      <ol>
        {notes &&
          notes.map(({ id, content, date, important }) => (
            <Note
              key={id}
              content={content}
              date={date}
              important={important}
            />
          ))}
      </ol>
    </div>
  )
}
