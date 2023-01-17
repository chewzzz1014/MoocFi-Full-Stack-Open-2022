describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Chew Zi Qing',
            username: 'chewzzz',
            password: 'yoyoylolo'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
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

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username-input').type('chewzzz')
            cy.get('#password-input').type('yoyoylolo')
            cy.get('#login-btn').click()

        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('localhost:3000')

            cy.contains('create').click()
            cy.contains('a new blog a blog created by cypress by cypress added')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.contains('Interstellar Nolan')
            })
            it('it can view details', function () {
                cy.contains('Interstellar Nolan')
                    .contains('view')
                    .click()

                cy.contains('Interstellar Nolan')
                    .contains('localhost:5000')
                    .contains('likes 0')
                    .contains('chewzzz')
            })
        })
    })
})