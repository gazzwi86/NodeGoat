/// <reference types="Cypress" />

describe("/contributions security regression tests", () => {
  "use strict";

  before(() => {
    cy.dbReset();
  });

  afterEach(() => {
    cy.visitPage("/logout");
  });

  it("Should prevent server-side JavaScript injection in contributions", () => {
    // This test verifies that VULN-001 is fixed
    // The malicious payload should be safely parsed as NaN instead of executed
    const maliciousPayload = "require('child_process').exec('rm -rf /')";

    cy.userSignIn();
    cy.visitPage("/contributions");

    // Input malicious JavaScript code that would execute if eval() was used
    cy.get("input[name='preTax']")
      .clear()
      .type(maliciousPayload);

    cy.get("input[name='afterTax']")
      .clear()
      .type("5");

    cy.get("input[name='roth']")
      .clear()
      .type("5");

    cy.get("button[type='submit']")
      .click();

    // Should show validation error for invalid input instead of executing code
    cy.get(".alert-danger")
      .should("be.visible")
      .and("contain", "Invalid contribution percentages");

    // Should remain on contributions page (not crash or redirect)
    cy.url().should("include", "contributions");
  });

  it("Should properly parse numeric strings in contributions", () => {
    // This test verifies that the parseInt() fix works correctly
    cy.userSignIn();
    cy.visitPage("/contributions");

    // Input valid numeric values as strings
    cy.get("input[name='preTax']")
      .clear()
      .type("10");

    cy.get("input[name='afterTax']")
      .clear()
      .type("5");

    cy.get("input[name='roth']")
      .clear()
      .type("5");

    cy.get("button[type='submit']")
      .click();

    // Should successfully process the values
    cy.get(".alert-success")
      .should("be.visible");

    cy.url().should("include", "contributions");
  });
});