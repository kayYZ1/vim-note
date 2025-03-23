describe("Test default note rendering after app opening", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to the default note page with a nanoid", () => {
    cy.url().should("match", /\/note\/[A-Za-z0-9_-]{21}$/);
  });

  it("should toggle the theme switch button to dark", () => {
    cy.clearAllLocalStorage();
    cy.get("#theme-toggle").click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("theme")).to.equal("dark");
    });
  });

  it("should display current date in p", () => {
    cy.get("p")
      .should("be.visible")
      .and("have.class", "text-muted-foreground")
      .should(
        "contain",
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      );
  });

  it("should display the h1 of the note", () => {
    cy.get("h1").should("be.visible").should("contain", "Note title");
  });

  it("should display the h3 description of the note", () => {
    cy.get("h3")
      .should("be.visible")
      .should("contain", "Loose note description");
  });
});
