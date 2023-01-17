describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('username')
        cy.contains('password')
        cy.contains('Login to Application')
    })

    it('user can login', function () {
        cy.get('#username-input').type('chewzzz')
        cy.get('#password-input').type('yoyoylolo')
        cy.contains('login').click()
    })
})