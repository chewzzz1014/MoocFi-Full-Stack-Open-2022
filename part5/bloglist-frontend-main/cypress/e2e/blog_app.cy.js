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
        cy.get('#login-btn').click()

        cy.contains('chewzzz logged in')
    })

    it('a new blog can be created', function () {
        cy.contains('new blog').click()      cy.get('title').type('a blog created by cypress')
        cy.get('author').type('cypress')
        cy.get('url').type('localhost:3000')

        cy.contains('createdsave').click()
        cy.contains('a new blog a blog created by cypress by cypress added')
    })
})