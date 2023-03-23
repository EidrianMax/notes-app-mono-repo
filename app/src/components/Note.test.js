import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'Hello my friend'
    }

    render(<Note content={note.content} />)

    screen.getByText('Hello my friend')
  })

  // test('clicking the button calls event handler once', () => {
  //   const note = {
  //     content: 'Hello my friend',
  //   }

  //   render(<Note content={note.content} />)

  //   fireEvent.click(screen.getAllByText('Mark important'))
  // })
})
