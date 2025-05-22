describe("Sorting E2E Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("sorts books alphabetically", () => {
        // Sorting alphabetically
        cy.get("#sorting").select("alphabetical");

        // Grabing all text from each .book, picking out the title
        cy.get(".books .book").then(($books) => {
            const titles = $books.map((i, el) => {
                const text = el.innerText;
                const match = text.match(/Tytuł:\s*(.+?)(,|$)/i);
                return match ? match[1].trim() : "";
            }).get();

            // Checking if the titles are sorted alphabetically
            const sorted = [...titles].sort((a, b) => a.localeCompare(b, "pl"));
            expect(titles).to.deep.equal(sorted);
        });
    });

    it("sorts books by newest", () => {
        // Sorting by newest
        cy.get("#sorting").select("newest");
        // Checking if the titles are sorted by newest
        cy.get(".books .book .date").then(($dates) => {
            const dates = [...$dates].map((el) => new Date(el.innerText));
            const sortedDesc = [...dates].sort((a, b) => b - a);
            expect(dates).to.deep.equal(sortedDesc);
        });
    });

    it("sorts books by oldest", () => {
        // Sorting by oldest
        cy.get("#sorting").select("oldest");
        // Checking if the titles are sorted by oldest
        cy.get(".books .book .date").then(($dates) => {
            const dates = [...$dates].map((el) => new Date(el.innerText));
            const sortedAsc = [...dates].sort((a, b) => a - b);
            expect(dates).to.deep.equal(sortedAsc);
        });
    });

    it("sorts books by lowest price", () => {
        // Sorting by lowest price
        cy.get("#sorting").select("lowest");

        // Grabing all text from each .book, picking out the price
        cy.get(".books .book").then(($books) => {
            const prices = $books.map((i, el) => {
                const text = el.innerText;
                const match = text.match(/Cena:\s*([\d.,]+)/i);
                if (match) {
                    return parseFloat(match[1].replace(",", "."));
                }
                return 0;
            }).get();

            // Checking if the titles are sorted by lowest price
            const sorted = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sorted);
        });
    });

    it("sorts books by highest price (Cena od najwyższej)", () => {
        // Sorting by highest price
        cy.get("#sorting").select("highest");

        // Grabing all text from each .book, picking out the price
        cy.get(".books .book").then(($books) => {
            const prices = $books.map((i, el) => {
                const text = el.innerText;
                const match = text.match(/Cena:\s*([\d.,]+)/i);
                if (match) {
                    return parseFloat(match[1].replace(",", "."));
                }
                return 0;
            }).get();

            // Checking if the titles are sorted by highest price
            const sorted = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sorted);
        });
    });
});