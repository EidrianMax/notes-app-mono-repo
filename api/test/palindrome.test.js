const { palindrome } = require('./utils/for-testing')

describe('palindrome', () => {
  test('palindrome of fullstack', () => {
    const result = palindrome('fullstack')

    expect(result).toBe('kcatslluf')
  })

  test('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
  })

  test('palindrome of undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
  })
})
