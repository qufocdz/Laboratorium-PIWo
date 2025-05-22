describe("Filters E2E Tests", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:5173/");
    });

    it("filters by price range", () => {
        // Setting minimum price to 10
        cy.get('input[name="minPrice"]').clear().type("1"); //because clear makes it set the value to 0
        // Setting maximum price to 50
        cy.get('input[name="maxPrice"]').clear().type("5"); //because clear makes it set the value to 0

        // Check whether all prices are between 10 and 50
        cy.get(".books .book").each(($book) => {
            const text = $book.text();
            const priceMatch = text.match(/Cena:\s*([\d.,]+)/i);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1].replace(",", "."));
                expect(price).to.be.at.least(10);
                expect(price).to.be.at.most(50);
            }
        });
    });

    it("filters by page count range", () => {
        // Setting minimum pages to 100
        cy.get('input[name="minPages"]').clear().type("10"); //because clear makes it set the value to 0
        // Setting maximum pages to 300
        cy.get('input[name="maxPages"]').clear().type("30"); //because clear makes it set the value to 0

        // Check whether all page numbers are 100 and 300
        cy.get(".books .book").each(($book) => {
            const text = $book.text();
            const pagesMatch = text.match(/Liczba stron:\s*(\d+)/i);
            if (pagesMatch) {
                const pages = parseInt(pagesMatch[1]);
                expect(pages).to.be.at.least(100);
                expect(pages).to.be.at.most(300);
            }
        });
    });

    it("filters by cover", () => {
        // Selecting soft cover category
        cy.get("#cover").select("soft");

        // Checking if there is a book with this category shown (it exists in the database)
        cy.get(".books .book").each(($book) => {
            cy.wrap($book)
                .invoke("text")
                .should("match", /Okładka:\s*Miękka/i);
        });
    });

    it("filters by condition", () => {
        // Selecting used condition category
        cy.get("#condition").select("used");

        // Checking if there is a book with this category shown (it exists in the database)
        cy.get(".books .book").each(($book) => {
            cy.wrap($book)
                .invoke("text")
                .should("match", /Stan:\s*Używana/i);
        });
    });

    it("filters by category", () => {
        // Selecting computer science category
        cy.get("#category").select("computer-science");

        // Checking if there is a book with this category shown (it exists in the database)
        cy.get(".books .book").each(($book) => {
            cy.wrap($book)
                .invoke("text")
                .should("match", /Kategoria:\s*Informatyka/i);
        });
    });
});