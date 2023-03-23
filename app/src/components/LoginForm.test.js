import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  test('showwing login form', () => {
    render(<LoginForm />)

    screen.getByText('Login')
  })
})
