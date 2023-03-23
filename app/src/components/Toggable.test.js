import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toggable from './Toggable'
import i18n from '../i18n'

describe('<Toggable />', () => {
  const setup = () =>
    render(<Toggable buttonLabel='test'>testDivContent</Toggable>)

  test('renders its children', async () => {
    setup()

    screen.getByText('testDivContent')
  })

  test('when open the toggle show and hide buttons', () => {
    setup()

    const openBtn = screen.getByRole('button', { name: 'Open test' })
    fireEvent.click(openBtn)

    const closeBtn = screen.getByRole('button', {
      name: `${i18n.TOGGABLE.CANCEL_BUTTON} test`
    })
    fireEvent.click(closeBtn)

    screen.getByRole('button', { name: 'Open test' })
  })

  test('when open and close the styles are correct', () => {
    setup()

    const el = screen.getByText('testDivContent')
    expect(el).toHaveStyle('display: none')

    const openBtn = screen.getByRole('button', { name: 'Open test' })
    fireEvent.click(openBtn)

    expect(el).not.toHaveStyle('display: none')

    const closeBtn = screen.getByRole('button', {
      name: `${i18n.TOGGABLE.CANCEL_BUTTON} test`
    })
    fireEvent.click(closeBtn)

    expect(el).toHaveStyle('display: none')
  })
})
