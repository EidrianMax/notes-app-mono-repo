import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Toggable from './Toggable'

export default function NoteForm ({ createNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')

  const toggableRef = useRef()

  const handlerSubmit = event => {
    event.preventDefault()

    const token = window.localStorage.getItem('token')

    createNote(token, { content: newNote })
      .then(() => {
        setNewNote('')
        toggableRef.current.toggleVisibility()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handlerChange = event => {
    setNewNote(event.target.value)
  }

  // console.log(toggableRef)

  return (
    <Toggable buttonLabel='Note Form' ref={toggableRef}>
      <h3>Add Note</h3>

      <form data-testid='form-note' onSubmit={handlerSubmit}>
        <input
          onChange={handlerChange}
          value={newNote}
          placeholder='Contenido de la nota'
        />
        <button type='submit'>Agregar nota</button>
        <div>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </form>
    </Toggable>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}
