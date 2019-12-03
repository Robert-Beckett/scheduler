describe('Appointments', () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit('localhost:8000');
    cy.contains("Monday");
  })

  xit('should book an interview', () => {
    cy.get('[alt="Add"]').first()
      .click();

    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]')
      .click();

    cy.contains('Save')
      .click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones')
      .contains('.appointment__card--show', 'Sylvia Palmer');
  });

  xit('should edit an interview', () => {
    cy.get('[alt="Edit"]')
      .click({force: true});

    cy.get('[data-testid="student-name-input"]')
      .clear().type("Frank Ferrell");

    cy.get('[alt="Tori Malcolm"')
      .click();

    cy.contains('Save')
      .click();

    cy.contains('.appointment__card--show', 'Frank Ferrell')
    .contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should delete an interview', () => {
    cy.get('[alt="Delete"]')
      .click({force: true});

    cy.contains('Confirm')
      .click();

    cy.get('[alt="Loading"]')
      .should("exist");

    cy.contains('.appointment__card--show', 'Archie Cohen')
      .should('not.exist');
  })
});