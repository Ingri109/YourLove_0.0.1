describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('#Email').type('fake@email.com')
    cy.get('#Email').should('have.value', 'fake@email.com')
  })
})