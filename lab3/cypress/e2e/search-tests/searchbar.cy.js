describe("Search Bar E2E Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("filters results by name", () => {
        // Searching by book name, default criteria
        cy.get("input[placeholder='Zacznij wyszukiwać!']")
            .type("Tadeusz")
            .should("have.value", "Tadeusz");

        // Checking whether displayed books match the search term
        cy.get(".books .book").each(($book) => {
            cy.wrap($book).invoke("text").should("match", /Tadeusz/i);
        });
    });

    it("filters results by author", () => {
        // Changing criteria to author name
        cy.get("#criteria").select("author");
        cy.get("input[placeholder='Zacznij wyszukiwać!']")
            .type("Kafka")
            .should("have.value", "Kafka");

        // Checking whether displayed books match the search term
        cy.get(".books .book").each(($book) => {
            cy.wrap($book).invoke("text").should("match", /Kafka/i);
        });
    });

    it("filters results by description", () => {
        // Changing criteria to description
        cy.get("#criteria").select("description");
        cy.get("input[placeholder='Zacznij wyszukiwać!']")
            .type("graf")
            .should("have.value", "graf");

        // Checking whether displayed books match the search term
        cy.get(".books .book").each(($book) => {
            cy.wrap($book).within(() => {
                // Opening decscription modal
                cy.contains("button", "Pokaż opis").click();
            });

            // Checking if description modal contains the search term
            cy.get(".modal")
                .should("be.visible")
                .invoke("text")
                .should("match", /graf/i);

            // Closing the modal
            cy.get(".modal").within(() => {
                cy.contains("button", "Zamknij").click();
            });
        });
    });

    it("toggles between user's and all books", () => {
        // Clicking on the button to show user's books
        cy.contains("Wszystkie").click();
        // User isn't logged in, so no books should be displayed
        cy.get(".books .book").should("not.exist");

        // Clicking button again, seeing all books
        cy.contains("Moje").click();
        // Some books should be displayed
        cy.get(".books .book").should("exist");
    });
});