describe('Blog app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000/')
        cy.contains('username')
        cy.contains('password')
        cy.contains('Login to Application')
    })
})