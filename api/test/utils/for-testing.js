const palindrome = str => {
  if (typeof str === 'undefined') return

  return str
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if (typeof array === 'undefined') return 0

  if (array.length === 0) return 0

  let total = 0

  array.forEach(elem => {
    total += elem
  })

  return total / array.length
}

module.exports = {
  palindrome,
  average
}
