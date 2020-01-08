describe('Shopping Cart Tests', () => {    
    it('add in shopping cart, create checkout and delete it', () => {
         //Login
        cy.visit('/checkouts/all')
            .get('.login-container .login-form')
            .get('input')
            .eq(0)
            .type('martin.petrov033@gmail.com')
            .get('input')
            .eq(1)
            .type('12345')
            .get('.login-container form')
            .submit();
        cy.location('pathname').should('eq', '/');

        //add to cart
        cy.visit('/laptops/5debe97b832d5a2c7cc3e0f2')
            .get('.laptop-details')
            .get('.submit-btn')
            .eq(0)
            .click();
        
        //check shopping cart
        cy.go('forward')
            .wait(2000)
            .get('.checkout-section input')
            .eq(0)
            .type('Nameee')
            .get('input')
            .eq(1)
            .type('Addressss')
            .get('.checkout-section .btn')
            .click()

            cy.visit('/checkouts/all')
            .get('.checkouts .checkout')
            .last()
            .get('.complete-checkout-btn')
            .eq(0)
            .click()
        cy.location('pathname').should('eq', '/');
    });
});