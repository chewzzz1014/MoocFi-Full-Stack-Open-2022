describe('Blog app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost3000')
        cy.contains('Blogs')
    })
})