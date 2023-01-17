describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('username')
        cy.contains('password')
        cy.contains('Login to Application')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })
})