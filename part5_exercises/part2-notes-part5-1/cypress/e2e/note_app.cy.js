describe('Note app', function () {
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
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username-input').type('chewzzz')
        cy.get('#password-input').type('yoyoylolo')
    })

    it('a new note can be created', function () {
        cy.contains('new note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('input:first').type('chewzzz')
            cy.get('input:last').type('yoyoylolo')
            cy.get('#login-button').click()
        })

        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        describe('and a note exists', function () {
            beforeEach(function () {
                cy.contains('new note').click()
                cy.get('input').type('another note cypress')
                cy.contains('save').click()
            })

            it('it can be made important', function () {
                cy.contains('another note cypress')
                    .contains('make important')
                    .click()

                cy.contains('another note cypress')
                    .contains('make not important')
            })
        })
    })
})