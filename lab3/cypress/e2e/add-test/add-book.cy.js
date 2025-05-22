describe("Add Book E2E Test", () => {
  it("adding new book", () => {
    cy.visit("http://localhost:5173/");

    // Going to login page
    cy.contains("Zaloguj się").click();
    cy.url().should("include", "/login");

    // Filling in login form
    cy.get('input[placeholder="Nazwa użytkownika"]').type("testaccount");
    cy.get('input[placeholder="Hasło"]').type("test123");
    cy.get("form.login-form button[type='submit']").click();
    cy.url().should("not.include", "login");

    // Navigating to the add book page and filling out the form
    cy.contains("Dodaj Nową Pozycję").click();
    cy.get("#title").type("TDD. Sztuka tworzenia dobrego kodu");
    cy.get("#author").type("Kent Beck");
    cy.get("#price").type("35.40");
    cy.get("#pages").type("232");
    cy.get("#cover").select("soft");
    cy.get("#condition").select("new");
    cy.get("#category").select("computer-science");
    cy.get("#description").type("Testowy opis książki.");
    cy.get('button[type="submit"]').click();

    // Navigating back to the homepage and waiting for the book to get saved
    cy.contains("Strona Główna").click();
    cy.wait(1000);
    cy.reload();

    // Checking if the added book is there
    cy.get(".books .book").contains("TDD. Sztuka tworzenia dobrego kodu").should("be.visible");

    // Logging out
    cy.contains("Wyloguj się").click();
  });
});