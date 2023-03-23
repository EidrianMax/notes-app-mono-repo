import Proptypes from 'prop-types'
import { useState } from 'react'

export default function Note ({ content, date, important }) {
  const [isImportant, setIsImportant] = useState(false)

  const handleClick = () => {
    setIsImportant(!isImportant)
  }

  return (
    <li>
      {content}
      <br />
      <button onClick={handleClick}>
        {isImportant ? 'make not important' : 'make important'}
      </button>
    </li>
  )
}

Note.propTypes = {
  content: Proptypes.string.isRequired,
  date: Proptypes.string,
  important: Proptypes.bool
}
