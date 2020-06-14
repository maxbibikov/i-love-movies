describe('movies', () => {
  it('shows list of movies', () => {
    cy.visit('/')
      .get('.Movies_container__2Nycc')
      .findByTestId('list-menu-toggle')
      .click()
      .get('[data-name="popular"]')
      .click();
  });
});
