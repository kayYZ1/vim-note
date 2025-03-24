describe("Test llm model selection", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit("/settings");
  });

  it("should select the DeepSeekR1 model", () => {
    cy.get("#model-select").click();
    cy.contains('[data-slot="select-item"]', "DeepSeek R1")
      .should("be.visible")
      .click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("model")).to.equal(
        "deepseek/deepseek-r1:free",
      );
    });
  });

  it("should select the DeepSeekChat model", () => {
    cy.get("#model-select").click();
    cy.contains('[data-slot="select-item"]', "DeepSeek V3")
      .should("be.visible")
      .click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("model")).to.equal(
        "deepseek/deepseek-chat:free",
      );
    });
  });

  it("should select the Mistral model", () => {
    cy.get("#model-select").click();
    cy.contains('[data-slot="select-item"]', "Mistral")
      .should("be.visible")
      .click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("model")).to.equal(
        "mistralai/mistral-7b-instruct:free",
      );
    });
  });

  it("should select the LLAMA model", () => {
    cy.get("#model-select").click();
    cy.contains('[data-slot="select-item"]', "LLAMA 3.3")
      .should("be.visible")
      .click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("model")).to.equal(
        "meta-llama/llama-3.3-70b-instruct:free",
      );
    });
  });

  it("should select the Gemini model", () => {
    cy.get("#model-select").click();
    cy.contains('[data-slot="select-item"]', "Gemini 2.0")
      .should("be.visible")
      .click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("model")).to.equal(
        "google/gemini-2.0-pro-exp-02-05:free",
      );
    });
  });
});
