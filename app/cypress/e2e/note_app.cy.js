describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')

    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      name: 'Adrian',
      username: 'adrian456',
      password: '123456789'
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Mis Notas')
  })

  it('login form can be opened', () => {
    cy.contains('Open Login').click()
  })

  it('user can login', () => {
    cy.contains('Open Login').click()
    cy.get('input').first().type('adrian456')
    cy.get('[placeholder="password"]').last().type('123456789')
    cy.get('#form-login-button').click()
  })

  it('login fails with wrong password', () => {
    cy.contains('Open Login').click()
    cy.get('input').first().type('adrian456')
    cy.get('[placeholder="password"]').last().type('password-incorrect')
    cy.get('#form-login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')
      .should('have.css', 'font-size', '20px')
  })

  describe.only('when logged in', () => {
    const noteContent = 'Nota para cypress'

    beforeEach(() => {
      cy.login({ username: 'adrian456', password: '123456789' })
    })

    it('a new note can be created', () => {
      cy.contains('Open Note Form').click()
      cy.get('[data-testid="form-note"] input:first').type(noteContent)
      cy.get('[data-testid="form-note"] button:first').click()
    })

    describe('and a note exist', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'A note created from cypress',
          important: false
        })
      })

      it('can be made important', () => {
        cy.contains('A note created from cypress').as('theNote')

        cy.get('@theNote').contains('make important').click()

        cy.get('@theNote').contains('make not important')
      })
    })
  })
})
