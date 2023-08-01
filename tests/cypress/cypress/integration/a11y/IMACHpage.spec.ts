describe("IMA-CH Page 508 Compliance Test", () => {
  it("Check a11y on IMA-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("IMA-CH");
    cy.checkA11yOfPage();
  });
});
