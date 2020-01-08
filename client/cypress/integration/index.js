describe('Tests main functionalities', () => {
  it('loads laptops', () => {
    cy.visit('/')
      .get('.laptops-container .laptop')
      .should(($arrOfLaptops) => {
        expect($arrOfLaptops.length).to.be.greaterThan(0)
      })
  });

  it('loads accessories', () => {
    cy.visit('/accessories')
      .get('.accessories-container .accessory')
      .should(($arrOfLaptops) => {
        expect($arrOfLaptops.length).to.be.greaterThan(0)
      });
  });

  it('loads checkouts', () => {
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

    cy.visit('/checkouts/all')
      .get('.checkouts .checkout')
      .should(($arrOfCheckouts) => {
        expect($arrOfCheckouts.length).to.be.greaterThan(0)
      })
  });  
});