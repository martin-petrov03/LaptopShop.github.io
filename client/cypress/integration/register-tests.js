describe('Register Tests', () => {
    // it('register correctly', () => {
    //     cy.visit('/register')
    //       .get('.registration-container .registration-form')
    //       .get('input')
    //       .eq(0)
    //       .type('mart1@gmail.com')
    //       .get('input')
    //       .eq(1)
    //       .type('martin123')
    //       .get('input')
    //       .eq(2)
    //       .type('12345')
    //       .get('.registration-container form')
    //       .submit();
    //     cy.location('pathname').should('eq', '/login')
    //   });

    it('incorrect email', () => {
        cy.visit('/register')
            .get('.registration-container .registration-form')
            .get('input')
            .eq(0)
            .type('mart@gm')
            .get('input')
            .eq(1)
            .type('martin123')
            .get('input')
            .eq(2)
            .type('12345')
            .get('.registration-container form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Invalid email!');
    });

    it('incorrect email', () => {
        cy.visit('/register')
            .get('.registration-container .registration-form')
            .get('input')
            .eq(0)
            .type('mart')
            .get('input')
            .eq(1)
            .type('martin123')
            .get('input')
            .eq(2)
            .type('12345')
            .get('.registration-container form')
            .submit()
            .get('.error-message')
            .should('have.text', 'E-Mail should be at least 5 characters!');
    });

    it('incorrect email', () => {
        cy.visit('/register')
            .get('.registration-container .registration-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('martin')
            .get('input')
            .eq(2)
            .type('12345')
            .get('.registration-container form')
            .submit()
            .get('.error-message')
            .should('have.text', 'E-Mail address already exists!');
    });

    it('incorrect username', () => {
        cy.visit('/register')
            .get('.registration-container .registration-form')
            .get('input')
            .eq(0)
            .type('1@gmail.com')
            .get('input')
            .eq(1)
            .type('mart')
            .get('.registration-container form')
            .submit()
            .get('.registration-container .error-message')
            .should('have.text', 'Username should be at least 5 characters!');
    });

    it('incorrect username', () => {
        cy.visit('/register')
            .get('.registration-container .registration-form')
            .get('input')
            .eq(0)
            .type('1@gmail.com')
            .get('input')
            .eq(1)
            .type('martin')
            .get('input')
            .eq(2)
            .type('123')
            .get('.registration-container form')
            .submit()
            .get('.registration-container .error-message')
            .should('have.text', 'Password should be at least 5 characters!');
    });
});