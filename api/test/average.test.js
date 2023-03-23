const { average } = require('./utils/for-testing')

describe('average', () => {
  test('of many is calculated correctly', () => {
    const result = average([1, 2, 3, 4])

    expect(result).toBe(2.5)
  })

  test('of one value is the value itself', () => {
    const result = average([1])

    expect(result).toBe(1)
  })

  test('of empty array is zero', () => {
    const result = average([])

    expect(result).toBe(0)
  })

  test('of undefinded ', () => {
    const result = average()

    expect(result).toBe(0)
  })
})
