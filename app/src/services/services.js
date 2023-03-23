import axios from 'axios'

const apiUrl = '/api/'

const authenticateUser = async (username, password) => {
  const res = await axios.post(`${apiUrl}login`, {
    username,
    password
  })

  const { token } = res.data

  return token
}

const postNote = async (token, note) => {
  const { data: notePost } = await axios.post(`${apiUrl}notes`, note, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return notePost
}

const getAllNotes = async () => {
  const { data: notes } = await axios.get(`${apiUrl}notes`)

  return notes
}

export { authenticateUser, postNote, getAllNotes }
