describe('AddAccessory Tests', () => {
    // it('add-accessory correctly', () => {
    //     //Login
    //     cy.visit('/accessories/add')
    //         .get('.login-container .login-form')
    //         .get('input')
    //         .eq(0)
    //         .type('mart@gmail.com')
    //         .get('input')
    //         .eq(1)
    //         .type('12345')
    //         .get('.login-container form')
    //         .submit();          
    //     cy.location('pathname').should('eq', '/');

    //     cy.visit('/accessories/add')
    //         .get('.add-accessories .add-accessories-form')
    //         .get('input')
    //         .eq(0)
    //         .type('gaming mouse')
    //         .get('input')
    //         .eq(1)
    //         .type('https://mouse.png')
    //         .get('input')
    //         .eq(2)
    //         .type('The mouse should be one of your top choices for a mouse.')
    //         .get('input')
    //         .eq(3)
    //         .type('112')
    //         .get('.add-accessories form')
    //         .submit();
    //     cy.location('pathname').should('eq', '/')
    // });

    it('already exist accessory', () => {
        //Login
        cy.visit('/accessories/add')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();          
        cy.location('pathname').should('eq', '/');

        cy.visit('/accessories/add')
            .get('.add-accessories .add-accessories-form')
            .get('input')
            .eq(0)
            .type('mouse')
            .get('input')
            .eq(1)
            .type('https://mouse.png')
            .get('input')
            .eq(2)
            .type('The mouse should be one of your top choices for a mouse.')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-accessories form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Accessories already exists!');        
    });
    
    it('incorrect title', () => {
        //Login
        cy.visit('/accessories/add')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();          
        cy.location('pathname').should('eq', '/');

        cy.visit('/accessories/add')
            .get('.add-accessories .add-accessories-form')
            .get('input')
            .eq(0)
            .type('m')
            .get('input')
            .eq(1)
            .type('https://mouse.png')
            .get('input')
            .eq(2)
            .type('The mouse should be one of your top choices for a mouse.')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-accessories form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Title should be between 5 and 20 characters!');        
    });

    it('incorrect url', () => {
        //Login
        cy.visit('/accessories/add')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();          
        cy.location('pathname').should('eq', '/');

        cy.visit('/accessories/add')
            .get('.add-accessories .add-accessories-form')
            .get('input')
            .eq(0)
            .type('gaming mouse')
            .get('input')
            .eq(1)
            .type('mouse.png')
            .get('input')
            .eq(2)
            .type('The mouse should be one of your top choices for a mouse.')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-accessories form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Invalid url!');        
    });

    it('incorrect description', () => {
        //Login
        cy.visit('/accessories/add')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();          
        cy.location('pathname').should('eq', '/');

        cy.visit('/accessories/add')
            .get('.add-accessories .add-accessories-form')
            .get('input')
            .eq(0)
            .type('gaming mouse')
            .get('input')
            .eq(1)
            .type('https://mouse.png')
            .get('input')
            .eq(2)
            .type('mouse')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-accessories form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Description should be at least 10 characters!');        
    });

    it('incorrect price', () => {
        //Login
        cy.visit('/accessories/add')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('mart@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();          
        cy.location('pathname').should('eq', '/');

        cy.visit('/accessories/add')
            .get('.add-accessories .add-accessories-form')
            .get('input')
            .eq(0)
            .type('gaming mouse')
            .get('input')
            .eq(1)
            .type('https://mouse.png')
            .get('input')
            .eq(2)
            .type('The mouse should be one of your top choices for a mouse.')
            .get('input')
            .eq(3)
            .type('10000')
            .get('.add-accessories form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Invalid price!');        
    });
});