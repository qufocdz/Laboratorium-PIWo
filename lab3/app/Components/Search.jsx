import { useFilters } from "../Contexts/FiltersContext";
import { useState } from "react";

export default () => {
  const { filters, updateSearch } = useFilters();
  const [showMine, setShowMine] = useState(false);

  const handleCriteriaChange = (event) => {
    updateSearch("search", { ...filters.search, criteria: event.target.value });
  };

  const handleQueryChange = (event) => {
    updateSearch("search", { ...filters.search, query: event.target.value });
  };

  const handleSortingChange = (event) => {
    updateSearch("sorting", event.target.value);
  };

  const handleShowMineToggle = () => {
    setShowMine((prev) => {
      const newValue = !prev;
      updateSearch("showMine", newValue);
      return newValue;
    });
  };

  return (
    <section className="search">
      <button type="button" onClick={handleShowMineToggle}>
        {showMine ? "Moje" : "Wszystkie"}
      </button>
      <label htmlFor="criteria">
        <strong>Kryterium wyszukiwania:</strong>
      </label>
      <select
        id="criteria"
        value={filters.search.criteria}
        onChange={handleCriteriaChange}
      >
        <option value="name">Nazwa</option>
        <option value="author">Autor</option>
        <option value="description">Opis</option>
      </select>
      <input
        type="text"
        placeholder="Zacznij wyszukiwać!"
        value={filters.search.query}
        onChange={handleQueryChange}
      />

      <label htmlFor="sorting">
        <strong>Sortowanie:</strong>
      </label>
      <select
        id="sorting"
        value={filters.sorting}
        onChange={handleSortingChange}
      >
        <option value="alphabetical">Alfabetycznie</option>
        <option value="newest">Najnowsze</option>
        <option value="oldest">Najstarsze</option>
        <option value="lowest">Cena od najniższej</option>
        <option value="highest">Cena od najwyższej</option>
      </select>
    </section>
  );
}
