describe('AddLaptop Tests', () => {
    // it('add-laptop correctly', () => {
    //     //Login
    //     cy.visit('/laptops/add')
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

    //     cy.visit('/laptops/add')
    //         .get('.add-laptop .add-laptop-form')
    //         .get('input')
    //         .eq(0)
    //         .type('Lenovo ThinkPad X1')
    //         .get('input')
    //         .eq(1)
    //         .type('https://www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
    //         .get('input')
    //         .eq(2)
    //         .type('The ThinkPad X1 Carbon should be one of your top choices for a laptop.')
    //         .get('input')
    //         .eq(3)
    //         .type('112')
    //         .get('.add-laptop form')
    //         .submit();
    //     cy.location('pathname').should('eq', '/')
    // });

    it('incorrect model', () => {
        // Login
        cy.visit('/login')
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

        cy.visit('/laptops/add')
            .get('.add-laptop .add-laptop-form')     
            .get('input')
            .eq(0)
            .type('L')
            .get('input')
            .eq(1)
            .type('https://www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
            .get('input')
            .eq(2)
            .type('The ThinkPad X1 Carbon should be one of your top choices for a laptop.')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-laptop form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Model should be between 5 and 20 characters!');
    });

    it('incorrect url', () => {
        // Login
        cy.visit('/login')
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

        cy.visit('/laptops/add')
            .get('.add-laptop .add-laptop-form')     
            .get('input')
            .eq(0)
            .type('Lenovo ThinkPad X1')
            .get('input')
            .eq(1)
            .type('www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
            .get('input')
            .eq(2)
            .type('The ThinkPad X1 Carbon should be one of your top choices for a laptop.')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-laptop form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Invalid url!');
    });

    it('incorrect description', () => {
        // Login
        cy.visit('/login')
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

        cy.visit('/laptops/add')
            .get('.add-laptop .add-laptop-form')     
            .get('input')
            .eq(0)
            .type('Lenovo ThinkPad X1')
            .get('input')
            .eq(1)
            .type('https://www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
            .get('input')
            .eq(2)
            .type('ThinkPad')
            .get('input')
            .eq(3)
            .type('112')
            .get('.add-laptop form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Description should be at least 10 characters!');
    });

    it('incorrect price', () => {
        // Login
        cy.visit('/login')
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

        cy.visit('/laptops/add')
            .get('.add-laptop .add-laptop-form')     
            .get('input')
            .eq(0)
            .type('Lenovo ThinkPad X1')
            .get('input')
            .eq(1)
            .type('https://www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
            .get('input')
            .eq(2)
            .type('The ThinkPad X1 Carbon should be one of your top choices for a laptop.')
            .get('input')
            .eq(3)
            .type('0')
            .get('.add-laptop form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Invalid price!');
    });

    it('already exists laptop', () => {
        // Login
        cy.visit('/login')
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

        cy.visit('/laptops/add')
            .get('.add-laptop .add-laptop-form')     
            .get('input')
            .eq(0)
            .type('Lenovo ThinkPad X1')
            .get('input')
            .eq(1)
            .type('https://www.vario.bg/images/product/30740/Lenovo%20ThinkPad%20X1%20Carbon%2020KH006JBM.jpg')
            .get('input')
            .eq(2)
            .type('The ThinkPad X1 Carbon should be one of your top choices for a laptop.')
            .get('input')
            .eq(3)
            .type(1290)
            .get('.add-laptop form')
            .submit()
            .get('.error-message')
            .should('have.text', 'Laptop already exists!');
    });
});