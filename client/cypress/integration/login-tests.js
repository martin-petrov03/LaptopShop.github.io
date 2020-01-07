describe('Login tests', () => {
  it('login correctly', () => {
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
    cy.location('pathname').should('eq', '/')
  });

  it('incorrect email', () => {
    cy.visit('/login')
      .get('.login-container .login-form')
      .get('input')
      .eq(0)
      .type('mart')
      .get('input')
      .eq(1)
      .type('12345')
      .get('.login-container form')
      .submit()
      .get('.error-message')
      .should('have.text', 'E-Mail should be at least 5 characters!');
  });

  it('incorrect email', () => {
    cy.visit('/login')
      .get('.login-container .login-form')
      .get('input')
      .eq(0)
      .type('mart@gm')
      .get('input')
      .eq(1)
      .type('12345')
      .get('.login-container form')
      .submit()
      .get('.error-message')
      .should('have.text', 'Invalid email!');
  });

  it('incorrect email', () => {
    cy.visit('/login')
      .get('.login-container .login-form')
      .get('input')
      .eq(0)
      .type('mart@gmaila.com')
      .get('input')
      .eq(1)
      .type('12345')
      .get('.login-container form')
      .submit()
      .get('.error-message')
      .should('have.text', 'Invalid login!');
  });

  it('incorrect password', () => {
    cy.visit('/login')
      .get('.login-container .login-form')
      .get('input')
      .eq(0)
      .type('mart@gmail.com')
      .get('input')
      .eq(1)
      .type('1')
      .get('.login-container form')
      .submit()
      .get('.error-message')
      .should('have.text', 'Password should be at least 5 characters!');
  });

  it('incorrect password', () => {
    cy.visit('/login')
      .get('.login-container .login-form')
      .get('input')
      .eq(0)
      .type('mart@gmail.com')
      .get('input')
      .eq(1)
      .type('1234567890')
      .get('.login-container form')
      .submit()
      .get('.error-message')
      .should('have.text', 'Invalid login!');
  });
});