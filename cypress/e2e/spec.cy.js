// describe('My First Test', () => {
//   it('Visits Lemon Market', () => {
//     cy.visit('http://localhost:3000/home')

//     cy.contains('login').click()
    // cy.url().should('include', '/login')
//   })
// })

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()
    cy.url().should('include', '/ocmmands/actions')
    cy.get('.action-email').type('fake@email.com')
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})